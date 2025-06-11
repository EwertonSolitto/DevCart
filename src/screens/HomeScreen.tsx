import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button title="🔍 Buscar" onPress={() => navigation.navigate('Search')} />
        <Text style={styles.title}>Categorias</Text>
        <FlatList 
          data={categories.slice(0, 4)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <CategoryCard category={item} />}
          scrollEnabled={false}
        />
        <View style={styles.categoriesButtonView}>
          <TouchableOpacity 
            style={styles.categoriesButton} 
            onPress={() => navigation.navigate('Categories')}
          >
            <Text style={styles.categoriesButtonText}>Ver todas as categorias</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>DevCart - Destaques</Text>
        <FlatList
          data={products.slice(0, 100)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    marginTop: 8
  },
  list: { paddingBottom: 16 },
  categoriesButtonView: { alignItems: 'center' },
  categoriesButton: { 
    backgroundColor: "#1E90FF",
    paddingBlock: 2,
    paddingInline: 4,
    borderRadius: 2
  },
  categoriesButtonText: { fontSize: 14, color: '#F0F0F0' },
  row: { justifyContent: 'space-between' },
});
