import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Category } from '../models/Category';

export function CategoryCard({ category }: { category: Category}) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Category', { category: category.name })}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
card: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
  },
  emoji: { fontSize: 32, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600' },
})