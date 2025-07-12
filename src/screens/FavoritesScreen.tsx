import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useFavoriteStore } from '../store/favoriteStore';
import { colors } from '../theme/themes';

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
    <View style={styles.containerList}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favorite}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  text: { fontSize: 18, color: colors.secondary },
  containerList: { flex: 1, backgroundColor: colors.background, paddingTop: 48 },
  title: { fontSize: 28, color: colors.secondary, fontWeight: 500, marginLeft: 12 }
});