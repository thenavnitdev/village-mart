import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { formatPrice } from '../../utils/formatPrice';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: 'small' | 'medium' | 'large';
  showDiscount?: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  size = 'medium',
  showDiscount = true,
}) => {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.price, styles[`${size}Price`]]}>{formatPrice(price)}</Text>
      {originalPrice && originalPrice > price && (
        <>
          <Text style={[styles.originalPrice, styles[`${size}OriginalPrice`]]}>
            {formatPrice(originalPrice)}
          </Text>
          {showDiscount && discountPercentage > 0 && (
            <Text style={[styles.discount, styles[`${size}Discount`]]}>
              {discountPercentage}% OFF
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontWeight: 'bold',
    color: colors.primary[500],
    marginRight: 8,
  },
  originalPrice: {
    color: colors.text.muted,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    color: colors.success,
    fontWeight: '600',
  },
  smallPrice: {
    fontSize: 14,
  },
  mediumPrice: {
    fontSize: 18,
  },
  largePrice: {
    fontSize: 24,
  },
  smallOriginalPrice: {
    fontSize: 12,
  },
  mediumOriginalPrice: {
    fontSize: 14,
  },
  largeOriginalPrice: {
    fontSize: 16,
  },
  smallDiscount: {
    fontSize: 10,
  },
  mediumDiscount: {
    fontSize: 12,
  },
  largeDiscount: {
    fontSize: 14,
  },
});

export default PriceTag;

