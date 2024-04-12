import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import AdminDashboard from './pages/AdminDashboard';
import VoterDashboard from './pages/VoterDashboard';
import AdminDemo from './pages/AdminDemo';
import { login, logout } from './Auth/Auth';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<AdminDemo/>}/>
          <Route path="/admin" element={ <AdminDashboard /> } />
          <Route path="/voter" element={ <VoterDashboard /> } />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
