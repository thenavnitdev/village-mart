import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme';
import SettingRow from '../../components/common/SettingRow';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import { changeLanguage } from '../../i18n';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, themeMode, setThemeMode } = useTheme();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const languages = [
    { code: 'en', name: t('profile.english'), flag: '🇺🇸' },
    { code: 'hi', name: t('profile.hindi'), flag: '🇮🇳' },
  ];

  const themes = [
    { code: 'light', name: t('profile.light'), icon: '☀️' },
    { code: 'dark', name: t('profile.dark'), icon: '🌙' },
    { code: 'system', name: t('profile.system'), icon: '⚙️' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    await changeLanguage(langCode);
    setCurrentLanguage(langCode);
    setLanguageModalVisible(false);
  };

  const handleThemeChange = async (themeCode: 'light' | 'dark' | 'system') => {
    await setThemeMode(themeCode);
    setThemeModalVisible(false);
  };

  const getLanguageName = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'English';
  };

  const getThemeName = () => {
    const themeOption = themes.find((t) => t.code === themeMode);
    return themeOption ? `${themeOption.icon} ${themeOption.name}` : 'System';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('profile.title')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {t('profile.accountSettings')}
          </Text>
        </View>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('profile.preferences')}
          </Text>

          <SettingRow
            title={t('profile.language')}
            subtitle={getLanguageName()}
            icon="🌐"
            onPress={() => setLanguageModalVisible(true)}
            showArrow
          />

          <SettingRow
            title={t('profile.theme')}
            subtitle={getThemeName()}
            icon="🎨"
            onPress={() => setThemeModalVisible(true)}
            showArrow
          />
        </Card>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        title={t('profile.selectLanguage')}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.optionItem,
              currentLanguage === lang.code && {
                backgroundColor: theme.colors.primaryLight,
              },
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={styles.optionIcon}>{lang.flag}</Text>
            <Text
              style={[
                styles.optionText,
                { color: theme.colors.text },
                currentLanguage === lang.code && {
                  color: theme.colors.primary,
                  fontWeight: '600',
                },
              ]}
            >
              {lang.name}
            </Text>
            {currentLanguage === lang.code && (
              <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={themeModalVisible}
        onClose={() => setThemeModalVisible(false)}
        title={t('profile.selectTheme')}
      >
        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.code}
            style={[
              styles.optionItem,
              themeMode === themeOption.code && {
                backgroundColor: theme.colors.primaryLight,
              },
            ]}
            onPress={() => handleThemeChange(themeOption.code as 'light' | 'dark' | 'system')}
          >
            <Text style={styles.optionIcon}>{themeOption.icon}</Text>
            <Text
              style={[
                styles.optionText,
                { color: theme.colors.text },
                themeMode === themeOption.code && {
                  color: theme.colors.primary,
                  fontWeight: '600',
                },
              ]}
            >
              {themeOption.name}
            </Text>
            {themeMode === themeOption.code && (
              <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.neutral[50],
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;

