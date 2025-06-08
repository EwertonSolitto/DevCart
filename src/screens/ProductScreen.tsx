import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore'

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description?: string;
};

type RouteParams = {
  Product: {
    product: Product;
  };
};

export default function ProductScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Product'>>();
  const { product } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);
  const favorite = useFavoriteStore((state) => state.favorites)
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const existing = favorite.find((item) => item.id === product.id)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.favorite}>
        <TouchableOpacity onPress={() => toggleFavorite(product)}>
          <FontAwesome name={existing ? "heart" : "heart-o"} size={32} color={existing ? "red" : "black"} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>⭐ {product.rating}</Text>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {product.description || 'Este produto não possui descrição.'}
        </Text>
        <View style={{ marginTop: 24 }}>
          <Button title="Adicionar ao Carrinho" onPress={() => addToCart(product)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 280, backgroundColor: '#fff' },
  content: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, color: '#1E90FF', marginBottom: 4 },
  rating: { fontSize: 16, color: '#666', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  description: { fontSize: 16, color: '#444' },
  favorite: {
    position: 'absolute', 
    marginTop: 24, 
    alignItems: 'flex-end', 
    paddingRight: 24,
    width: "100%",
    zIndex: 1
  }
});
