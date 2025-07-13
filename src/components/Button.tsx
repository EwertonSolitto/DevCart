import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/themes';

export function LinkButton({ text, func, disabled }: { text: string, func: () => void, disabled?: boolean}) {
  return (
    <TouchableOpacity style={styles.container} onPress={func} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: { fontSize: 14, color: colors.card, fontWeight: 600 }
})