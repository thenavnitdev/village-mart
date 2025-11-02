import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { formatPrice } from '../../utils/formatPrice';

type OrdersNavigationProp = StackNavigationProp<RootStackParamList>;

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

const Orders: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OrdersNavigationProp>();

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Premium Namkeen Mix',
          image: 'https://via.placeholder.com/100',
          quantity: 2,
          price: 299,
        },
        {
          id: '2',
          name: 'Sweet Gulab Jamun',
          image: 'https://via.placeholder.com/100',
          quantity: 1,
          price: 199,
        },
      ],
      total: 797,
    },
    {
      id: '2',
      orderNumber: '#ORD-2024-002',
      date: '2024-01-10',
      status: 'processing',
      items: [
        {
          id: '3',
          name: 'Traditional Halwa',
          image: 'https://via.placeholder.com/100',
          quantity: 3,
          price: 249,
        },
      ],
      total: 747,
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return theme.colors.success;
      case 'processing':
        return theme.colors.warning;
      case 'pending':
        return theme.colors.info;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.textMuted;
    }
  };

  const handleReorder = (order: Order) => {
    // Handle reorder logic
    console.log('Reorder:', order);
  };

  if (orders.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          title="My Orders"
          showBackButton
          onBackPress={() => navigation.goBack()}
          backgroundColor={theme.colors.primary}
          titleColor={theme.colors.textLight}
        />
        <EmptyState
          icon="📦"
          title="No orders yet"
          message="Your order history will appear here"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="My Orders"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {orders.map((order, index) => (
          <Animated.View
            key={order.id}
            entering={FadeInDown.delay(100 + index * 50).springify()}
          >
            <Card style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={[styles.orderNumber, { color: theme.colors.text }]}>
                    {order.orderNumber}
                  </Text>
                  <Text style={[styles.orderDate, { color: theme.colors.textMuted }]}>
                    {order.date}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(order.status)}20` },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: getStatusColor(order.status) }]}
                  >
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.itemsContainer}>
                {order.items.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={[styles.itemName, { color: theme.colors.text }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.itemQuantity, { color: theme.colors.textMuted }]}>
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </Text>
                    </View>
                    <Text style={[styles.itemTotal, { color: theme.colors.text }]}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <View>
                  <Text style={[styles.totalLabel, { color: theme.colors.textMuted }]}>
                    Total Amount
                  </Text>
                  <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
                    {formatPrice(order.total)}
                  </Text>
                </View>
                <Button
                  title="Reorder"
                  onPress={() => handleReorder(order)}
                  variant="outline"
                  size="medium"
                />
              </View>
            </Card>
          </Animated.View>
        ))}
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
  orderCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F9FAFB',
  },
  itemDetails: {
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
  itemTotal: {
    fontSize: 15,
    fontWeight: '700',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Orders;

