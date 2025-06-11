import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Button title="🔍 Buscar" onPress={() => navigation.navigate('Search')} />
      <Text style={styles.title}>Categorias</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Teclado' })}>
          <Text>📱 Teclado</Text>
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
