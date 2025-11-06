import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import HomePage
import HomePage from './pages/HomePage.jsx';
// import game pages
import PublicGoodsGame from './pages/games/PublicGoodsGame.jsx';
import AmbiguityAttiElicit from './pages/games/AmbiguityAttiElicit.jsx';
import RiskAttiElicit from './pages/games/RiskAttiElicit.jsx';
import OverconfidenceGame from './pages/games/OverconfidenceGame.jsx';
import GameUnderAmbiguity from './pages/games/GameUnderAmbiguity.jsx';
import MBTIElicit from './pages/games/MbtiElicit.jsx'
// import auth pages
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import UserSettings from './pages/auth/UserSettings.jsx';
// import game results pags
import ShowRiskAtti from './pages/gameresults/ShowRiskAtti.jsx';
// import other things
import { AuthProvider } from './contexts/AuthContext.jsx';  
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BrowserCloseHandler from './components/BrowserCloseHandler.jsx'; // 导入
import './App.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <BrowserCloseHandler />
          <Toaster position="top-center" />
          <Routes>
            {/* HomePage path */}
            <Route path="/" element={<HomePage />} />
            {/* Auth Page path */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/settings" element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
              } />
            {/* Games Page path */}
            <Route path="/games/risk-attitude-elicit" element={
              <ProtectedRoute>
                <RiskAttiElicit />
              </ProtectedRoute>
              } />
            <Route path="/games/ambiguity-attitude-elicit" element={
              <ProtectedRoute>
                <AmbiguityAttiElicit />
              </ProtectedRoute>
              } />
            <Route path="/games/public-goods" element={
              <ProtectedRoute>
                <PublicGoodsGame />
              </ProtectedRoute>
              } />
            <Route path="/games/overconfidence-game" element={
              <ProtectedRoute>
                <OverconfidenceGame />
              </ProtectedRoute>
              } />
            <Route path="/games/mbti-elicit-game" element={
              <ProtectedRoute>
                <MBTIElicit />
              </ProtectedRoute>
              } />
            <Route path="/games/game-under-ambiguity" element={
              <ProtectedRoute>
                <GameUnderAmbiguity />
              </ProtectedRoute>
              } />
            {/* Game Results Page path */}
            <Route path="/gameresults/show-risk-attitudes" element={
              <ProtectedRoute>
                <ShowRiskAtti />
              </ProtectedRoute>
              } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div> 
      </AuthProvider>
    </Router>
  );
}

export default App;