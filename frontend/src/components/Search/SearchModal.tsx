import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Masala Mathri',
    'Namak Para',
    'Chana Chur',
    'Aloo Bhujia'
  ]);
  const [trendingSearches, setTrendingSearches] = useState([
    'Gulab Jamun',
    'Rasgulla',
    'Dry Fruits',
    'Spices'
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularProducts = [
    {
      id: 1,
      name: "Masala Mathri",
      price: 120,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop",
      category: "Namkeen"
    },
    {
      id: 2,
      name: "Namak Para",
      price: 80,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      category: "Namkeen"
    },
    {
      id: 3,
      name: "Gulab Jamun",
      price: 200,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop",
      category: "Sweets"
    }
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const results = popularProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    // Add to recent searches
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Content */}
              <div className="max-h-96 overflow-y-auto">
                {searchQuery.length === 0 ? (
                  <div className="p-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleRecentSearch(search)}
                              className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Products */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Products</h3>
                      <div className="space-y-3">
                        {popularProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{product.category}</span>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">₹{product.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        <span className="ml-3 text-gray-600">Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                          Search Results ({searchResults.length})
                        </h3>
                        <div className="space-y-3">
                          {searchResults.map((product: any) => (
                            <div
                              key={product.id}
                              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{product.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-500">{product.category}</span>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-900">₹{product.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600">Try searching with different keywords</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    View All Results
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    Advanced Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
