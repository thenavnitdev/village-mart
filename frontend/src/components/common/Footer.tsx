import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto p-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Village Mart. All rights reserved.
      </div>
    </footer>
  );
}
