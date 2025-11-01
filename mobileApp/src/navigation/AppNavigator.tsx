import React from 'react';
import { Text, TextStyle, Platform, View, Image } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import { colors } from '../theme';
import { useAppSelector } from '../store/hooks';
import AnimatedTabBar from '../components/navigation/AnimatedTabBar';
import AuthNavigator from './AuthNavigator';
import Home from '../screens/Home/Home';
import Products from '../screens/Products/Products';
import Cart from '../screens/Cart/Cart';
import Wishlist from '../screens/Wishlist/Wishlist';
import Profile from '../screens/Profile/Profile';
import Checkout from '../screens/Checkout/Checkout';
import ProductDetails from '../screens/Products/ProductDetails';
import ProfileDetails from '../screens/Profile/ProfileDetails';
import ManageAddress from '../screens/Profile/ManageAddress';
import AppSettings from '../screens/Profile/AppSettings';
import HelpSupport from '../screens/Profile/HelpSupport';

export type RootTabParamList = {
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Checkout: undefined;
  ProductDetails: { productId: string };
  ProfileDetails: undefined;
  ManageAddress: undefined;
  AppSettings: undefined;
  HelpSupport: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Tab Icons - Using custom icon components
// Icons will be rendered from TabIcons component based on route name
const tabIcons = {
  Home: 'home',
  Products: 'products',
  Cart: 'cart',
  Wishlist: 'wishlist',
  Profile: 'profile',
};

const TabNavigator: React.FC = () => {
  const { theme } = useAppTheme();
  
  const headerTitleStyle: TextStyle = {
    fontWeight: 'bold' as const,
    fontSize: 18,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted || colors.text.muted,
        tabBarStyle: {
          display: 'none',
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
          ...Platform.select({
            ios: {},
            android: {
              elevation: 4,
            },
          }),
        },
        headerTintColor: theme.colors.textLight || colors.text.light,
        headerTitleStyle: headerTitleStyle,
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => tabIcons.Home as any,
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: () => tabIcons.Products as any,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: () => tabIcons.Cart as any,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: () => tabIcons.Wishlist as any,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => tabIcons.Profile as any,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { theme, isDark } = useAppTheme();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const navigationTheme: Theme = {
    dark: isDark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.cardBackground,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800' as const,
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Main"
      >
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen 
          name="Checkout" 
          component={Checkout}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProductDetails" 
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProfileDetails" 
          component={ProfileDetails}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ManageAddress" 
          component={ManageAddress}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="AppSettings" 
          component={AppSettings}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="HelpSupport" 
          component={HelpSupport}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

