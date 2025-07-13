import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/themes';

export function LinkButton({ text, func }: { text: string, func: () => void}) {
  return (
    <TouchableOpacity style={styles.container} onPress={func}>
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