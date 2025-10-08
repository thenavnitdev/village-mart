import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home.tsx";
import Navbar from "./components/common/Navbar.tsx";
import Footer from "./components/common/Footer.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here */}
            {/* <Route path="/products" element={<Products />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
