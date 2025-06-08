import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useOrderStore } from '../store/orderStore';

export default function OrdersScreen() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>Nenhum pedido ainda.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.order}>
              <Text style={styles.date}>{item.date}</Text>
              {item.items.map(({ product, quantity }) => (
                <Text key={product.id} style={styles.item}>
                  {quantity}x {product.name}
                </Text>
              ))}
              <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 32 },
  order: { marginBottom: 24, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  date: { fontWeight: '600', marginBottom: 6 },
  item: { fontSize: 14, marginLeft: 8 },
  total: { marginTop: 6, fontWeight: 'bold' },
});
