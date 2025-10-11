import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PublicGoodsGame from './pages/PublicGoodsGame.jsx';
import AmbiguityAttiElicit from './pages/AmbiguityAttiElicit.jsx';
import RiskAttiElicit from './pages/RiskAttiElicit.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import UserSettings from './pages/UserSettings.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';  // 导入
import './App.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/risk-attitude-elicit" element={<RiskAttiElicit />} />
            <Route path="/ambiguity-attitude-elicit" element={<AmbiguityAttiElicit />} />
            <Route path="/public-goods" element={<PublicGoodsGame />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div> 
      </AuthProvider>
    </Router>
  );
}

export default App;