import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { getGlassmorphismStyle } from '../../theme/glassmorphism';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 999,
  size = 'medium',
}) => {
  const { theme, isDark } = useTheme();
  const glassStyle = getGlassmorphismStyle(isDark, 'blue');
  const isDecreaseDisabled = quantity <= min;
  const isIncreaseDisabled = quantity >= max;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={[styles.container, glassStyle]}>
      <TouchableOpacity
        onPress={onDecrease}
        disabled={isDecreaseDisabled}
        style={[
          styles.button,
          { backgroundColor: theme.colors.backgroundSecondary || theme.colors.background },
          isDecreaseDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[
          styles.buttonText,
          { color: theme.colors.text },
          isDecreaseDisabled && { color: theme.colors.textMuted },
        ]}>
          −
        </Text>
      </TouchableOpacity>
      <View style={[styles.quantityContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[
          styles.quantity,
          styles[`${size}Quantity`],
          { color: theme.colors.text },
        ]}>
          {quantity}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onIncrease}
        disabled={isIncreaseDisabled}
        style={[
          styles.button,
          { backgroundColor: theme.colors.backgroundSecondary || theme.colors.background },
          isIncreaseDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[
          styles.buttonText,
          { color: theme.colors.text },
          isIncreaseDisabled && { color: theme.colors.textMuted },
        ]}>
          +
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityContainer: {
    minWidth: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
  },
  smallQuantity: {
    fontSize: 14,
  },
  mediumQuantity: {
    fontSize: 16,
  },
  largeQuantity: {
    fontSize: 18,
  },
});

export default QuantitySelector;

