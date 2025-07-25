import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../models/Product';
import { colors } from '../theme/themes';

export default function ProductCard({ product }: { product: Product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Product' as never, { product } as never)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>⭐ {product.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.secondary,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.card
  },
  price: {
    fontSize: 14,
    color: colors.secondary,
  },
  rating: {
    fontSize: 12,
    color: colors.yellow,
  },
});
