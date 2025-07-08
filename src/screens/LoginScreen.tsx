import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/themes';
import { LoginInputError } from '../models/LoginInputError';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorType, setErrorType] = useState<LoginInputError | null>(null);
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      switch(err.message) {
        case 'Firebase: Error (auth/invalid-email).':
          setErrorType('email')  
        break
        case 'Firebase: Error (auth/missing-password).':
        case 'Firebase: Error (auth/invalid-credential)':
          setErrorType('password')
        break
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DevCart</Text>

      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, errorType === 'email' && styles.error]}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={errorType === 'email' ? colors.error : colors.placeholder}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={[styles.input, errorType === 'password' && styles.error]}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={errorType === 'password' ? colors.error : colors.placeholder}
      />

      {
        errorType &&
        <Text style={styles.errorText}>
          {errorType === 'email' ? 'E-mail inválido' : 'Senha ou e-mail incorretos'}
        </Text>
      }

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Ainda não tem conta? Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background},
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: colors.secondary},
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: colors.secondary
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: colors.card, fontSize: 16, fontWeight: '600' },
  link: { textAlign: 'center', color: colors.primary, fontSize: 14 },
  error: { borderColor: colors.error },
  errorText: {
    position: 'relative',
    color: colors.error,
    textAlign: 'center',
    bottom: 8,
  }
});
