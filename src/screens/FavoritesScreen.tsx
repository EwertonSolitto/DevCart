import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useFavoriteStore } from '../store/favoriteStore';

export default function FavoritesScreen() {
  const favorite = useFavoriteStore((state) => state.favorites)

  if (favorite.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum item favorito ainda.</Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={favorite}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <ProductCard product={item} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});