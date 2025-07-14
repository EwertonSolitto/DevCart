import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getOrderHistory } from '../store/orderStore';
import { Order } from '../models/Order';
import { colors } from '../theme/themes';

export default function OrdersScreen() {
  const [orders, useOrders] = useState<Order[]>([])

  useEffect(() => {
    (async () => {
      const history = await getOrderHistory()

      useOrders(history)
    })()
  }, [])

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
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: colors.secondary, marginTop: 32 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 32, color: colors.secondary },
  order: { marginBottom: 24, paddingBottom: 12, borderBottomWidth: 1, borderColor: colors.border },
  date: { fontWeight: '600', marginBottom: 6, color: colors.secondary },
  item: { fontSize: 14, marginLeft: 8, color: colors.secondary },
  total: { marginTop: 6, fontWeight: 'bold', color: colors.primary },
});
