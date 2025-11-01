import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HelpSupportNavigationProp = StackNavigationProp<RootStackParamList>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const HelpSupport: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<HelpSupportNavigationProp>();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You can select your delivery address and payment method during checkout.',
    },
    {
      id: '2',
      question: 'What payment methods are accepted?',
      answer: 'We accept Cash on Delivery, Credit/Debit Cards, and UPI payments. All transactions are secure and encrypted.',
    },
    {
      id: '3',
      question: 'How long does delivery take?',
      answer: 'Delivery time depends on your location and selected delivery option. Standard delivery takes 2-3 days, Express delivery takes 1-2 days, and Urgent delivery is same day.',
    },
    {
      id: '4',
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order within 24 hours of placing it. Go to your order history and click on cancel order.',
    },
    {
      id: '5',
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you will receive a tracking number via SMS and email. You can track your order in the app under "My Orders" section.',
    },
    {
      id: '6',
      question: 'What is your return policy?',
      answer: 'We offer 7-day return policy on most products. Items must be unopened and in original packaging. Please contact support for return requests.',
    },
  ];

  const supportOptions = [
    {
      icon: '📞',
      title: 'Call Us',
      subtitle: '+91 1800-123-4567',
      onPress: () => {},
    },
    {
      icon: '✉️',
      title: 'Email Us',
      subtitle: 'support@villagemart.com',
      onPress: () => {},
    },
    {
      icon: '💬',
      title: 'Live Chat',
      subtitle: 'Available 24/7',
      onPress: () => {},
    },
    {
      icon: '📍',
      title: 'Visit Store',
      subtitle: 'Find nearest store',
      onPress: () => {},
    },
  ];

  const handleSubmitContact = () => {
    // Handle contact form submission
    setContactForm({ subject: '', message: '' });
    // Show success message
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Help & Support"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contact Options */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            CONTACT US
          </Text>
          <View style={styles.contactGrid}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.contactCard, { backgroundColor: theme.colors.background }]}
                onPress={option.onPress}
              >
                <Text style={styles.contactIcon}>{option.icon}</Text>
                <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
                  {option.title}
                </Text>
                <Text style={[styles.contactSubtitle, { color: theme.colors.textMuted }]}>
                  {option.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* FAQs */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            FREQUENTLY ASKED QUESTIONS
          </Text>
          <Card style={styles.faqCard}>
            {faqs.map((faq, index) => (
              <View key={faq.id}>
                <TouchableOpacity
                  style={styles.faqItem}
                  onPress={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                >
                  <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>
                    {faq.question}
                  </Text>
                  <Text style={[styles.faqIcon, { color: theme.colors.primary }]}>
                    {expandedFAQ === faq.id ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>
                {expandedFAQ === faq.id && (
                  <Text style={[styles.faqAnswer, { color: theme.colors.textMuted }]}>
                    {faq.answer}
                  </Text>
                )}
                {index < faqs.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                )}
              </View>
            ))}
          </Card>
        </Animated.View>

        {/* Contact Form */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>
            SEND US A MESSAGE
          </Text>
          <Card style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Subject</Text>
              <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Enter subject"
                  placeholderTextColor={theme.colors.textMuted}
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm({ ...contactForm, subject: text })}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Message</Text>
              <View style={[styles.textAreaContainer, { borderColor: theme.colors.border }]}>
                <TextInput
                  style={[styles.textArea, { color: theme.colors.text }]}
                  placeholder="Enter your message"
                  placeholderTextColor={theme.colors.textMuted}
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
                  multiline
                  numberOfLines={5}
                />
              </View>
            </View>

            <Button
              title="Send Message"
              onPress={handleSubmitContact}
              variant="primary"
              size="large"
              style={styles.submitButton}
            />
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
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  contactCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  faqCard: {
    padding: 16,
    marginBottom: 16,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqIcon: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  formCard: {
    padding: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 15,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
  },
  textArea: {
    fontSize: 15,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '100%',
  },
});

export default HelpSupport;

