import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFromWishlist, toggleWishlist } from '../../store/slices/wishlistSlice';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import StarRating from '../../components/common/StarRating';
import Badge from '../../components/common/Badge';
import IconButton from '../../components/common/IconButton';

const Wishlist: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (item: typeof items[0]) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.productId === item.id);
    if (existingCartItem) {
      dispatch(updateQuantity({ productId: item.id, quantity: existingCartItem.quantity + 1 }));
    } else {
      dispatch(addToCart({
        id: item.id,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      }));
    }
  };

  const handleMoveToCart = (item: typeof items[0]) => {
    handleAddToCart(item);
    handleRemoveFromWishlist(item.id);
  };

  if (items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
        <EmptyState
          icon="❤️"
          title="Your wishlist is empty"
          message="Start saving your favorite products!"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <Text style={styles.title}>My Wishlist</Text>
          <Text style={styles.itemCount}>
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </Text>
        </Animated.View>

        {/* Wishlist Items */}
        <View style={styles.itemsContainer}>
          {items.map((item, index) => {
            const isInCart = cartItems.some(cartItem => cartItem.productId === item.id);
            const discountPercentage = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(150 + index * 50).springify()}
              >
                <Card style={styles.wishlistItem}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                    {discountPercentage > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                      <View style={styles.itemInfo}>
                        {item.category && (
                          <Text style={styles.category}>{item.category}</Text>
                        )}
                        <Text style={styles.itemName} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <View style={styles.ratingContainer}>
                          <StarRating rating={item.rating} reviews={item.reviews} size="small" />
                        </View>
                      </View>
                      <IconButton
                        icon="❤️"
                        onPress={() => handleRemoveFromWishlist(item.id)}
                        size="small"
                        variant="default"
                      />
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{formatPrice(item.price)}</Text>
                      {item.originalPrice && (
                        <Text style={styles.originalPrice}>
                          {formatPrice(item.originalPrice)}
                        </Text>
                      )}
                    </View>

                    <View style={styles.actionButtons}>
                      <Button
                        title={isInCart ? 'In Cart ✓' : 'Add to Cart'}
                        onPress={() => handleAddToCart(item)}
                        variant={isInCart ? 'secondary' : 'primary'}
                        size="small"
                        disabled={isInCart}
                        style={styles.cartButton}
                      />
                      {!isInCart && (
                        <Button
                          title="Move to Cart"
                          onPress={() => handleMoveToCart(item)}
                          variant="outline"
                          size="small"
                          style={styles.moveButton}
                        />
                      )}
                    </View>
                  </View>
                </Card>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemsContainer: {
    gap: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F9FAFB',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  category: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 22,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F97316',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cartButton: {
    flex: 1,
  },
  moveButton: {
    flex: 1,
  },
});

export default Wishlist;
