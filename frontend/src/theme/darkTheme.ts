import { colors } from './colors';

export const darkTheme = {
  colors: {
    background: colors.background.dark,
    surface: colors.neutral[800],
    primary: colors.primary[400],
    secondary: colors.secondary[400],
    accent: colors.accent[400],
    text: {
      primary: colors.text.light,
      secondary: colors.neutral[300],
      muted: colors.neutral[400],
    },
    border: colors.neutral[700],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  },
  gradients: {
    primary: colors.gradients.primary,
    hero: colors.gradients.dark,
    card: colors.gradients.dark,
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
};