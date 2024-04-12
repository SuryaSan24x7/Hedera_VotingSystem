import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import AdminDashboard from './pages/AdminDashboard';
import VoterDashboard from './pages/VoterDashboard';
import AdminDemo from './pages/AdminDemo';
import VoterDemo from './pages/VoterDemo';

function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<AdminDemo/>}/>
          <Route path="/votedemo" element={<VoterDemo/>}/>
          <Route path="/admin" element={ <AdminDashboard /> } />
          <Route path="/voter" element={ <VoterDashboard /> } />
        </Routes>
      </Router>
  
  );
}

export default App;
