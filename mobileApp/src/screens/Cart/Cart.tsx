import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import { useAppSelector } from '../../store/hooks';
import { formatPrice } from '../../utils/formatPrice';
import Card from '../../components/common/Card';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('cart.empty')}</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>{t('cart.title')}</Text>
          <Text style={styles.itemCount}>
            {t('cart.itemCount', { count: itemCount })}
          </Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>{t('common.total')}</Text>
            <Text style={styles.totalAmount}>{formatPrice(total)}</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary[500],
  },
});

export default Cart;

