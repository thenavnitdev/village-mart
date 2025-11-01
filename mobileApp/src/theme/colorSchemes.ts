import { LightTheme, DarkTheme } from './index';

const COLOR_SCHEMES = {
  'sunset-orange': {
    primary: '#F97316',
    primaryLight: '#FED7AA',
    primaryDark: '#C2410C',
  },
  'royal-purple': {
    primary: '#A855F7',
    primaryLight: '#E9D5FF',
    primaryDark: '#7E22CE',
  },
  'ocean-blue': {
    primary: '#3B82F6',
    primaryLight: '#DBEAFE',
    primaryDark: '#1E40AF',
  },
  'forest-green': {
    primary: '#10B981',
    primaryLight: '#D1FAE5',
    primaryDark: '#047857',
  },
  'rose-pink': {
    primary: '#F43F5E',
    primaryLight: '#FCE7F3',
    primaryDark: '#BE123C',
  },
  'teal-breeze': {
    primary: '#14B8A6',
    primaryLight: '#CCFBF1',
    primaryDark: '#0F766E',
  },
};

export function createColorSchemeTheme(
  baseTheme: LightTheme | DarkTheme,
  colorSchemeId: keyof typeof COLOR_SCHEMES
): LightTheme | DarkTheme {
  const colorScheme = COLOR_SCHEMES[colorSchemeId];
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colorScheme.primary,
      primaryLight: colorScheme.primaryLight,
      primaryDark: colorScheme.primaryDark,
    },
  };
}

