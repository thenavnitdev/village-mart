import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector } from '../../store/hooks';
import { HomeIcon, ProductsIcon, CartIcon, WishlistIcon, ProfileIcon } from '../icons/TabIcons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface TabIconProps {
  icon: string;
  label: string;
  isFocused: boolean;
  color: string;
  inactiveColor: string;
  badgeCount?: number;
}

const TabIcon: React.FC<TabIconProps & { routeName?: string }> = ({ icon, label, isFocused, color, inactiveColor, routeName, badgeCount }) => {
  const scale = useSharedValue(isFocused ? 1 : 0.85);
  const opacity = useSharedValue(isFocused ? 1 : 0.6);
  const translateY = useSharedValue(isFocused ? 0 : 4);
  const indicatorOpacity = useSharedValue(isFocused ? 1 : 0);
  const indicatorScale = useSharedValue(isFocused ? 1 : 0);

  React.useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      indicatorOpacity.value = withTiming(1, { duration: 250 });
      indicatorScale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      scale.value = withSpring(0.85, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(0.6, { duration: 200 });
      translateY.value = withSpring(4, {
        damping: 15,
        stiffness: 150,
      });
      indicatorOpacity.value = withTiming(0, { duration: 250 });
      indicatorScale.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [isFocused]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value * 0.5 }],
  }));

  const indicatorDotStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
    transform: [{ scale: indicatorScale.value }],
  }));

  // Render custom icon component if routeName is provided
  const renderIconComponent = () => {
    const iconColor = isFocused ? color : inactiveColor;
    switch (routeName) {
      case 'Home':
        return <HomeIcon size={24} color={iconColor} />;
      case 'Products':
        return <ProductsIcon size={24} color={iconColor} />;
      case 'Cart':
        return <CartIcon size={24} color={iconColor} />;
      case 'Wishlist':
        return <WishlistIcon size={24} color={isFocused ? color : inactiveColor} />;
      case 'Profile':
        return <ProfileIcon size={24} color={iconColor} />;
      default:
        return <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>;
    }
  };

  const badgeOpacity = useSharedValue(badgeCount && badgeCount > 0 ? 1 : 0);
  const badgeScale = useSharedValue(badgeCount && badgeCount > 0 ? 1 : 0);

  React.useEffect(() => {
    if (badgeCount && badgeCount > 0) {
      badgeOpacity.value = withSpring(1, { damping: 12, stiffness: 200 });
      badgeScale.value = withSpring(1, { damping: 12, stiffness: 200 });
    } else {
      badgeOpacity.value = withSpring(0, { damping: 12, stiffness: 200 });
      badgeScale.value = withSpring(0, { damping: 12, stiffness: 200 });
    }
  }, [badgeCount]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <View style={styles.tabIconContainer}>
      <Animated.View style={[styles.iconWrapper, iconAnimatedStyle]}>
        {renderIconComponent()}
        {badgeCount !== undefined && badgeCount > 0 && (
          <Animated.View style={[styles.badge, badgeAnimatedStyle]}>
            <Text style={styles.badgeText}>
              {badgeCount > 99 ? '99+' : badgeCount.toString()}
            </Text>
          </Animated.View>
        )}
      </Animated.View>
      <Animated.Text
        style={[
          styles.label,
          { color: isFocused ? color : inactiveColor },
          textAnimatedStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
      {isFocused && (
        <Animated.View
          style={[
            styles.activeIndicatorDot,
            {
              backgroundColor: color,
            },
            indicatorDotStyle,
          ]}
        />
      )}
    </View>
  );
};

interface TabButtonProps {
  route: any;
  index: number;
  navigation: any;
  state: any;
  descriptors: any;
  isFocused: boolean;
  theme: any;
  badgeCount?: number;
}

const TabButton: React.FC<TabButtonProps> = ({
  route,
  index,
  navigation,
  state,
  descriptors,
  isFocused,
  theme,
  badgeCount,
}) => {
  const scale = useSharedValue(isFocused ? 1 : 0.9);
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const iconElement = options.tabBarIcon
    ? options.tabBarIcon({ focused: isFocused, color: '', size: 24 })
    : null;
  
  // Extract text from icon element if it's a Text component with an emoji
  // Or check if it's a URL string for online icons
  let icon: string | null = null;
  let isUrlIcon = false;
  
  if (typeof iconElement === 'string') {
    if (iconElement.startsWith('http://') || iconElement.startsWith('https://')) {
      isUrlIcon = true;
      icon = iconElement;
    } else {
      icon = iconElement;
    }
  } else if (iconElement && typeof iconElement === 'object' && 'props' in iconElement) {
    // Check if it's a Text component with children that's a string
    const children = iconElement.props?.children;
    if (typeof children === 'string') {
      if (children.startsWith('http://') || children.startsWith('https://')) {
        isUrlIcon = true;
        icon = children;
      } else {
        icon = children;
      }
    }
  }

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0.9, {
      damping: 12,
      stiffness: 150,
    });
  }, [isFocused]);

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Indicator animation for active tab
  const indicatorOpacity = useSharedValue(isFocused ? 1 : 0);
  const indicatorScale = useSharedValue(isFocused ? 1 : 0);

  // Text animation for custom icons
  const textOpacity = useSharedValue(isFocused ? 1 : 0.6);
  const textTranslateY = useSharedValue(isFocused ? 0 : 2);

  React.useEffect(() => {
    indicatorOpacity.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
    indicatorScale.value = withSpring(isFocused ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
    textOpacity.value = withTiming(isFocused ? 1 : 0.6, { duration: 200 });
    textTranslateY.value = withSpring(isFocused ? 0 : 2, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused]);

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
    transform: [{ scale: indicatorScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  // Check if icon is a string (emoji) or React element
  const isStringIcon = typeof icon === 'string';

  return (
    <AnimatedTouchable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButton, animatedStyle]}
      activeOpacity={0.7}
    >
      <View style={styles.tabContent}>
        {icon && isUrlIcon ? (
          <View style={styles.urlIconContainer}>
            <Animated.Image
              source={{ uri: icon }}
              style={[
                styles.urlIcon,
                {
                  tintColor: isFocused ? theme.colors.primary : theme.colors.textMuted,
                  opacity: isFocused ? 1 : 0.6,
                },
                animatedStyle,
              ]}
              resizeMode="contain"
            />
            <Animated.Text
              style={[
                styles.label,
                {
                  color: isFocused ? theme.colors.primary : theme.colors.textMuted,
                },
                textAnimatedStyle,
              ]}
              numberOfLines={1}
            >
              {label as string}
            </Animated.Text>
            {isFocused && (
              <Animated.View
                style={[
                  styles.activeIndicatorDot,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                  indicatorStyle,
                ]}
              />
            )}
          </View>
        ) : icon ? (
          <TabIcon
            icon={icon}
            label={label as string}
            isFocused={isFocused}
            routeName={route.name}
            color={theme.colors.primary}
            inactiveColor={theme.colors.textMuted}
            badgeCount={badgeCount}
          />
        ) : (
          <View style={styles.customIconContainer}>
            {iconElement}
            <Animated.Text
              style={[
                styles.label,
                {
                  color: isFocused ? theme.colors.primary : theme.colors.textMuted,
                },
                textAnimatedStyle,
              ]}
              numberOfLines={1}
            >
              {label as string}
            </Animated.Text>
            {isFocused && (
              <Animated.View
                style={[
                  styles.activeIndicatorDot,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                  indicatorStyle,
                ]}
              />
            )}
          </View>
        )}
      </View>
    </AnimatedTouchable>
  );
};

const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { itemCount: cartCount } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const wishlistCount = wishlistItems.length;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.cardBackground,
          borderTopColor: theme.colors.border,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          // Get badge count for Cart and Wishlist
          let badgeCount: number | undefined = undefined;
          if (route.name === 'Cart') {
            badgeCount = cartCount;
          } else if (route.name === 'Wishlist') {
            badgeCount = wishlistCount;
          }
          
          return (
            <TabButton
              key={route.key}
              route={route}
              index={index}
              navigation={navigation}
              state={state}
              descriptors={descriptors}
              isFocused={isFocused}
              theme={theme}
              badgeCount={badgeCount}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  urlIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  urlIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 65,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  activeIndicator: {
    // Old indicator - removed
  },
  activeIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
    alignSelf: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginBottom: 2,
    position: 'relative',
  },
  icon: {
    fontSize: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  customIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AnimatedTabBar;

