import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Home from "./screens/Home/Home.tsx";
import Products from "./screens/Products/Products.tsx";
import Cart from "./screens/Cart/Cart.tsx";
import Wishlist from "./screens/Wishlist/Wishlist.tsx";
import Checkout from "./screens/Checkout/Checkout.tsx";
import Profile from "./screens/Profile/Profile.tsx";
import About from "./screens/About/About.tsx";
import Career from "./screens/Career/Career.tsx";
import Login from "./screens/Login/Login.tsx";
import LayoutTest from "./components/Test/LayoutTest.tsx";
import Navbar from "./components/common/Navbar.tsx";
import Footer from "./components/common/Footer.tsx";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          {/* Navbar */}
          <Navbar 
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
            onLanguageChange={handleLanguageChange}
            currentLanguage={currentLanguage}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<div className="pt-20 flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Orders Page</h2>
                    <p className="text-gray-600">Order history would be displayed here</p>
                  </div>
                </div>} />
                <Route path="/settings" element={<div className="pt-20 flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Settings Page</h2>
                    <p className="text-gray-600">User settings would be managed here</p>
                  </div>
                </div>} />
                <Route path="/categories" element={<div className="pt-20 flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Categories Page</h2>
                    <p className="text-gray-600">Product categories would be displayed here</p>
                  </div>
                </div>} />
                <Route path="/about" element={<About />} />
                <Route path="/career" element={<Career />} />
                <Route path="/contact" element={<div className="pt-20 flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-600">Contact form and information would be displayed here</p>
                  </div>
                </div>} />
                <Route path="/test" element={<LayoutTest />} />
              </Routes>
            </motion.div>
          </main>

          {/* Footer */}
          <Footer />

          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
