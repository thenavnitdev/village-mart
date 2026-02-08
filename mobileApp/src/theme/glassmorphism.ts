import { Platform, StyleSheet } from 'react-native';

export const glassmorphism = {
  light: StyleSheet.create({
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      ...Platform.select({
        ios: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        android: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          elevation: 5,
        },
      }),
    },
    border: {
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      ...Platform.select({
        ios: {
          backgroundColor: 'rgba(30, 30, 30, 0.7)',
        },
        android: {
          backgroundColor: 'rgba(20, 20, 20, 0.8)',
          elevation: 5,
        },
      }),
    },
    border: {
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),
  blue: StyleSheet.create({
    container: {
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(10px)',
      ...Platform.select({
        ios: {
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
        },
        android: {
          backgroundColor: 'rgba(59, 130, 246, 0.25)',
          elevation: 5,
        },
      }),
    },
    border: {
      borderWidth: 1,
      borderColor: 'rgba(59, 130, 246, 0.3)',
    },
  }),
};

export const getGlassmorphismStyle = (isDark: boolean, variant: 'light' | 'dark' | 'blue' = 'light') => {
  const style = glassmorphism[variant];
  return {
    ...style.container,
    ...style.border,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    ...Platform.select({
      android: {
        elevation: 8,
      },
    }),
  };
};

export default glassmorphism;

