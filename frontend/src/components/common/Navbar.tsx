import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="text-xl font-bold">Village Mart</div>
        <nav className="space-x-4 hidden md:block">
          <a href="#" className="text-gray-700">Home</a>
          <a href="#" className="text-gray-700">Products</a>
          <a href="#" className="text-gray-700">About</a>
        </nav>
      </div>
    </header>
  );
}
