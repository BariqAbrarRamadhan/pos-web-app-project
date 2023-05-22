import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import BillsPage from './pages/BillsPage';
import TransaksiPage from './pages/TransaksiPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>
          } />
        <Route
          path="/transaksi"
          element={
            <ProtectedRoute>
              <TransaksiPage />
            </ProtectedRoute>
          } />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

// export default App;
