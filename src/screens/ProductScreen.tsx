import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore'
import { Product } from '../models/Product';
import { colors } from '../theme/themes';

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
  const navigation = useNavigation()

  const existing = favorite.find((item) => item.id === product.id)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={32} color={colors.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(product)}>
          <FontAwesome name={existing ? "heart" : "heart-o"} size={32} color={existing ? colors.error : colors.background} />
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
          <TouchableOpacity onPress={() => addToCart(product)} style={styles.button} >
            <Text style={styles.buttonText} >Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: '100%', height: 280, backgroundColor: colors.secondary },
  content: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: colors.secondary },
  price: { fontSize: 20, color: colors.primary, marginBottom: 4 },
  rating: { fontSize: 16, color: colors.yellow, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6, color: colors.secondary },
  description: { fontSize: 16, color: colors.border },
  topButtons: {
    position: 'absolute',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48, 
    paddingInline: 24,
    width: "100%",
    zIndex: 1,
  },
  button: { backgroundColor: colors.primary, alignItems: 'center', paddingBlock: 10, borderRadius: 4 },
  buttonText: { fontSize: 16, fontWeight: 600, color: colors.card },
});
