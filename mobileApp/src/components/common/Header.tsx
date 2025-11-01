import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import IconButton from './IconButton';

interface HeaderProps {
  title?: string;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
  onBackPress,
  backgroundColor = colors.primary[500],
  titleColor = colors.text.light,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View
        style={[
          styles.container,
          { backgroundColor, paddingTop: insets.top },
        ]}
      >
        <View style={styles.content}>
          {showBackButton && (
            <IconButton
              icon="←"
              onPress={onBackPress || onLeftPress}
              size="medium"
              variant="default"
              style={styles.backButton}
            />
          )}
          {leftIcon && !showBackButton && (
            <IconButton
              icon={typeof leftIcon === 'string' ? leftIcon : undefined}
              onPress={onLeftPress}
              size="medium"
              variant="default"
            />
          )}
          {title && (
            <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
              {title}
            </Text>
          )}
          <View style={styles.spacer} />
          {rightIcon && (
            <IconButton
              icon={typeof rightIcon === 'string' ? rightIcon : undefined}
              onPress={onRightPress}
              size="medium"
              variant="default"
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
});

export default Header;

