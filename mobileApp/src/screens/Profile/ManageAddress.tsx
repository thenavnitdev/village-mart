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
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ManageAddressNavigationProp = StackNavigationProp<RootStackParamList>;

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const ManageAddress: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ManageAddressNavigationProp>();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'Home',
      name: 'Piyush Sharma',
      phone: '+91 98765 43210',
      address: '123, Village Street, Block A',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Work',
      name: 'Piyush Sharma',
      phone: '+91 98765 43210',
      address: '456, Office Complex, Sector 5',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      isDefault: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    type: 'Home' as 'Home' | 'Work' | 'Other',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
      ));
    } else {
      // Add new address
      setAddresses([...addresses, { ...formData, id: Date.now().toString() }]);
    }
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      type: 'Home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  if (showAddForm) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          title={editingAddress ? 'Edit Address' : 'Add New Address'}
          showBackButton
          onBackPress={() => {
            setShowAddForm(false);
            setEditingAddress(null);
            setFormData({
              type: 'Home',
              name: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              pincode: '',
              isDefault: false,
            });
          }}
          backgroundColor={theme.colors.primary}
          titleColor={theme.colors.textLight}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Card style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Address Type</Text>
                <View style={styles.typeContainer}>
                  {['Home', 'Work', 'Other'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeOption,
                        formData.type === type && {
                          backgroundColor: theme.colors.primary,
                          borderColor: theme.colors.primary,
                        },
                      ]}
                      onPress={() => setFormData({ ...formData, type: type as any })}
                    >
                      <Text
                        style={[
                          styles.typeText,
                          { color: formData.type === type ? theme.colors.textLight : theme.colors.text },
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter name"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Phone Number</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter phone number"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Street Address</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter street address"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                    multiline
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>City</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter city"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>State</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter state"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.state}
                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Pincode</Text>
                <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter pincode"
                    placeholderTextColor={theme.colors.textMuted}
                    value={formData.pincode}
                    onChangeText={(text) => setFormData({ ...formData, pincode: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.defaultContainer}
                onPress={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
              >
                <View
                  style={[
                    styles.checkbox,
                    formData.isDefault && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
                  ]}
                >
                  {formData.isDefault && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.defaultText, { color: theme.colors.text }]}>
                  Set as default address
                </Text>
              </TouchableOpacity>
            </Card>
          </Animated.View>
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
          <Button
            title="Save Address"
            onPress={handleSaveAddress}
            variant="primary"
            size="large"
            style={styles.saveButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Manage Addresses"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.textLight}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {addresses.map((address, index) => (
          <Animated.View
            key={address.id}
            entering={FadeInDown.delay(index * 100).springify()}
          >
            <Card style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeContainer}>
                  <View style={[styles.addressTypeBadge, { backgroundColor: theme.colors.primaryLight }]}>
                    <Text style={[styles.addressTypeText, { color: theme.colors.primary }]}>
                      {address.type}
                    </Text>
                  </View>
                  {address.isDefault && (
                    <View style={[styles.defaultBadge, { backgroundColor: theme.colors.primary }]}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                <View style={styles.addressActions}>
                  <TouchableOpacity
                    onPress={() => handleEdit(address)}
                    style={styles.actionButton}
                  >
                    <Text style={[styles.actionText, { color: theme.colors.primary }]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(address.id)}
                    style={styles.actionButton}
                  >
                    <Text style={[styles.actionText, { color: theme.colors.error }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.addressName, { color: theme.colors.text }]}>{address.name}</Text>
              <Text style={[styles.addressPhone, { color: theme.colors.textMuted }]}>
                {address.phone}
              </Text>
              <Text style={[styles.addressText, { color: theme.colors.textMuted }]}>
                {address.address}
              </Text>
              <Text style={[styles.addressText, { color: theme.colors.textMuted }]}>
                {address.city}, {address.state} - {address.pincode}
              </Text>

              {!address.isDefault && (
                <TouchableOpacity
                  onPress={() => handleSetDefault(address.id)}
                  style={styles.setDefaultButton}
                >
                  <Text style={[styles.setDefaultText, { color: theme.colors.primary }]}>
                    Set as Default
                  </Text>
                </TouchableOpacity>
              )}
            </Card>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(addresses.length * 100).springify()}>
          <Button
            title="+ Add New Address"
            onPress={() => setShowAddForm(true)}
            variant="outline"
            size="large"
            style={styles.addButton}
          />
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
  addressCard: {
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addressTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  addressTypeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  addressActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  setDefaultButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  setDefaultText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    marginTop: 8,
  },
  formCard: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 15,
    fontWeight: '600',
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
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  defaultText: {
    fontSize: 15,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButton: {
    width: '100%',
  },
});

export default ManageAddress;

