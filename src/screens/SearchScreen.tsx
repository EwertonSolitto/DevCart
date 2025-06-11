import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, Keyboard } from 'react-native';
import { products } from '../data/products'; 
import ProductCard from '../components/ProductCard';
import { Product } from '../models/Product';
import { addToSearchHistory, clearSearchHistory, getSearchHistory } from '../utils/searchHistory';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const result = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
      loadHistory();
    }, 300);

    const saveSearchTimeout = setTimeout(() => {
      addToSearchHistory(query.trim());
      loadHistory();
    }, 2500)

    return () => {
      clearTimeout(debounceTimeout)
      clearTimeout(saveSearchTimeout)
    };
  }, [query]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const saved = await getSearchHistory();
    setHistory(saved);
  };

  const handleSelectHistory = (term: string) => {
    setQuery(term);
    Keyboard.dismiss();
  };

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

      {query.length === 0 && history.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Buscas recentes</Text>
            <TouchableOpacity onPress={async () => {
              await clearSearchHistory();
              setHistory([]);
            }}>
              <Text style={styles.clearBtn}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {history.map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => handleSelectHistory(item)}>
              <Text style={styles.historyItem}>🔍 {item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  empty: { textAlign: 'center', marginTop: 32, fontSize: 16, color: '#999' },
    historyContainer: { marginBottom: 16 },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: { fontSize: 16, fontWeight: 'bold' },
  clearBtn: { fontSize: 14, color: 'red' },
  historyItem: {
    paddingVertical: 8,
    fontSize: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  }
});
