import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => {
  // Check if color is a primary color (not gray)
  const isActive = color !== '#6B7280' && color !== '#9CA3AF';
  const primaryColor = isActive ? color : '#6B7280';
  
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: 6 }]}>
      {isActive ? (
        <View style={[styles.iconBackground, { backgroundColor: primaryColor }]}>
          <View style={[styles.houseRoofOutline, { borderBottomColor: '#FFFFFF' }]} />
          <View style={[styles.houseBodyOutline, { borderColor: '#FFFFFF' }]} />
        </View>
      ) : (
        <>
          <View style={[styles.houseRoofOutline, { borderBottomColor: primaryColor }]} />
          <View style={[styles.houseBodyOutline, { borderColor: primaryColor }]} />
        </>
      )}
    </View>
  );
};

export const ProductsIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.bagOutline, { borderColor: color }]}>
        <View style={[styles.bagHandle, { borderColor: color }]} />
      </View>
    </View>
  );
};

export const CartIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.cartBody, { borderColor: color }]} />
      <View style={[styles.cartHandle, { borderColor: color }]} />
      <View style={[styles.cartWheel1, { borderColor: color }]} />
      <View style={[styles.cartWheel2, { borderColor: color }]} />
    </View>
  );
};

export const WishlistIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.heartOutline}>
        <View style={[styles.heartLeftArc, { borderColor: color }]} />
        <View style={[styles.heartRightArc, { borderColor: color }]} />
        <View style={[styles.heartBottom, { borderColor: color }]} />
      </View>
    </View>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.profileHeadOutline, { borderColor: color }]} />
      <View style={[styles.profileBodyOutline, { borderColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconBackground: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Home Icon Styles - Outline
  houseRoofOutline: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  houseBodyOutline: {
    width: 12,
    height: 8,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderStyle: 'solid',
    marginTop: -2,
  },
  // Products Icon Styles - Outline
  bagOutline: {
    width: 14,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 2,
    borderStyle: 'solid',
    position: 'relative',
  },
  bagHandle: {
    width: 4,
    height: 4,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderRadius: 2,
    position: 'absolute',
    top: -3,
    left: 5,
  },
  // Cart Icon Styles - Outline
  cartBody: {
    width: 14,
    height: 8,
    borderWidth: 1.5,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomWidth: 0,
    borderStyle: 'solid',
  },
  cartHandle: {
    width: 3,
    height: 3,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    position: 'absolute',
    top: 0,
    right: -3,
  },
  cartWheel1: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: -1,
    left: 2,
  },
  cartWheel2: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: -1,
    right: 2,
  },
  // Wishlist Icon Styles - Outline
  heartOutline: {
    width: 16,
    height: 14,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartLeftArc: {
    width: 7,
    height: 7,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 7,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    position: 'absolute',
    left: 1,
    top: 0,
  },
  heartRightArc: {
    width: 7,
    height: 7,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 7,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    position: 'absolute',
    right: 1,
    top: 0,
  },
  heartBottom: {
    width: 8,
    height: 8,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 4,
    transform: [{ rotate: '45deg' }],
  },
  // Profile Icon Styles - Outline
  profileHeadOutline: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderStyle: 'solid',
    marginBottom: 2,
  },
  profileBodyOutline: {
    width: 14,
    height: 8,
    borderRadius: 7,
    borderWidth: 1.5,
    borderStyle: 'solid',
    marginTop: -2,
  },
});

