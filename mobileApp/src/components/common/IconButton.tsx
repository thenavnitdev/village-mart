import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

interface IconButtonProps {
  icon: string | React.ReactNode;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  style,
  backgroundColor,
}) => {
  const sizeStyles = {
    small: { width: 32, height: 32, borderRadius: 16 },
    medium: { width: 40, height: 40, borderRadius: 20 },
    large: { width: 48, height: 48, borderRadius: 24 },
  };

  const iconSize = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        styles[variant],
        disabled && styles.disabled,
        backgroundColor && { backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.light : colors.primary[500]}
        />
      ) : (
        <>
          {typeof icon === 'string' ? (
            <Text style={[styles.icon, { fontSize: iconSize[size] }]}>{icon}</Text>
          ) : (
            icon
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.neutral[100],
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    textAlign: 'center',
  },
});

export default IconButton;

