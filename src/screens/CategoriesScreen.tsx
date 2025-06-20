import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { categories } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <CategoryCard category={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  row: { justifyContent: 'space-between' },
});
