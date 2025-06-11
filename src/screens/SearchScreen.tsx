import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { products } from '../data/products'; // sua lista de produtos
import ProductCard from '../components/ProductCard';
import { Product } from '../models/Product';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
    }, 300);

    return () => clearTimeout(timeout); // limpa timeout anterior
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar cursos ou produtos..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {query.length > 0 && filtered.length === 0 && (
        <Text style={styles.empty}>Nenhum resultado encontrado.</Text>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#555' },
  empty: { textAlign: 'center', marginTop: 32, fontSize: 16, color: '#999' },
});
