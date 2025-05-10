import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Employees from './pages/Employees';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { SnackbarProvider } from './components/common/SnackbarContext';
import AxiosProvider from './components/providers/AxiosProvider';
import { AuthProvider } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <AxiosProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="companies" element={<Companies />} />
              <Route path="employees" element={<Employees />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AxiosProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
