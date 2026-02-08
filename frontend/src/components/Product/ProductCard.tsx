import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye, 
  Share2,
  Plus,
  Minus
} from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    category: string;
    description?: string;
    inStock?: boolean;
  };
  onAddToCart?: (product: any) => void;
  onAddToWishlist?: (product: any) => void;
  onViewProduct?: (product: any) => void;
  onShare?: (product: any) => void;
  variant?: 'grid' | 'list';
  showQuickActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onViewProduct,
  onShare,
  variant = 'grid',
  showQuickActions = true
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onAddToCart?.({ ...product, quantity });
    setIsAddingToCart(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group"
      >
        <div className="flex">
          {/* Product Image */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                {product.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {showQuickActions && (
                  <>
                    <button
                      onClick={() => onViewProduct?.(product)}
                      className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onShare?.(product)}
                      className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleAddToWishlist}
                      className={`p-2 transition-colors ${
                        isWishlisted 
                          ? 'text-red-500' 
                          : 'text-gray-600 hover:text-red-500'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                ({product.rating}) • {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="text-sm text-green-600 font-semibold">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {product.badge}
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        {showQuickActions && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onViewProduct?.(product)}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onShare?.(product)}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-sm text-green-600 font-semibold">
              Save {discountPercentage}%
            </span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
