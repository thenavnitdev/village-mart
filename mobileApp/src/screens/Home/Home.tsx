import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProducts } from '../../store/slices/productSlice';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { mockProducts } from '../../data/mockProducts';
import ProductCard from '../../components/Product/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

// Banner images - using placeholder URLs, replace with actual banner images
const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
];

const CATEGORIES = [
  { id: '1', name: 'Namkeen', icon: '🥨', key: 'Namkeen' },
  { id: '2', name: 'Sweets', icon: '🍬', key: 'Sweets' },
  { id: '3', name: 'Dry Fruits', icon: '🥜', key: 'Dry Fruits' },
  { id: '4', name: 'Spices', icon: '🌶️', key: 'Spices' },
  { id: '5', name: 'Beverages', icon: '🥤', key: 'Beverages' },
  { id: '6', name: 'Grocery', icon: '🛒', key: 'Grocery' },
];

// Banner Carousel Component
const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % BANNER_IMAGES.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderBanner = useCallback(({ item }: { item: string }) => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={{ uri: item }} style={styles.bannerImage} resizeMode="cover" />
      </View>
    );
  }, []);

  const onScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width - 32));
    if (index !== currentIndex && index >= 0 && index < BANNER_IMAGES.length) {
      setCurrentIndex(index);
    }
  };

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width - 32,
      offset: (width - 32) * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={BANNER_IMAGES}
        renderItem={renderBanner}
        keyExtractor={(item, index) => `banner-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise<void>(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {BANNER_IMAGES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Category Item Component
const CategoryItem = React.memo<{
  category: typeof CATEGORIES[0];
  onPress: () => void;
}>(({ category, onPress }) => {
  return (
    <Animated.View entering={FadeInDown.delay(200).springify()}>
      <TouchableOpacity style={styles.categoryItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.categoryIconContainer}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
        </View>
        <Text style={styles.categoryName} numberOfLines={1}>
          {category.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

CategoryItem.displayName = 'CategoryItem';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { items: cartItems, itemCount } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { user } = useAppSelector((state) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleAddToCart = useCallback((product: typeof mockProducts[0]) => {
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
  }, [cartItems, dispatch]);

  const handleToggleWishlist = useCallback((product: typeof mockProducts[0]) => {
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
  }, [dispatch]);

  const handleCategoryPress = useCallback((category: typeof CATEGORIES[0]) => {
    (navigation as any).navigate('Main', {
      screen: 'Products',
      params: { category: category.key },
    });
  }, [navigation]);

  const featuredProducts = useMemo(() => {
    return products.slice(0, 8); // Show 8 featured products in 2x4 grid
  }, [products]);


  const renderCategory = useCallback(({ item }: { item: typeof CATEGORIES[0] }) => {
    return (
      <CategoryItem
        category={item}
        onPress={() => handleCategoryPress(item)}
      />
    );
  }, [handleCategoryPress]);

  const username = user?.name?.split(' ')[0] || 'Guest';
  const cartCount = itemCount || 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <View style={styles.headerTop}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>V</Text>
              </View>
              <Text style={styles.logoLabel}>VillageMart</Text>
            </View>

            {/* Cart Icon with Notification */}
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => (navigation as any).navigate('Main', { screen: 'Cart' })}
              activeOpacity={0.7}
            >
              <Text style={styles.cartIcon}>🛒</Text>
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
            {t('home.greeting', { name: username })} 👋
          </Text>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t('home.searchPlaceholder', 'Search products...')}
          />
          {/* Optional Voice Search Button */}
          <TouchableOpacity style={styles.voiceButton} activeOpacity={0.7}>
            <Text style={styles.voiceIcon}>🎤</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Promotional Banner Carousel */}
        {!searchQuery && (
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.bannerSection}>
            <BannerCarousel />
          </Animated.View>
        )}

        {/* Categories Section */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('home.categories', 'Categories')}
          </Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          />
        </Animated.View>

        {/* Featured Products Section */}
        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('home.featuredProducts', 'Featured Products')}
            </Text>
            <TouchableOpacity
              onPress={() => (navigation as any).navigate('Main', { screen: 'Products' })}
              activeOpacity={0.7}
            >
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
                {t('home.seeAll', 'See All')} →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productsGrid}>
            {featuredProducts.map((product, index) => {
              const isWishlisted = wishlistItems.some(wishlistItem => wishlistItem.id === product.id);
              
              return (
                <Animated.View
                  key={product.id}
                  entering={FadeInDown.delay(400 + index * 50).springify()}
                  style={{ width: CARD_WIDTH }}
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
                    onPress={() => (navigation as any).navigate('ProductDetails', { productId: product.id })}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToWishlist={() => handleToggleWishlist(product)}
                    variant="grid"
                  />
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logoLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  cartButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#F97316',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIcon: {
    fontSize: 20,
  },
  bannerSection: {
    marginBottom: 24,
  },
  carouselContainer: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerContainer: {
    width: width - 32,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 0,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#F97316',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316',
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});

export default Home;
