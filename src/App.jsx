import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SubmitIdea from './pages/SubmitIdea';
import Auth from './pages/Auth';
import IdeaDetail from './pages/IdeaDetail';
import ContinueIdea from './pages/ContinueIdea';
import Profile from './pages/Profile';
import Community from './pages/Community';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  const handleAuth = (val) => {
    setIsAuthenticated(val);
    localStorage.setItem('isAuth', val);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/login" element={<Auth setIsAuthenticated={handleAuth} />} />
          <Route path="/idea/:id" element={<IdeaDetail />} />
          <Route path="/recycle/:id" element={<ContinueIdea />} />
          <Route path="/profile" element={<Profile setIsAuthenticated={handleAuth} />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
