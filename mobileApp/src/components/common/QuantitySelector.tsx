import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';
import IconButton from './IconButton';

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
  const isDecreaseDisabled = quantity <= min;
  const isIncreaseDisabled = quantity >= max;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrease}
        disabled={isDecreaseDisabled}
        style={[
          styles.button,
          isDecreaseDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[styles.buttonText, isDecreaseDisabled && styles.buttonTextDisabled]}>
          −
        </Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={[styles.quantity, styles[`${size}Quantity`]]}>{quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={onIncrease}
        disabled={isIncreaseDisabled}
        style={[
          styles.button,
          isIncreaseDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[styles.buttonText, isIncreaseDisabled && styles.buttonTextDisabled]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  buttonTextDisabled: {
    color: colors.text.muted,
  },
  quantityContainer: {
    minWidth: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.light,
  },
  quantity: {
    fontWeight: '600',
    color: colors.text.primary,
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

