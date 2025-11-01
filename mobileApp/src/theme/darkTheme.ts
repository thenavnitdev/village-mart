import { colors } from './colors';

export const darkTheme = {
  colors: {
    primary: colors.primary[500],
    primaryLight: colors.primary[700],
    primaryDark: colors.primary[300],
    secondary: colors.secondary[400],
    secondaryLight: colors.secondary[800],
    secondaryDark: colors.secondary[300],
    accent: colors.accent[400],
    background: colors.background.dark,
    backgroundSecondary: colors.neutral[800],
    text: colors.text.light,
    textSecondary: colors.neutral[300],
    textMuted: colors.neutral[500],
    textLight: colors.text.light,
    border: colors.neutral[700],
    cardBackground: colors.neutral[800],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export type DarkTheme = typeof darkTheme;

