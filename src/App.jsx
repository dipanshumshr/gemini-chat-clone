import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Layout from './Components/Layout';
import Dashboard from './Components/Dashboard';
import ChatPage from './Components/ChatPage';
import useAuthStore from './App/loginAuth';

export default function App() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
  
      <Route
        element={
          isLoggedIn ? <Layout /> : <Navigate to="/" replace />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat/:id" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
