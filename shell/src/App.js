import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load MFEs
const Transactions = lazy(() => import('transactions/App'));
const Profile = lazy(() => import('profile/App'));
const Notifications = lazy(() => import('notifications/App'));

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="transactions"
              element={
                <Suspense fallback={<div>Loading Transactions...</div>}>
                  <Transactions />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<div>Loading Profile...</div>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="notifications"
              element={
                <Suspense fallback={<div>Loading Notifications...</div>}>
                  <Notifications />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
