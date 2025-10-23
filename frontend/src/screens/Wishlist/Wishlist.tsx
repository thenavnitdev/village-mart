import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  ArrowLeft,
  Share2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Masala Mathri",
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
      badge: "Best Seller",
      inStock: true,
      description: "Crispy and flavorful traditional mathri with aromatic spices"
    },
    {
      id: 2,
      name: "Namak Para",
      price: 80,
      originalPrice: 100,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      badge: "Popular",
      inStock: true,
      description: "Classic crispy namak para perfect for tea time"
    },
    {
      id: 3,
      name: "Chana Chur",
      price: 90,
      originalPrice: 110,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      badge: "New",
      inStock: false,
      description: "Spicy and tangy chana chur with perfect crunch"
    },
    {
      id: 4,
      name: "Aloo Bhujia",
      price: 100,
      originalPrice: 120,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
      badge: "Premium",
      inStock: true,
      description: "Premium quality aloo bhujia with authentic taste"
    },
    {
      id: 5,
      name: "Gulab Jamun",
      price: 200,
      originalPrice: 250,
      rating: 4.8,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      badge: "Sweet",
      inStock: true,
      description: "Soft and juicy gulab jamun in sugar syrup"
    },
    {
      id: 6,
      name: "Rasgulla",
      price: 180,
      originalPrice: 220,
      rating: 4.7,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      badge: "Classic",
      inStock: false,
      description: "Traditional Bengali rasgulla with perfect texture"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    // Implementation for adding to cart
    console.log('Add to cart:', id);
  };

  const shareItem = (item: any) => {
    // Implementation for sharing
    console.log('Share item:', item);
  };

  const viewProduct = (id: number) => {
    // Implementation for viewing product
    console.log('View product:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-xl text-gray-600">{wishlistItems.length} items in your wishlist</p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <Heart className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. They'll appear here for easy access.
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Filter and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-gray-600">Filter:</span>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>All Items</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Recently Added</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        {item.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <button
                        onClick={() => viewProduct(item.id)}
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => shareItem(item)}
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        title="Remove from Wishlist"
                      >
                        <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                      </button>
                    </div>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({item.rating}) • {item.reviews} reviews
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                      </div>
                      <span className="text-sm text-green-600 font-semibold">
                        Save ₹{item.originalPrice - item.price}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {item.inStock ? (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                      
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="px-6 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg font-semibold transition-colors">
                Clear Wishlist
              </button>
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors">
                Add All to Cart
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
