import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/themes';

const statusList = [
  { label: 'Pedido confirmado', emoji: '🧾' },
  { label: 'Em preparo', emoji: '👨‍🍳' },
  { label: 'A caminho', emoji: '🚚' },
  { label: 'Entregue', emoji: '📦' },
];

export default function OrderStatusScreen() {
  const navigation = useNavigation()
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (statusIndex < statusList.length - 1) {
      const timeout = setTimeout(() => {
        setStatusIndex((prev) => prev + 1);
      }, 2500);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if(navigation.canGoBack()) {
          navigation.goBack()
        }

        return () => clearTimeout(timeout)
      }, 5000)
    }
  }, [statusIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>

      {statusList.map((status, index) => (
        <View
          key={index}
          style={[
            styles.statusItem,
            index === statusIndex && styles.activeStatus,
            index < statusIndex && styles.completedStatus,
          ]}
        >
          <Text style={styles.emoji}>{status.emoji}</Text>
          <Text style={styles.statusText}>
            {status.label}
            {index === statusIndex && ' (agora)'}
          </Text>
        </View>
      ))}

      {statusIndex < statusList.length - 1 ? (
        <ActivityIndicator style={{ marginTop: 32 }} size="large" color={colors.secondary} />
      ) : (
        <Text style={styles.done}>✅ Pedido finalizado com sucesso!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: colors.secondary },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    opacity: 0.4,
  },
  activeStatus: {
    opacity: 1,
  },
  completedStatus: {
    opacity: 0.7,
  },
  emoji: { fontSize: 28, marginRight: 12 },
  statusText: { fontSize: 18, color: colors.secondary },
  done: { fontSize: 18, color: colors.primary, marginTop: 24, textAlign: 'center' },
});
