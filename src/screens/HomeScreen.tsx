import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../data/categories';

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Button title="🔍 Buscar" onPress={() => navigation.navigate('Search')} />
      <Text style={styles.title}>Categorias</Text>
      <FlatList 
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Category', { category: item.name })}>
            <Text>{item.emoji} {item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
        <Text>🗂️ Ver todas as categorias</Text>
      </TouchableOpacity>
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
