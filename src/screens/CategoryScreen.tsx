import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Product } from '../models/Product'; 
import { products } from '../data/products'; 
import ProductCard from '../components/ProductCard';
import { colors } from '../theme/themes';

type CategoryRouteProp = RouteProp<{ params: { category: string } }, 'params'>;

export default function CategoryScreen() {
  const route = useRoute<CategoryRouteProp>();
  const { category } = route.params;

  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: colors.secondary, marginTop: 32 }
});
