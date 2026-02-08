import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductsNavigationProp = StackNavigationProp<RootStackParamList>;
import { setProducts } from '../../store/slices/productSlice';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { mockProducts, categories } from '../../data/mockProducts';
import ProductCard from '../../components/Product/ProductCard';
import EmptyState from '../../components/common/EmptyState';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

const Products: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ProductsNavigationProp>();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating' | 'popular'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    const existingCartItem = cartItems.find(item => item.productId === product.id);
    if (existingCartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity: existingCartItem.quantity + 1 }));
    } else {
      dispatch(addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }));
    }
  };

  const handleToggleWishlist = (product: typeof mockProducts[0]) => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      category: product.category,
    }));
  };

  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Products' || 
      product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'popular') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }

  const sortLabels: { [key: string]: string } = {
    'default': 'Default',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'rating': 'Rating',
    'popular': 'Most Popular',
  };

  return (
    <View style={styles.container}>
      {/* Header with Search and Toolbar */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerIconButton, showFilters && styles.headerIconButtonActive]}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Text style={styles.headerIcon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconButton, viewMode === 'grid' && styles.headerIconButtonActive]}
              onPress={() => setViewMode('grid')}
            >
              <Text style={[styles.headerIcon, viewMode === 'grid' && styles.headerIconActive]}>⚏</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconButton, viewMode === 'list' && styles.headerIconButtonActive]}
              onPress={() => setViewMode('list')}
            >
              <Text style={[styles.headerIcon, viewMode === 'list' && styles.headerIconActive]}>☰</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortDropdown}
              onPress={() => {
                const sortOptions: Array<{ label: string; value: typeof sortBy }> = [
                  { label: 'Most Popular', value: 'popular' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' },
                  { label: 'Rating', value: 'rating' },
                  { label: 'Default', value: 'default' },
                ];
                const currentIndex = sortOptions.findIndex(opt => opt.value === sortBy);
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setSortBy(sortOptions[nextIndex].value);
              }}
            >
              <Text style={styles.sortText}>{sortLabels[sortBy]}</Text>
              <Text style={styles.sortArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories Filter */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <View style={styles.productsContainer}>
            {viewMode === 'grid' ? (
              <View style={styles.productsGrid}>
                {filteredProducts.map((product, index) => {
                  const isWishlisted = wishlistItems.some(item => item.id === product.id);
                  return (
                    <Animated.View
                      key={product.id}
                      entering={FadeInDown.delay(200 + index * 30).springify()}
                      style={{ width: cardWidth }}
                    >
                      <ProductCard
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          rating: product.rating || 0,
                          reviews: product.reviews || 0,
                          image: product.image,
                          badge: product.badge,
                          category: product.category,
                          inStock: product.inStock,
                        }}
                        isWishlisted={isWishlisted}
                        onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                        onAddToCart={() => handleAddToCart(product)}
                        onAddToWishlist={() => handleToggleWishlist(product)}
                        variant="grid"
                      />
                    </Animated.View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.productsList}>
                {filteredProducts.map((product, index) => {
                  const isWishlisted = wishlistItems.some(item => item.id === product.id);
                  return (
                    <Animated.View
                      key={product.id}
                      entering={FadeInDown.delay(200 + index * 30).springify()}
                    >
                      <ProductCard
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          rating: product.rating || 0,
                          reviews: product.reviews || 0,
                          image: product.image,
                          badge: product.badge,
                          category: product.category,
                          inStock: product.inStock,
                        }}
                        isWishlisted={isWishlisted}
                        onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                        onAddToCart={() => handleAddToCart(product)}
                        onAddToWishlist={() => handleToggleWishlist(product)}
                        variant="list"
                      />
                    </Animated.View>
                  );
                })}
              </View>
            )}
          </View>
        ) : (
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <EmptyState
              icon="🔍"
              title="No products found"
              message="Try adjusting your search or filters"
            />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    padding: 0,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconButtonActive: {
    backgroundColor: '#FEF3E2',
  },
  headerIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  headerIconActive: {
    color: '#F97316',
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  sortArrow: {
    fontSize: 10,
    color: '#6B7280',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  categoriesScroll: {
    marginVertical: 4,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  productsContainer: {
    marginTop: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  productsList: {
    gap: 12,
  },
});

export default Products;
