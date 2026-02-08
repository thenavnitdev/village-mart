import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, lightTheme } from '../../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'rectangular' | 'circular' | 'text';
  style?: ViewStyle;
  animation?: 'pulse' | 'shimmer';
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  style,
  animation = 'pulse',
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation === 'shimmer') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animation, animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: animation === 'shimmer' ? [0.3, 0.7] : [0.3, 0.6],
  });

  const borderRadius = variant === 'circular' ? 9999 : variant === 'text' ? 4 : 8;

  const widthStyle = typeof width === 'number' 
    ? { width } 
    : width === '100%' 
    ? { width: '100%' as const }
    : {};

  const heightStyle = typeof height === 'number' 
    ? { height } 
    : height === '100%' 
    ? { height: '100%' as const }
    : {};

  return (
    <Animated.View
      style={[
        styles.skeleton,
        widthStyle,
        heightStyle,
        {
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

// Predefined skeleton components
export const ProductCardSkeleton: React.FC = () => (
  <View style={skeletonStyles.card}>
    <Skeleton height={200} style={skeletonStyles.image} />
    <View style={skeletonStyles.content}>
      <Skeleton height={20} width="80%" style={skeletonStyles.title} />
      <Skeleton height={16} width="60%" style={skeletonStyles.subtitle} />
      <Skeleton height={24} width="40%" style={skeletonStyles.price} />
    </View>
  </View>
);

export const ProductListSkeleton: React.FC = () => (
  <View style={skeletonStyles.listCard}>
    <Skeleton height={150} width={150} style={skeletonStyles.listImage} />
    <View style={skeletonStyles.listContent}>
      <Skeleton height={24} width="70%" style={skeletonStyles.listTitle} />
      <Skeleton height={16} width="50%" style={skeletonStyles.listSubtitle} />
      <Skeleton height={20} width="40%" style={skeletonStyles.listPrice} />
      <Skeleton height={36} width={100} style={skeletonStyles.listButton} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral[200],
  },
});

const skeletonStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.light,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...lightTheme.shadows.md,
  },
  image: {
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  price: {
    marginBottom: 8,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.light,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    padding: 12,
  },
  listImage: {
    borderRadius: 8,
    marginRight: 12,
  },
  listContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listTitle: {
    marginBottom: 8,
  },
  listSubtitle: {
    marginBottom: 8,
  },
  listPrice: {
    marginBottom: 8,
  },
  listButton: {
    borderRadius: 8,
  },
});

export default Skeleton;

