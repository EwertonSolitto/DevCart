import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProductScreen from '../screens/ProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CategoryScreen from '../screens/CategoryScreen';

import { useFavoriteStore } from '../store/favoriteStore';
import { useCartStore } from '../store/cartStore';
import SearchScreen from '../screens/SearchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useAuth } from '../contexts/AuthContext';
import { SplashScreen } from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme/themes';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const defaultOptions = {
  headerShown: false
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Produto' }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="FavoriteMain" component={FavoritesScreen} options={{ title: 'Favorito' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Produto' }} />
    </Stack.Navigator>
  )
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Cart' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name='Status' component={OrderStatusScreen} options={{title: 'Status'}} />
    </Stack.Navigator>
  )
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
    </Stack.Navigator>
  )
}

function TabNavigation() {
  const favoriteCount = useFavoriteStore((state) => state.favorites.length)
  const cartCount = useCartStore((state) => (
    state.cart.reduce((total, item) => total + item.quantity, 0)
  ))

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      ...defaultOptions,
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Home') return <FontAwesome name='home' size={32} color={color} />
        if (route.name === 'Favorites') return <FontAwesome name='heart' size={32} color={color} />
        if (route.name === 'Cart') return <FontAwesome name='shopping-cart' size={32} color={color} />
        if (route.name === 'Profile') return <FontAwesome name='user' size={32} color={color} />
      },
      tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: colors.border }} />,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.border,
      tabBarStyle: {
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card
      },
      tabBarIconStyle: {
        marginBlock: 'auto',
        width: 32,
        height: 32
      },
      tabBarBadgeStyle: {
        backgroundColor: colors.error
      },
      animation: 'shift',
    })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen 
        name="Favorites" 
        component={FavoriteStack} 
        options={{
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined
        }}
      />
      <Tab.Screen
        name="Cart" 
        component={CartStack} 
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined
        }}  
      />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {
        user ? (
          <Stack.Screen name='Main' component={TabNavigation} />
        ) : (
          <Stack.Screen name='LoginArea' component={LoginStack}/>
        )
      }
      
      
    </Stack.Navigator>
  );
}