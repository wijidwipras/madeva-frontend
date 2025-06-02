import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from "./layouts/Layout";
import NoPage from "./layouts/NoPage";
import Home from "./pages/Home";
import LoginPage from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';


function App() {
  return (
      <BrowserRouter>
          <Routes>
            {/* Rute Publik */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rute Terproteksi yang menggunakan Layout Utama */}
            <Route 
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            ></Route>

            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Home />} />

            <Route path="*" element={<NoPage />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Slide}
          />
      </BrowserRouter>
  );
}

export default App;