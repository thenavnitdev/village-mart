import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
  const { theme } = useTheme();
  const scale = useSharedValue(1);
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

  const handlePress = () => {
    if (!disabled && !loading) {
      scale.value = withSequence(
        withSpring(0.85, { damping: 12, stiffness: 300 }),
        withSpring(1, { damping: 12, stiffness: 300 })
      );
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getButtonStyle = () => {
    const baseStyle = [styles.button, sizeStyles[size], disabled && styles.disabled, backgroundColor && { backgroundColor }, style];
    
    if (variant === 'primary') {
      return [...baseStyle, { backgroundColor: backgroundColor || theme.colors.primary }];
    } else if (variant === 'outline') {
      return [...baseStyle, { borderColor: theme.colors.border }];
    } else {
      return [...baseStyle, { backgroundColor: theme.colors.backgroundSecondary }];
    }
  };

  return (
    <AnimatedTouchable
      style={[
        getButtonStyle(),
        animatedStyle,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.textLight : theme.colors.primary}
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
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    textAlign: 'center',
  },
});

export default IconButton;

