import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Masala Mathri",
      price: 120,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
      quantity: 2,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Namak Para",
      price: 80,
      originalPrice: 100,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      quantity: 1,
      badge: "Popular"
    },
    {
      id: 3,
      name: "Chana Chur",
      price: 90,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      quantity: 3,
      badge: "New"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: number) => {
    // Implementation for moving to wishlist
    console.log('Move to wishlist:', id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + delivery;

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
              Continue Shopping
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-xl text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Shopping
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -left-2">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          <span className="text-sm text-green-600 font-semibold">
                            Save ₹{item.originalPrice - item.price}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.price} each
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          title="Move to Wishlist"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          title="Remove Item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {delivery === 0 ? 'Free' : `₹${delivery}`}
                  </span>
                </div>
                {delivery > 0 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    Add ₹{500 - subtotal} more for free delivery
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors mb-4"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-600" />
                  <span>Earn rewards on every purchase</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Recommended product cards would go here */}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
