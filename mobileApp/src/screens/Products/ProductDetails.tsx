import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { formatPrice } from '../../utils/formatPrice';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import QuantitySelector from '../../components/common/QuantitySelector';
import StarRating from '../../components/common/StarRating';
import Card from '../../components/common/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
  inStock?: boolean;
}

const ProductDetails: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const route = useRoute<ProductDetailsRouteProp>();
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  // Get product from route params or use mock data
  const productId = (route.params as any)?.productId || '1';
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - In real app, fetch from API using productId
  const product: Product = {
    id: productId,
    name: 'Premium Namkeen Mix',
    description: 'A delightful mix of traditional Indian snacks including namak para, mathri, bhujia, and more. Made with finest quality ingredients and authentic spices. Perfect for evening snacks or as a party treat. This premium mix offers a perfect blend of salty and spicy flavors that will leave you craving for more.',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400',
    category: 'Namkeen',
    stock: 50,
    rating: 4.5,
    reviews: 120,
    badge: 'Best Seller',
    inStock: true,
  };

  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const existingCartItem = cartItems.find(item => item.productId === product.id);
  const cartQuantity = existingCartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (existingCartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity: existingCartItem.quantity + quantity }));
    } else {
      dispatch(addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      }));
    }
    // Reset quantity after adding
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category: product.category,
    }));
  };

  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Product Details"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
        rightIcon={
          <TouchableOpacity onPress={handleToggleWishlist} style={styles.wishlistIcon}>
            <Text style={styles.wishlistIconText}>{isWishlisted ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Images */}
        <Animated.View entering={FadeIn.duration(300)} style={styles.imageSection}>
          <Image
            source={{ uri: images[selectedImage] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {product.badge && (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageThumbnails}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnail,
                  selectedImage === index && { borderColor: theme.colors.primary },
                ]}
              >
                <Image source={{ uri: img }} style={styles.thumbnailImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Product Info */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Card style={styles.infoCard}>
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={[styles.productName, { color: theme.colors.text }]}>
                  {product.name}
                </Text>
                {product.category && (
                  <Text style={[styles.category, { color: theme.colors.textMuted }]}>
                    {product.category}
                  </Text>
                )}
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingSection}>
              <View style={styles.ratingRow}>
                <StarRating rating={product.rating} size={18} />
                <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                  {product.rating.toFixed(1)}
                </Text>
                <Text style={[styles.reviewsText, { color: theme.colors.textMuted }]}>
                  ({product.reviews} reviews)
                </Text>
              </View>
              <View style={[styles.stockBadge, { backgroundColor: product.inStock ? theme.colors.primaryLight : '#FEE2E2' }]}>
                <Text style={[styles.stockText, { color: product.inStock ? theme.colors.primaryDark : '#DC2626' }]}>
                  {product.inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                </Text>
              </View>
            </View>

            {/* Price */}
            <View style={styles.priceSection}>
              <Text style={[styles.price, { color: theme.colors.primary }]}>
                {formatPrice(product.price)}
              </Text>
              {product.originalPrice && (
                <>
                  <Text style={[styles.originalPrice, { color: theme.colors.textMuted }]}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                  <View style={[styles.discountBadge, { backgroundColor: theme.colors.primaryLight }]}>
                    <Text style={[styles.discountText, { color: theme.colors.primaryDark }]}>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
              <Text style={[styles.description, { color: theme.colors.textMuted }]}>
                {product.description}
              </Text>
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Features</Text>
              {[
                'Made with finest quality ingredients',
                'Authentic traditional recipes',
                'Long shelf life',
                'Hygienically packed',
                '100% Vegetarian',
              ].map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={[styles.featureIcon, { color: theme.colors.primary }]}>✓</Text>
                  <Text style={[styles.featureText, { color: theme.colors.textMuted }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
        <View style={styles.quantitySection}>
          <Text style={[styles.quantityLabel, { color: theme.colors.textMuted }]}>Quantity:</Text>
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => setQuantity(prev => prev + 1)}
            onDecrement={() => setQuantity(prev => Math.max(1, prev - 1))}
            min={1}
            max={product.stock}
          />
        </View>
        <Button
          title={existingCartItem ? `Update Cart (${cartQuantity + quantity})` : 'Add to Cart'}
          onPress={handleAddToCart}
          variant="primary"
          size="large"
          disabled={!product.inStock}
          style={styles.addToCartButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  wishlistIcon: {
    padding: 8,
  },
  wishlistIconText: {
    fontSize: 24,
  },
  imageSection: {
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#F3F4F6',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  imageThumbnails: {
    marginTop: 12,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    margin: 16,
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleSection: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 14,
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  featuresSection: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1,
  },
});

export default ProductDetails;

