import React from 'react';

const LayoutTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold text-gradient">NamkeenMart</span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="/products" className="text-gray-700 hover:text-orange-600 transition-colors">Products</a>
              <a href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                🔍
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                ❤️
              </button>
              <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                🛒
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
              Premium Namkeen Collection
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-orange-600">
              Authentic Indian Snacks
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
              Discover our handpicked selection of traditional namkeens made with love and authentic recipes.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Shop Now →
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We bring you the finest namkeens with unmatched quality and service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "🚚", title: "Free Delivery", desc: "Free delivery on orders above ₹500" },
                { icon: "🛡️", title: "Quality Guarantee", desc: "100% authentic and fresh products" },
                { icon: "⏰", title: "Quick Service", desc: "Fast processing and delivery" },
                { icon: "🏆", title: "Premium Quality", desc: "Handpicked finest ingredients" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our best-selling namkeens loved by thousands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Masala Mathri", price: "₹120", image: "🥨" },
                { name: "Namak Para", price: "₹80", image: "🥨" },
                { name: "Chana Chur", price: "₹90", image: "🥨" },
                { name: "Aloo Bhujia", price: "₹100", image: "🥨" }
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    </div>
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-2xl font-bold">NamkeenMart</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted destination for authentic Indian namkeens and sweets.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" rel="noopener noreferrer" target="_blank" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="https://twitter.com" rel="noopener noreferrer" target="_blank" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="https://instagram.com" rel="noopener noreferrer" target="_blank" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="https://youtube.com" rel="noopener noreferrer" target="_blank" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
            </div>
            <p className="text-gray-400 mt-6">© 2024 NamkeenMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutTest;
