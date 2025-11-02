import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme';
import SettingRow from '../../components/common/SettingRow';
import Modal from '../../components/common/Modal';
import DialogModal from '../../components/common/DialogModal';
import ThemeCustomizationModal from '../../components/Modal/ThemeCustomizationModal';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { changeLanguage } from '../../i18n';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearCredentials } from '../../store/slices/authSlice';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, themeMode, setThemeMode } = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  
  // Default user data if not authenticated
  const userName = user?.name || 'Piyush Sharma';
  const userEmail = user?.email || 'piyush.sharma@example.com';
  const userPhone = user?.phone || '+91 98765 43210';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'PS';
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  // Force re-render when theme mode changes
  useEffect(() => {
    // This will trigger a re-render when themeMode changes
  }, [themeMode]);

  const languages = [
    { code: 'en', name: t('profile.english') || 'English', flag: '🇺🇸' },
    { code: 'hi', name: t('profile.hindi') || 'Hindi', flag: '🇮🇳' },
  ];

  const themes = [
    { code: 'light', name: t('profile.light') || 'Light', icon: '☀️' },
    { code: 'dark', name: t('profile.dark') || 'Dark', icon: '🌙' },
    { code: 'system', name: t('profile.system') || 'System', icon: '⚙️' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    try {
      console.log('Changing language to:', langCode);
      await changeLanguage(langCode);
      setCurrentLanguage(langCode);
      setLanguageModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleThemeChange = async (themeCode: 'light' | 'dark' | 'system') => {
    try {
      console.log('Changing theme to:', themeCode);
      await setThemeMode(themeCode);
      // Force re-render by updating state
      setThemeModalVisible(false);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  const getLanguageName = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'English';
  };

  const getThemeName = () => {
    const themeOption = themes.find((t) => t.code === themeMode);
    return themeOption ? `${themeOption.icon} ${themeOption.name}` : 'System';
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      // Clear credentials from Redux store
      dispatch(clearCredentials());
      
      // Remove auth token from AsyncStorage
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      
      // Remove user data from AsyncStorage if stored
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
      
      // Close modal
      setLogoutModalVisible(false);
      
      // Navigate to Auth screen
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, clear credentials and navigate
      dispatch(clearCredentials());
      setLogoutModalVisible(false);
      navigation.navigate('Auth');
    }
  };

  // Mock user data
  const userStats = {
    totalOrders: 47,
    moneySaved: 2450,
    memberSince: 'March 2023',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}
      <Animated.View entering={FadeIn.duration(300)} style={[styles.gradientHeader, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.avatarText, { color: theme.colors.primary }]}>{userInitials}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userPhone}>{userPhone}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹{userStats.moneySaved}</Text>
              <Text style={styles.statLabel}>Money Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.memberSince.split(' ')[0]}</Text>
              <Text style={styles.statValueSmall}>{userStats.memberSince.split(' ')[1]}</Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => navigation.navigate('Orders')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#DBEAFE' }]}>
            <Text style={styles.actionIcon}>🛒</Text>
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => (navigation as any).navigate('Main', { screen: 'Wishlist' })}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#FEE2E2' }]}>
            <Text style={styles.actionIcon}>❤️</Text>
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => navigation.navigate('Rewards')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#FEF3C7' }]}>
            <Text style={styles.actionIcon}>🎁</Text>
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => navigation.navigate('HelpSupport')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#F3F4F6' }]}>
            <Text style={styles.actionIcon}>📞</Text>
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Support</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.content}>
        {/* Account Section */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textMuted }]}>ACCOUNT</Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="Profile Details"
              icon="👤"
              onPress={() => (navigation as any).navigate('ProfileDetails')}
              showArrow
            />
            <SettingRow
              title="Manage Addresses"
              icon="📍"
              onPress={() => (navigation as any).navigate('ManageAddress')}
              showArrow
            />
            <SettingRow
              title="Payment Methods"
              icon="💳"
              onPress={() => {}}
              showArrow
            />
            <SettingRow
              title="Wishlist"
              icon="❤️"
              badge={wishlistItems.length > 0 ? wishlistItems.length.toString() : undefined}
              onPress={() => (navigation as any).navigate('Main', { screen: 'Wishlist' })}
              showArrow
            />
          </Card>
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textMuted }]}>PREFERENCES</Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title={t('profile.language') || 'Language'}
              subtitle={getLanguageName()}
              icon="🌐"
              onPress={() => setLanguageModalVisible(true)}
              showArrow
            />
            <SettingRow
              title={t('profile.theme') || 'Theme & Colors'}
              subtitle={getThemeName()}
              icon="🎨"
              onPress={() => setThemeModalVisible(true)}
              showArrow
            />
            <View style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Notifications</Text>
              </View>
              <View style={styles.toggleContainer}>
                <View style={[styles.toggle, { backgroundColor: theme.colors.primary }]}>
                  <View style={styles.toggleThumb} />
                </View>
              </View>
            </View>
            <SettingRow
              title="App Settings"
              icon="⚙️"
              onPress={() => (navigation as any).navigate('AppSettings')}
              showArrow
            />
          </Card>
        </Animated.View>

        {/* Support Section */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textMuted }]}>SUPPORT</Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="Help & Support"
              icon="❓"
              onPress={() => (navigation as any).navigate('HelpSupport')}
              showArrow
            />
            {!isAuthenticated ? (
              <Button
                title="Sign In"
                onPress={() => navigation.navigate('Auth')}
                variant="primary"
                size="medium"
                style={styles.loginButton}
              />
            ) : (
              <SettingRow
                title="Logout"
                icon="🚪"
                onPress={handleLogout}
                showArrow
                textColor="#EF4444"
              />
            )}
          </Card>
        </Animated.View>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        title={t('profile.selectLanguage') || 'Select Language'}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            activeOpacity={0.7}
            style={[
              styles.optionItem,
              {
                backgroundColor: currentLanguage === lang.code 
                  ? theme.colors.primaryLight 
                  : theme.colors.cardBackground,
              },
            ]}
            onPress={() => {
              console.log('Language option pressed:', lang.code);
              handleLanguageChange(lang.code);
            }}
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

      {/* Theme Customization Modal */}
      <ThemeCustomizationModal
        visible={themeModalVisible}
        onClose={() => setThemeModalVisible(false)}
      />

      {/* Logout Confirmation Modal */}
      <DialogModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        type="warning"
        title={t('profile.logout') || 'Logout'}
        message={t('profile.logoutConfirm') || 'Are you sure you want to logout?'}
        buttons={[
          {
            text: t('profile.cancel') || 'Cancel',
            onPress: () => setLogoutModalVisible(false),
            variant: 'outline',
          },
          {
            text: t('profile.logout') || 'Logout',
            onPress: confirmLogout,
            variant: 'primary',
            style: 'destructive',
          },
        ]}
        cancelable={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientHeader: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statValueSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginTop: -16,
  },
  actionButton: {
    width: (width - 48) / 4,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggleContainer: {
    marginLeft: 12,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
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
  loginButton: {
    margin: 16,
  },
});

export default Profile;
