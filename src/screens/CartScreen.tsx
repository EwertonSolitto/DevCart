import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/themes';

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
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.containerList}
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
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.button} >
          <Text style={styles.buttonText}>Ir para o Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background, justifyContent: 'center' },
  containerList: { marginTop: 48 },
  text: { fontSize: 18, textAlign: 'center', marginTop: 40, color: colors.secondary },
  item: {
    backgroundColor: colors.primary,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  name: { fontWeight: 'bold', fontSize: 16, color: colors.card },
  details: { fontSize: 14, color: colors.card },
  remove: {
    color: colors.error,
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
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.card
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.card
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { fontSize: 14, color: colors.card, fontWeight: 600 },
});
