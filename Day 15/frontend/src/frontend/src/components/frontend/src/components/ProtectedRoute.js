// Day 15: Protected Route Component
// Ye component ek guard ki tarah kaam karta hai
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // Check karo token hai ya nahi
  // Agar hai to aage jaane do (Outlet), nahi to login page pe bhej do
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;