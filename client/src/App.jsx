import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RiskAttiElicit from './pages/RiskAttiElicit.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';  // 导入
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/risk-attitude-elicit" element={<RiskAttiElicit />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;