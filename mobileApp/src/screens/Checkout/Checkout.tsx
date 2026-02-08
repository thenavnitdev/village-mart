import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface DeliveryOption {
  id: 'normal' | 'fast' | 'urgent';
  label: string;
  time: string;
  fee: number;
  icon: string;
}

const Checkout: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const [selectedDelivery, setSelectedDelivery] = useState<'normal' | 'fast' | 'urgent'>('fast');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('cod');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const deliveryOptions: DeliveryOption[] = [
    { id: 'normal', label: 'Standard', time: '2-3 days', fee: 0, icon: '📦' },
    { id: 'fast', label: 'Express', time: '1-2 days', fee: 29, icon: '🚀' },
    { id: 'urgent', label: 'Urgent', time: 'Same Day', fee: 59, icon: '⚡' },
  ];

  const selectedDeliveryOption = deliveryOptions.find(opt => opt.id === selectedDelivery);
  const deliveryFee = selectedDeliveryOption?.fee || 0;
  const subtotal = total;
  const finalTotal = subtotal + deliveryFee - discount;

  const handlePlaceOrder = () => {
    // Clear cart after successful order
    dispatch(clearCart());
    // Navigate to order confirmation or home
    navigation.navigate('Main');
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const userName = user?.name || 'Piyush Sharma';
  const userEmail = user?.email || 'piyush.sharma@example.com';
  const userPhone = user?.phone || '+91 98765 43210';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Checkout"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Address */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Delivery Address</Text>
          <Card style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={[styles.addressIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Text style={styles.addressIcon}>📍</Text>
              </View>
              <View style={styles.addressInfo}>
                <Text style={[styles.addressName, { color: theme.colors.text }]}>Home</Text>
                <Text style={[styles.addressText, { color: theme.colors.textMuted }]}>
                  123, Village Street, Block A{'\n'}
                  New Delhi - 110001
                </Text>
                <Text style={[styles.addressContact, { color: theme.colors.textMuted }]}>
                  {userPhone}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.changeText, { color: theme.colors.primary }]}>Change</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Animated.View>

        {/* Order Items */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Order Items</Text>
          <Card style={styles.itemsCard}>
            {items.map((item, index) => (
              <View key={item.productId} style={styles.orderItem}>
                <Image
                  source={{ uri: item.image || 'https://via.placeholder.com/60' }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: theme.colors.text }]} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemQuantity, { color: theme.colors.textMuted }]}>
                    Qty: {item.quantity}
                  </Text>
                </View>
                <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
          </Card>
        </Animated.View>

        {/* Delivery Options */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Delivery Option</Text>
          <Card style={styles.deliveryCard}>
            {deliveryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.deliveryOption,
                  selectedDelivery === option.id && { borderColor: theme.colors.primary },
                ]}
                onPress={() => setSelectedDelivery(option.id)}
              >
                <View style={styles.deliveryOptionLeft}>
                  <Text style={styles.deliveryIcon}>{option.icon}</Text>
                  <View>
                    <Text style={[styles.deliveryLabel, { color: theme.colors.text }]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.deliveryTime, { color: theme.colors.textMuted }]}>
                      {option.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.deliveryOptionRight}>
                  {option.fee === 0 ? (
                    <Text style={[styles.freeText, { color: theme.colors.primary }]}>Free</Text>
                  ) : (
                    <Text style={[styles.deliveryFee, { color: theme.colors.text }]}>
                      {formatPrice(option.fee)}
                    </Text>
                  )}
                  <View
                    style={[
                      styles.radioButton,
                      selectedDelivery === option.id && {
                        borderColor: theme.colors.primary,
                      },
                    ]}
                  >
                    {selectedDelivery === option.id && (
                      <View
                        style={[styles.radioInner, { backgroundColor: theme.colors.primary }]}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </Animated.View>

        {/* Payment Method */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Method</Text>
          <Card style={styles.paymentCard}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'cod' && { borderColor: theme.colors.primary },
              ]}
              onPress={() => setPaymentMethod('cod')}
            >
              <View style={styles.paymentOptionLeft}>
                <Text style={styles.paymentIcon}>💵</Text>
                <Text style={[styles.paymentLabel, { color: theme.colors.text }]}>
                  Cash on Delivery
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'cod' && { borderColor: theme.colors.primary },
                ]}
              >
                {paymentMethod === 'cod' && (
                  <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'card' && { borderColor: theme.colors.primary },
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <View style={styles.paymentOptionLeft}>
                <Text style={styles.paymentIcon}>💳</Text>
                <Text style={[styles.paymentLabel, { color: theme.colors.text }]}>
                  Credit/Debit Card
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'card' && { borderColor: theme.colors.primary },
                ]}
              >
                {paymentMethod === 'card' && (
                  <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'upi' && { borderColor: theme.colors.primary },
              ]}
              onPress={() => setPaymentMethod('upi')}
            >
              <View style={styles.paymentOptionLeft}>
                <Text style={styles.paymentIcon}>📱</Text>
                <Text style={[styles.paymentLabel, { color: theme.colors.text }]}>UPI</Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === 'upi' && { borderColor: theme.colors.primary },
                ]}
              >
                {paymentMethod === 'upi' && (
                  <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
                )}
              </View>
            </TouchableOpacity>
          </Card>
        </Animated.View>

        {/* Promo Code */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Promo Code</Text>
          <Card style={styles.promoCard}>
            {!showPromoInput ? (
              <TouchableOpacity
                style={styles.promoButton}
                onPress={() => setShowPromoInput(true)}
              >
                <Text style={styles.promoIcon}>🎁</Text>
                <Text style={[styles.promoButtonText, { color: theme.colors.primary }]}>
                  Apply Promo Code
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.promoInputContainer}>
                <TextInput
                  style={[
                    styles.promoInput,
                    { color: theme.colors.text, borderColor: theme.colors.border },
                  ]}
                  placeholder="Enter promo code"
                  placeholderTextColor={theme.colors.textMuted}
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <TouchableOpacity
                  style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleApplyPromo}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            )}
            {discount > 0 && (
              <View style={[styles.discountBadge, { backgroundColor: theme.colors.primaryLight }]}>
                <Text style={[styles.discountText, { color: theme.colors.primary }]}>
                  {formatPrice(discount)} OFF
                </Text>
              </View>
            )}
          </Card>
        </Animated.View>

        {/* Price Summary */}
        <Animated.View entering={FadeInDown.delay(600).springify()}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Price Summary</Text>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textMuted }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                {formatPrice(subtotal)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textMuted }]}>
                Delivery Fee
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
              </Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: theme.colors.primary }]}>Discount</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
                  -{formatPrice(discount)}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total</Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                {formatPrice(finalTotal)}
              </Text>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={[styles.footer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.footerTotal}>
          <Text style={[styles.footerLabel, { color: theme.colors.textMuted }]}>Total Amount</Text>
          <Text style={[styles.footerAmount, { color: theme.colors.primary }]}>
            {formatPrice(finalTotal)}
          </Text>
        </View>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          variant="primary"
          size="large"
          style={styles.placeOrderButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  addressCard: {
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressIcon: {
    fontSize: 20,
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  addressContact: {
    fontSize: 14,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemsCard: {
    padding: 16,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 13,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  deliveryCard: {
    padding: 16,
    marginBottom: 16,
  },
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  deliveryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deliveryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  deliveryLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  deliveryTime: {
    fontSize: 13,
  },
  deliveryOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  freeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deliveryFee: {
    fontSize: 16,
    fontWeight: '700',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  paymentCard: {
    padding: 16,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  promoCard: {
    padding: 16,
    marginBottom: 16,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  promoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  promoButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  promoInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  discountBadge: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryCard: {
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 14,
  },
  footerAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeOrderButton: {
    width: '100%',
  },
});

export default Checkout;

