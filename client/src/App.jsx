import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AmbiguityAttiElicit from './pages/AmbiguityAttiElicit.jsx';
import RiskAttiElicit from './pages/RiskAttiElicit.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
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
          </Routes>
        </div> 
      </AuthProvider>
    </Router>
  );
}

export default App;