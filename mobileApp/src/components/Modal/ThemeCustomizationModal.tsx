import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gradient: string[];
}

const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    primary: '#F97316',
    primaryLight: '#FED7AA',
    primaryDark: '#C2410C',
    gradient: ['#F97316', '#EA580C'],
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primary: '#A855F7',
    primaryLight: '#E9D5FF',
    primaryDark: '#7E22CE',
    gradient: ['#A855F7', '#EC4899'],
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    primary: '#3B82F6',
    primaryLight: '#DBEAFE',
    primaryDark: '#1E40AF',
    gradient: ['#60A5FA', '#1E40AF'],
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#10B981',
    primaryLight: '#D1FAE5',
    primaryDark: '#047857',
    gradient: ['#10B981', '#059669'],
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    primary: '#F43F5E',
    primaryLight: '#FCE7F3',
    primaryDark: '#BE123C',
    gradient: ['#F43F5E', '#EC4899'],
  },
  {
    id: 'teal-breeze',
    name: 'Teal Breeze',
    primary: '#14B8A6',
    primaryLight: '#CCFBF1',
    primaryDark: '#0F766E',
    gradient: ['#14B8A6', '#0891B2'],
  },
];

interface ThemeCustomizationModalProps {
  visible: boolean;
  onClose: () => void;
}

const ThemeCustomizationModal: React.FC<ThemeCustomizationModalProps> = ({
  visible,
  onClose,
}) => {
  const { themeMode, setThemeMode, colorScheme, setColorScheme } = useTheme();
  const [selectedAppearance, setSelectedAppearance] = useState<'light' | 'dark'>(
    themeMode === 'dark' ? 'dark' : 'light'
  );
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(
    COLOR_SCHEMES.find(s => s.id === colorScheme) || COLOR_SCHEMES[0]
  );

  // Sync state when modal opens or theme changes
  useEffect(() => {
    if (visible) {
      const currentAppearance = themeMode === 'dark' ? 'dark' : (themeMode === 'system' ? 'light' : 'light');
      setSelectedAppearance(currentAppearance);
      const currentScheme = COLOR_SCHEMES.find(s => s.id === colorScheme) || COLOR_SCHEMES[0];
      setSelectedScheme(currentScheme);
    }
  }, [visible, themeMode, colorScheme]);

  const handleAppearanceChange = async (mode: 'light' | 'dark') => {
    setSelectedAppearance(mode);
    if (mode === 'light') {
      await setThemeMode('light');
    } else {
      await setThemeMode('dark');
    }
  };

  const handleColorSchemeSelect = async (scheme: ColorScheme) => {
    setSelectedScheme(scheme);
    // Don't apply immediately, wait for Apply button
  };

  const handleApply = async () => {
    await setColorScheme(selectedScheme.id as 'sunset-orange' | 'royal-purple' | 'ocean-blue' | 'forest-green' | 'rose-pink' | 'teal-breeze');
    if (selectedAppearance === 'light') {
      await setThemeMode('light');
    } else {
      await setThemeMode('dark');
    }
    onClose();
  };

  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          {/* Handle */}
          <View style={styles.handle} />
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerIcon}>🎨</Text>
              <Text style={styles.headerTitle}>Customize Theme</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Appearance Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Appearance</Text>
              <View style={styles.appearanceContainer}>
                <TouchableOpacity
                  style={[
                    styles.appearanceButton,
                    selectedAppearance === 'light' && [styles.appearanceButtonActive, { backgroundColor: selectedScheme.primary }],
                  ]}
                  onPress={() => handleAppearanceChange('light')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.appearanceIcon,
                      selectedAppearance === 'light' && styles.appearanceIconActive,
                    ]}
                  >
                    ☀️
                  </Text>
                  <Text
                    style={[
                      styles.appearanceText,
                      selectedAppearance === 'light' && styles.appearanceTextActive,
                    ]}
                  >
                    Light
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.appearanceButton,
                    selectedAppearance === 'dark' && [styles.appearanceButtonActive, { backgroundColor: selectedScheme.primary }],
                  ]}
                  onPress={() => handleAppearanceChange('dark')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.appearanceIcon,
                      selectedAppearance === 'dark' && styles.appearanceIconActive,
                    ]}
                  >
                    🌙
                  </Text>
                  <Text
                    style={[
                      styles.appearanceText,
                      selectedAppearance === 'dark' && styles.appearanceTextActive,
                    ]}
                  >
                    Dark
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Color Scheme Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color Scheme</Text>
              <View style={styles.colorSchemeGrid}>
                {COLOR_SCHEMES.map((scheme, index) => {
                  // Calculate marginRight: no margin for last item in row (every 3rd item)
                  const isLastInRow = (index + 1) % 3 === 0;
                  return (
                  <View
                    key={scheme.id}
                    style={[styles.colorSchemeWrapper, isLastInRow && { marginRight: 0 }]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.colorSchemeCard,
                        selectedScheme.id === scheme.id && [styles.colorSchemeCardActive, { borderColor: scheme.primary }],
                      ]}
                      onPress={() => handleColorSchemeSelect(scheme)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.gradientContainer]}>
                        <View style={[styles.gradientBar, { backgroundColor: scheme.gradient[0] }]} />
                        <View style={[styles.gradientBarSecondary, { backgroundColor: scheme.gradient[1] || scheme.gradient[0] }]} />
                      </View>
                      <Text style={styles.colorSchemeName}>{scheme.name}</Text>
                      {selectedScheme.id === scheme.id && (
                        <View style={[styles.checkmark, { backgroundColor: scheme.primary }]}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={[
              styles.applyButton,
              { backgroundColor: selectedScheme.primary },
            ]}
            onPress={handleApply}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>Apply Theme</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  content: {
    flexGrow: 0,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  appearanceContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  appearanceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  appearanceButtonActive: {
    borderColor: 'transparent',
  },
  appearanceIcon: {
    fontSize: 20,
  },
  appearanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  appearanceIconActive: {
    filter: 'brightness(0) invert(1)',
  },
  appearanceTextActive: {
    color: '#FFFFFF',
  },
  colorSchemeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  colorSchemeWrapper: {
    width: (SCREEN_WIDTH - 32 - 16) / 3, // Screen width - padding - gaps, divided by 3
    marginRight: 8,
    marginBottom: 8,
  },
  colorSchemeCard: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    position: 'relative',
  },
  colorSchemeCardActive: {
    borderWidth: 2,
  },
  gradientContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gradientBar: {
    flex: 1,
    height: '100%',
  },
  gradientBarSecondary: {
    flex: 1,
    height: '100%',
  },
  colorSchemeName: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1F2937',
    padding: 5,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  applyButton: {
    marginTop: 6,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ThemeCustomizationModal;

