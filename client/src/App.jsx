import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import HomePages
import BehavioralScienceHomePage from './pages/BehavioralScienceHomePage.jsx';
import MainPortalPage from './pages/MainPortalPage.jsx';
import RProgrammingHomePage from './pages/RProgrammingHomePage.jsx';
import LogicHomePage from './pages/LogicHomePage.jsx';

// import game pages
import PublicGoodsGame from './pages/games/PublicGoodsGame.jsx';
import AmbiguityAttiElicit from './pages/games/AmbiguityAttiElicit.jsx';
import RiskAttiElicit from './pages/games/RiskAttiElicit.jsx';
import OverconfidenceGame from './pages/games/OverconfidenceGame.jsx';
import GameUnderAmbiguity from './pages/games/GameUnderAmbiguity.jsx';
import MBTIElicit from './pages/games/MbtiElicit.jsx';
import ConfirmationBiasGame from './pages/games/ConfirmationBiasGame.jsx';
import OUSSurvey from './pages/games/OUSSurvey.jsx';
import MFQSurvey from './pages/games/MFQSurvey.jsx';
import SVOSurvey from './pages/games/SVOSurvey.jsx';
import PVQSurvey from './pages/games/PVQSurvey.jsx';
// import auth pages
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import UserSettings from './pages/auth/UserSettings.jsx';
// import game results pags
import ShowRiskAtti from './pages/gameresults/ShowRiskAtti.jsx';
// import R Class pages
import HtmlViewer from './pages/RClass/htmlViewer.jsx';
// import other things
import { AuthProvider } from './contexts/AuthContext.jsx';  
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BrowserCloseHandler from './components/BrowserCloseHandler.jsx';
import Footer from './components/Footer.jsx';
import './App.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <BrowserCloseHandler />
          <Toaster position="top-center" />
          <div className="RoutesClass">
            <Routes>
              {/* HomePages path */}
              <Route path="/" element={<MainPortalPage />} />
              <Route path="/courses/behavioral-science" element={<BehavioralScienceHomePage />} />
              <Route path="/courses/r-programming" element={<RProgrammingHomePage />} />
              <Route path="/courses/logic" element={<LogicHomePage />} />
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
              <Route path="/games/confirmation-bias-game" element={
                <ProtectedRoute>
                  <ConfirmationBiasGame />
                </ProtectedRoute>
                } />
              <Route path="/games/ous-survey" element={
                <ProtectedRoute>
                  <OUSSurvey />
                </ProtectedRoute>
                } />
              <Route path="/games/mfq-survey" element={
                <ProtectedRoute>
                  < MFQSurvey />
                </ProtectedRoute>
                } />
              <Route path="/games/svo-survey" element={
                <ProtectedRoute>
                  < SVOSurvey />
                </ProtectedRoute>
                } />
              <Route path="/games/pvq-survey" element={
                <ProtectedRoute>
                  < PVQSurvey />
                </ProtectedRoute>
                } />

              {/* Game Results Page path */}
              <Route path="/gameresults/show-risk-attitudes" element={
                <ProtectedRoute>
                  <ShowRiskAtti />
                </ProtectedRoute>
                } />
              
              {/* R Class Pages path */}
              <Route path="/rclass/html-viewer" element={
                <ProtectedRoute>
                  <HtmlViewer />
                </ProtectedRoute>
                } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div> 
      </AuthProvider>
    </Router>
  );
}

export default App;