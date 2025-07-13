import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import { saveOrderToFirestore } from '../store/orderStore';
import { LinkButton } from '../components/Button';
import { colors } from '../theme/themes';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const order = {
      id: Date.now().toString(),
      items: cart,
      total,
      date: new Date().toLocaleString(),
    }

    await saveOrderToFirestore(order)
    Alert.alert('Pedido confirmado!', 'Obrigado pela sua compra!');
    clearCart();
    navigation.navigate('Status')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.product.name}</Text>
            <Text style={styles.details}>
              {item.quantity}x R$ {item.product.price.toFixed(2)} = R$ {(item.quantity * item.product.price).toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Seu carrinho está vazio.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
        <LinkButton text="Finalizar Pedido" func={handleCheckout} disabled={cart.length === 0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors.secondary },
  item: { marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '600', color: colors.secondary },
  details: { fontSize: 14, color: colors.primary },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: colors.secondary },
  footer: { marginTop: 24 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: colors.secondary },
});
