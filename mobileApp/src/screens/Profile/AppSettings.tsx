import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import SettingRow from '../../components/common/SettingRow';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AppSettingsNavigationProp = StackNavigationProp<RootStackParamList>;

const AppSettings: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<AppSettingsNavigationProp>();

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    locationServices: true,
    biometricAuth: false,
    autoSync: true,
    dataSaver: false,
    darkMode: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="App Settings"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Notifications Section */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            NOTIFICATIONS
          </Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="Push Notifications"
              subtitle="Receive push notifications on your device"
              icon="🔔"
              switchValue={settings.pushNotifications}
              onSwitchChange={() => handleToggle('pushNotifications')}
              showDivider
            />
            <SettingRow
              title="Email Notifications"
              subtitle="Receive updates via email"
              icon="✉️"
              switchValue={settings.emailNotifications}
              onSwitchChange={() => handleToggle('emailNotifications')}
              showDivider
            />
            <SettingRow
              title="SMS Notifications"
              subtitle="Receive updates via SMS"
              icon="💬"
              switchValue={settings.smsNotifications}
              onSwitchChange={() => handleToggle('smsNotifications')}
            />
          </Card>
        </Animated.View>

        {/* Privacy & Security Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            PRIVACY & SECURITY
          </Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="Location Services"
              subtitle="Allow app to access your location"
              icon="📍"
              switchValue={settings.locationServices}
              onSwitchChange={() => handleToggle('locationServices')}
              showDivider
            />
            <SettingRow
              title="Biometric Authentication"
              subtitle="Use fingerprint or face ID to login"
              icon="👆"
              switchValue={settings.biometricAuth}
              onSwitchChange={() => handleToggle('biometricAuth')}
            />
          </Card>
        </Animated.View>

        {/* App Preferences Section */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            APP PREFERENCES
          </Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="Auto Sync"
              subtitle="Automatically sync data in background"
              icon="🔄"
              switchValue={settings.autoSync}
              onSwitchChange={() => handleToggle('autoSync')}
              showDivider
            />
            <SettingRow
              title="Data Saver"
              subtitle="Reduce data usage by limiting image quality"
              icon="💾"
              switchValue={settings.dataSaver}
              onSwitchChange={() => handleToggle('dataSaver')}
            />
          </Card>
        </Animated.View>

        {/* App Information Section */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            APP INFORMATION
          </Text>
          <Card style={styles.sectionCard}>
            <SettingRow
              title="App Version"
              subtitle="1.0.0"
              icon="ℹ️"
              showArrow={false}
              showDivider
            />
            <SettingRow
              title="Terms of Service"
              icon="📄"
              onPress={() => {}}
              showArrow
              showDivider
            />
            <SettingRow
              title="Privacy Policy"
              icon="🔒"
              onPress={() => {}}
              showArrow
              showDivider
            />
            <SettingRow
              title="Clear Cache"
              subtitle="Clear all cached data"
              icon="🗑️"
              onPress={() => {}}
              showArrow
              textColor={theme.colors.error}
            />
          </Card>
        </Animated.View>

        {/* Account Actions */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={styles.dangerButton}>
              <Text style={[styles.dangerButtonText, { color: theme.colors.error }]}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },
  sectionCard: {
    marginBottom: 16,
  },
  dangerButton: {
    padding: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppSettings;

