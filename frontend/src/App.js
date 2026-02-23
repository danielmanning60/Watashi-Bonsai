import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import Species from './pages/Species';
import SpeciesDetail from './pages/SpeciesDetail';
import SeasonalGuides from './pages/SeasonalGuides';
import Portfolio from './pages/Portfolio';
import Weather from './pages/Weather';
import Profile from './pages/Profile';

function ProtectedRoute({ children, onAuthRequired }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) {
    onAuthRequired('login');
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppInner() {
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'

  const openAuth = (tab) => setAuthModal(tab);
  const closeAuth = () => setAuthModal(null);

  return (
    <>
      <Navbar onLoginClick={openAuth} />

      {authModal && (
        <AuthModal initialTab={authModal} onClose={closeAuth} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/species" element={<Species />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/seasonal-guides" element={<SeasonalGuides />} />
        <Route
          path="/portfolio"
          element={<Portfolio onAuthRequired={openAuth} />}
        />
        <Route path="/weather" element={<Weather />} />
        <Route
          path="/profile"
          element={<Profile onAuthRequired={openAuth} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </AuthProvider>
  );
}
