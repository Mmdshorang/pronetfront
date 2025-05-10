// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Companies from "./pages/Companies";
import Evaluations from "./pages/Evaluations";
import Search from "./pages/Search";
import ProfileRoute from './components/ProfileRoute';
import PublicProfileRoute from './components/PublicProfileRoute';
import NotFound from './pages/NotFound';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes with Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="employees" element={<Employees />} />
        <Route path="evaluations" element={<Evaluations />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<ProfileRoute />} />
        <Route path="profile/:id" element={<PublicProfileRoute />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
