const express = require('express');
const axios = require('axios');

const router = express.Router();

function getBonsaiTips(tempC, weatherDesc) {
  const tips = [];
  const desc = (weatherDesc || '').toLowerCase();

  if (tempC < 0) {
    tips.push('Danger of hard frost — move tender species indoors immediately.');
    tips.push('Avoid watering frozen soil to prevent root damage.');
  } else if (tempC < 5) {
    tips.push('Protect from frost — consider moving to an unheated greenhouse or cold frame.');
    tips.push('Reduce watering; trees are semi-dormant.');
  } else if (tempC >= 5 && tempC < 15) {
    tips.push('Good conditions for repotting early spring species.');
    tips.push('Water moderately; check soil moisture before watering.');
  } else if (tempC >= 15 && tempC < 25) {
    tips.push('Ideal growing conditions. Maintain regular watering and feeding schedule.');
    tips.push('Monitor for pests as activity increases in warm weather.');
  } else if (tempC >= 25 && tempC < 30) {
    tips.push('Increase watering frequency — soil dries quickly in the heat.');
    tips.push('Provide afternoon shade for species sensitive to strong sun.');
  } else {
    tips.push('Extreme heat — water twice daily if needed and provide shade.');
    tips.push('Keep trees away from reflected heat off walls or paving.');
  }

  if (desc.includes('rain') || desc.includes('shower')) {
    tips.push('Natural rainfall may reduce watering needs — check soil before adding more water.');
  }
  if (desc.includes('wind') || desc.includes('gale')) {
    tips.push('Strong winds increase evaporation — check soil moisture more frequently.');
    tips.push('Secure larger trees to prevent toppling in high winds.');
  }
  if (desc.includes('snow')) {
    tips.push('Brush heavy snow off branches gently to prevent breakage.');
  }
  if (desc.includes('overcast') || desc.includes('cloud')) {
    tips.push('Reduced light levels — ensure trees are positioned to maximise available light.');
  }

  return tips;
}

router.get('/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const response = await axios.get(
      `https://wttr.in/${encodeURIComponent(location)}?format=j1`,
      { timeout: 5000 }
    );

    const data = response.data;
    const current = data.current_condition[0];
    const tempC = parseFloat(current.temp_C);
    const weatherDesc = current.weatherDesc[0].value;
    const humidity = current.humidity;
    const windspeedKmph = current.windspeedKmph;
    const feelsLikeC = parseFloat(current.FeelsLikeC);
    const nearestArea = data.nearest_area[0];
    const areaName = nearestArea.areaName[0].value;
    const country = nearestArea.country[0].value;

    const bonsaiTips = getBonsaiTips(tempC, weatherDesc);

    res.json({
      location: `${areaName}, ${country}`,
      temperature: tempC,
      feels_like: feelsLikeC,
      description: weatherDesc,
      humidity: humidity,
      wind_speed: windspeedKmph,
      bonsaiTips,
    });
  } catch (err) {
    // Fallback response when weather API is unavailable
    res.json({
      location,
      temperature: { celsius: null, feelsLike: null },
      description: 'Weather data unavailable',
      humidity: null,
      windSpeed: null,
      bonsaiTips: [
        'Check your local weather forecast before watering.',
        'Protect bonsai from extreme temperatures.',
        'Monitor soil moisture daily during summer months.',
      ],
      error: 'Could not retrieve live weather data',
    });
  }
});

module.exports = router;
