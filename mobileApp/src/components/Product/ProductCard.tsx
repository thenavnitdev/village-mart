import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  FadeInDown,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils/formatPrice';
import IconButton from '../common/IconButton';
import Badge from '../common/Badge';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import Card from '../common/Card';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    category?: string;
    inStock?: boolean;
  };
  onPress?: () => void;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  variant?: 'grid' | 'list';
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onAddToWishlist,
  variant = 'grid',
  isWishlisted = false,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.96, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    onPress?.();
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (variant === 'list') {
    return (
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <Card style={styles.listCard}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.listContainer, animatedCardStyle]}
          >
            <View style={styles.listImageContainer}>
              <Image source={{ uri: product.image }} style={styles.listImage} resizeMode="cover" />
              {product.badge && (
                <View style={styles.badgeContainer}>
                  <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={onAddToWishlist}
              >
                <View style={styles.heartIcon}>
                  <Text style={styles.heartIconText}>{isWishlisted ? '❤️' : '🤍'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.listContent}>
              <Text style={styles.listTitle} numberOfLines={2}>
                {product.name}
              </Text>

              <View style={styles.ratingRow}>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const isFull = starValue <= Math.floor(product.rating);
                    const isHalf = starValue === Math.ceil(product.rating) && product.rating % 1 >= 0.5;
                    return (
                      <Text key={i} style={[styles.star, !isFull && !isHalf && styles.starEmpty]}>
                        {isFull ? '⭐' : isHalf ? '✨' : '⭐'}
                      </Text>
                    );
                  })}
                </View>
                <Text style={styles.ratingText}>({product.rating.toFixed(1)})</Text>
                <Text style={styles.reviewsText}>{product.reviews} reviews</Text>
              </View>

              <View style={styles.listPriceContainer}>
                <Text style={[styles.listPrice, { color: theme.colors.primary }]}>{formatPrice(product.price)}</Text>
                {product.originalPrice && (
                  <Text style={[styles.listOriginalPrice, { color: theme.colors.textMuted }]}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
              </View>

              <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: theme.colors.primary }]} onPress={onAddToCart}>
                <Text style={styles.cartIcon}>🛒</Text>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </AnimatedPressable>
        </Card>
      </Animated.View>
    );
  }

  // Grid variant - 3 columns
  return (
    <Animated.View entering={FadeInDown.delay(100).springify()}>
      <Card style={styles.gridCard}>
        <AnimatedPressable onPress={handlePress} style={animatedCardStyle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
            {product.badge && (
              <View style={styles.badgeContainer}>
                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              </View>
            )}
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={onAddToWishlist}
            >
              <View style={styles.heartIcon}>
                <Text style={styles.heartIconText}>{isWishlisted ? '❤️' : '🤍'}</Text>
              </View>
            </TouchableOpacity>
            {product.inStock === false && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>

            <View style={styles.ratingRow}>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  const isFull = starValue <= Math.floor(product.rating);
                  const isHalf = starValue === Math.ceil(product.rating) && product.rating % 1 >= 0.5;
                  return (
                    <Text key={i} style={[styles.star, !isFull && !isHalf && styles.starEmpty]}>
                      {isFull ? '⭐' : isHalf ? '✨' : '⭐'}
                    </Text>
                  );
                })}
              </View>
              <Text style={styles.ratingText}>({product.rating.toFixed(1)})</Text>
              <Text style={styles.reviewsText}>{product.reviews} reviews</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: theme.colors.primary }]}>{formatPrice(product.price)}</Text>
              {product.originalPrice && (
                <Text style={[styles.originalPrice, { color: theme.colors.textMuted }]}>
                  {formatPrice(product.originalPrice)}
                </Text>
              )}
            </View>

            <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: theme.colors.primary }]} onPress={onAddToCart}>
              <Text style={styles.cartIcon}>🛒</Text>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </AnimatedPressable>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  listCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#F9FAFB',
  },
  listImageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  heartIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  heartIconText: {
    fontSize: 14,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  content: {
    padding: 6,
  },
  listContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
    lineHeight: 16,
    minHeight: 30,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 3,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    flexWrap: 'wrap',
    gap: 3,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 3,
  },
  star: {
    fontSize: 12,
  },
  starEmpty: {
    opacity: 0.3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 3,
  },
  reviewsText: {
    fontSize: 11,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
  },
  listPrice: {
    fontSize: 17,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 11,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  listOriginalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  addToCartButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  cartIcon: {
    fontSize: 14,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProductCard;
