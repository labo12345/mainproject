import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import FoodPage from './pages/FoodPage';
import TaxiPage from './pages/TaxiPage';
import PropertiesPage from './pages/PropertiesPage';
import ErrandsPage from './pages/ErrandsPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import ConnectionTestPage from './pages/ConnectionTestPage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/taxi" element={<TaxiPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/errands" element={<ErrandsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/connection-test" element={<ConnectionTestPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;