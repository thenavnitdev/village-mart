import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { colors, lightTheme } from '../../theme';
import { formatPrice } from '../../utils/formatPrice';
import IconButton from '../common/IconButton';
import Badge from '../common/Badge';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import Card from '../common/Card';

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
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (variant === 'list') {
    return (
      <Card style={styles.listCard}>
        <Pressable onPress={onPress} style={styles.listContainer}>
          <View style={styles.listImageContainer}>
            <Image source={{ uri: product.image }} style={styles.listImage} />
            {product.badge && (
              <Badge text={product.badge} variant="primary" style={styles.badge} />
            )}
            {product.inStock === false && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>

          <View style={styles.listContent}>
            <View style={styles.listHeader}>
              <View style={styles.listTitleContainer}>
                <Text style={styles.listTitle} numberOfLines={2}>
                  {product.name}
                </Text>
                {product.category && (
                  <Text style={styles.listCategory}>{product.category}</Text>
                )}
              </View>
              <IconButton
                icon={isWishlisted ? '❤️' : '🤍'}
                onPress={onAddToWishlist}
                size="small"
              />
            </View>

            <StarRating rating={product.rating} reviews={product.reviews} />

            <View style={styles.listPriceContainer}>
              <Text style={styles.listPrice}>{formatPrice(product.price)}</Text>
              {product.originalPrice && (
                <>
                  <Text style={styles.listOriginalPrice}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                  {discountPercentage > 0 && (
                    <Badge text={`${discountPercentage}% OFF`} variant="success" size="small" />
                  )}
                </>
              )}
            </View>

            <Button
              title="Add to Cart"
              onPress={onAddToCart}
              variant="primary"
              size="small"
              disabled={product.inStock === false}
            />
          </View>
        </Pressable>
      </Card>
    );
  }

  return (
    <Card style={styles.gridCard}>
      <Pressable onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.badge && (
            <Badge text={product.badge} variant="primary" style={styles.badge} />
          )}
          <View style={styles.wishlistButton}>
            <IconButton
              icon={isWishlisted ? '❤️' : '🤍'}
              onPress={onAddToWishlist}
              size="small"
            />
          </View>
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

          <StarRating rating={product.rating} reviews={product.reviews} />

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>
                  {formatPrice(product.originalPrice)}
                </Text>
                {discountPercentage > 0 && (
                  <Text style={styles.discount}>{discountPercentage}% OFF</Text>
                )}
              </>
            )}
          </View>

          <Button
            title="Add to Cart"
            onPress={onAddToCart}
            variant="primary"
            size="small"
            disabled={product.inStock === false}
          />
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  listCard: {
    marginBottom: 12,
  },
  listContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: colors.neutral[100],
  },
  listImageContainer: {
    width: 150,
    height: 150,
    position: 'relative',
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  listImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: colors.text.light,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  content: {
    padding: 12,
  },
  listContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listTitleContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  listCategory: {
    fontSize: 12,
    color: colors.text.muted,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary[500],
    marginRight: 8,
  },
  listPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary[500],
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.text.muted,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  listOriginalPrice: {
    fontSize: 14,
    color: colors.text.muted,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
});

export default ProductCard;

