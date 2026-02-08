import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: 'small' | 'medium' | 'large';
  showReviews?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviews,
  size = 'medium',
  showReviews = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = {
    small: 12,
    medium: 16,
    large: 20,
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={{ fontSize: starSize[size] }}>
            ⭐
          </Text>
        ))}
        {hasHalfStar && (
          <Text style={{ fontSize: starSize[size] }}>✨</Text>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={{ fontSize: starSize[size], opacity: 0.3 }}>
            ⭐
          </Text>
        ))}
      </View>
      <Text style={[styles.ratingText, styles[`${size}Text`]]}>{rating.toFixed(1)}</Text>
      {showReviews && reviews !== undefined && (
        <Text style={[styles.reviewsText, styles[`${size}Text`]]}>
          ({reviews})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: 4,
  },
  reviewsText: {
    color: colors.text.muted,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

export default StarRating;

