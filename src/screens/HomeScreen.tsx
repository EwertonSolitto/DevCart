import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DevCart - Destaques</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  list: { paddingBottom: 16 },
});
