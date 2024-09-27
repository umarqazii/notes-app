import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';


const App: React.FC = () => {
  return (
    <>
    <BrowserRouter>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;
