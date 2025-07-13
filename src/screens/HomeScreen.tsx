import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { colors } from '../theme/themes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinkButton } from '../components/Button';

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.mainTitle]}>DevCart</Text>
          <TouchableOpacity 
            style={[styles.button, styles.searchButton]} 
            onPress={() => navigation.navigate('Search')} 
          >
            <FontAwesome size={24} name='search' color={colors.secondary} />
          </TouchableOpacity>
        </View>
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
          <LinkButton text='Ver todas as categorias' func={() => navigation.navigate('Categories')} />
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
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: colors.background },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 28
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    marginTop: 8,
    color: colors.secondary
  },
  searchButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border
  },
  list: { paddingBottom: 16 },
  categoriesButtonView: { alignItems: 'center' },
  button: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  row: { justifyContent: 'space-between' },
});
