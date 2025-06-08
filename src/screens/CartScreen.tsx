import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const navigation = useNavigation();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);


  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Seu carrinho está vazio.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.product.name}</Text>
            <Text style={styles.details}>
              Quantidade: {item.quantity} | R$ {(item.product.price * item.quantity).toFixed(2)}
            </Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.product.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.product.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
              <Text style={styles.remove}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{display: cart.length > 0 ? 'flex' : 'none'}}>
        <Button title="Ir para o Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  text: { fontSize: 18, textAlign: 'center', marginTop: 40 },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  details: { fontSize: 14, color: '#444' },
  remove: {
    color: '#FF4444',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  quantityRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 12,
  gap: 12,
  },
  qtyButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});
