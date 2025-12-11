import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { AdminDashboard } from './pages/AdminDashboard';
import { RepDashboard } from './pages/RepDashboard';
import { ClientEntry } from './pages/ClientEntry';
import { SharedCart } from './pages/SharedCart';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

const ClientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout isClientView>{children}</Layout>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      
      {/* Shared Cart Route - Public Access */}
      <Route path="/share/:id" element={<SharedCart />} />

      {/* Authenticated Internal Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Catalog />
        </ProtectedRoute>
      } />
      
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />

      <Route path="/rep-dashboard" element={
        <ProtectedRoute>
          <RepDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Public Client Routes */}
      <Route path="/client" element={<ClientEntry />} />
      <Route path="/client/catalog" element={<ClientRoute><Catalog /></ClientRoute>} />
      <Route path="/client/cart" element={<ClientRoute><Cart /></ClientRoute>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;