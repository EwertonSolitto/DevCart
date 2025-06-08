import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProductScreen from '../screens/ProductScreen';
import { useFavoriteStore } from '../store/favoriteStore';
import { useCartStore } from '../store/cartStore';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderStatusScreen from '../screens/orderStatusScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Produto' }} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoriteMain" component={FavoritesScreen} options={{ title: 'Favorito' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Produto' }} />
    </Stack.Navigator>
  )
}

function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name='Status' component={OrderStatusScreen} options={{title: 'Status'}} />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const favoriteCount = useFavoriteStore((state) => state.favorites.length)
  const cartCount = useCartStore((state) => (
    state.cart.reduce((total, item) => total + item.quantity, 0)
  ))

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <FontAwesome name='home' size={size} color={color} />
          if (route.name === 'Favorites') return <FontAwesome name='heart' size={size} color={color} />
          if (route.name === 'Cart') return <FontAwesome name='shopping-cart' size={size} color={color} />
        }
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}