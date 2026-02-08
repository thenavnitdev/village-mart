import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import QuantitySelector from '../../components/common/QuantitySelector';
import IconButton from '../../components/common/IconButton';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<'normal' | 'fast' | 'urgent'>('fast');
  const [discount, setDiscount] = useState(0);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout' as any);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deliveryFee = selectedDelivery === 'normal' ? 0 : selectedDelivery === 'fast' ? 29 : 59;
  const finalTotal = total + deliveryFee - discount;

  if (items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Add some products to get started!"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cart Header */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Shopping Cart</Text>
            <Text style={styles.itemCount}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
          {items.length > 0 && (
            <TouchableOpacity onPress={handleClearCart}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          {items.map((item, index) => (
            <Animated.View
              key={item.productId}
              entering={FadeInDown.delay(150 + index * 50).springify()}
            >
              <Card style={styles.cartItem}>
                <Image
                  source={{ uri: item.image || 'https://via.placeholder.com/100' }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemBrand}>Haldiram's</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                        {item.price < 300 && (
                          <View style={styles.deliveryTag}>
                            <Text style={styles.deliveryTagIcon}>🚀</Text>
                            <Text style={styles.deliveryTagText}>Fast</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <IconButton
                      icon="🗑️"
                      onPress={() => handleRemoveItem(item.productId)}
                      size="small"
                      variant="default"
                    />
                  </View>

                  <View style={styles.quantityRow}>
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrease={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      onIncrease={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      min={1}
                    />
                    <Text style={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>

        {/* Delivery Speed */}
        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <Text style={styles.sectionTitle}>Delivery Speed</Text>
          <View style={styles.deliveryOptions}>
            <TouchableOpacity
              style={[
                styles.deliveryOption,
                selectedDelivery === 'normal' && styles.deliveryOptionActive,
              ]}
              onPress={() => setSelectedDelivery('normal')}
            >
              <Text style={styles.deliveryIcon}>🚚</Text>
              <Text style={[
                styles.deliveryText,
                selectedDelivery === 'normal' && styles.deliveryTextActive,
              ]}>
                Normal (2-3 hours)
              </Text>
              <Text style={styles.deliveryFee}>Free</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                selectedDelivery === 'fast' && styles.deliveryOptionActive,
              ]}
              onPress={() => setSelectedDelivery('fast')}
            >
              <Text style={styles.deliveryIcon}>⚡</Text>
              <Text style={[
                styles.deliveryText,
                selectedDelivery === 'fast' && styles.deliveryTextActive,
              ]}>
                Fast (45-60 min)
              </Text>
              <Text style={[
                styles.deliveryFee,
                selectedDelivery === 'fast' && styles.deliveryFeeActive,
              ]}>
                ₹29
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                selectedDelivery === 'urgent' && styles.deliveryOptionActive,
              ]}
              onPress={() => setSelectedDelivery('urgent')}
            >
              <Text style={styles.deliveryIcon}>🏃</Text>
              <Text style={[
                styles.deliveryText,
                selectedDelivery === 'urgent' && styles.deliveryTextActive,
              ]}>
                Urgent (10-15 min)
              </Text>
              <Text style={[
                styles.deliveryFee,
                selectedDelivery === 'urgent' && styles.deliveryFeeActive,
              ]}>
                ₹59
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Promo Code */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor="#9CA3AF"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bill Summary */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Bill Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
              </Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#10B981' }]}>Discount</Text>
                <Text style={[styles.summaryValue, { color: '#10B981' }]}>-{formatPrice(discount)}</Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatPrice(finalTotal)}</Text>
            </View>
          </Card>
        </Animated.View>

        {/* Checkout Button */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.checkoutContainer}>
          <Button
            title={`Proceed to Checkout (${formatPrice(finalTotal)})`}
            onPress={handleCheckout}
            variant="primary"
            size="large"
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  itemsContainer: {
    marginBottom: 24,
    gap: 12,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F97316',
  },
  deliveryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  deliveryTagIcon: {
    fontSize: 10,
  },
  deliveryTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#F97316',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  deliveryOptions: {
    gap: 10,
    marginBottom: 24,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 12,
  },
  deliveryOptionActive: {
    borderColor: '#F97316',
    backgroundColor: '#FEF3E2',
  },
  deliveryIcon: {
    fontSize: 20,
  },
  deliveryText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  deliveryTextActive: {
    color: '#F97316',
    fontWeight: '600',
  },
  deliveryFee: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  deliveryFeeActive: {
    color: '#1F2937',
  },
  promoContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  applyButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F97316',
  },
  checkoutContainer: {
    marginTop: 8,
  },
});

export default Cart;
