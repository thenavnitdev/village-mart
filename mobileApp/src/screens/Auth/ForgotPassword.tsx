import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';

interface FormErrors {
  email?: string;
  general?: string;
}

type ForgotPasswordScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'ForgotPassword'>,
  StackNavigationProp<RootStackParamList>
>;

const ForgotPassword: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  if (isEmailSent) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.colors.background }]}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={[styles.logoBox, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.logoText}>V</Text>
              </View>
              <Text style={[styles.brandName, { color: theme.colors.primary }]}>Village Mart</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.formCard}>
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✉️</Text>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successMessage}>
                We've sent a password reset link to{'\n'}
                <Text style={[styles.emailText, { color: theme.colors.primary }]}>{email}</Text>
              </Text>
              <Text style={styles.successSubtext}>
                Please check your inbox and follow the instructions to reset your password.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.backToLoginButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Didn't receive the email? </Text>
              <TouchableOpacity onPress={() => setIsEmailSent(false)}>
                <Text style={[styles.footerLink, { color: theme.colors.primary }]}>Resend</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.colors.background }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={[styles.logoBox, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.logoText}>V</Text>
            </View>
            <Text style={[styles.brandName, { color: theme.colors.primary }]}>Village Mart</Text>
          </View>

          <Animated.Text
            entering={FadeInDown.delay(100).springify()}
            style={styles.title}
          >
            Forgot Password?
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(200).springify()}
            style={styles.subtitle}
          >
            No worries! Enter your email and we'll send you a reset link.
          </Animated.Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.formCard}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.colors.primary }, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Text>
            {!isLoading && <Text style={styles.arrowIcon}>→</Text>}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity
            style={styles.backToLoginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.backToLoginLinkText, { color: theme.colors.primary }]}>← Back to Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 4,
  },
  inputIcon: {
    fontSize: 18,
    marginHorizontal: 12,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  resetButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backToLoginLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  emailText: {
    fontWeight: '600',
  },
  successSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  backToLoginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  backToLoginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ForgotPassword;

