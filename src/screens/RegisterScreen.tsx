import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/themes';
import { LoginInputError } from '../models/LoginInputError';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorType, setErrorType] = useState<LoginInputError | null>(null);
  const navigation = useNavigation();
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register(email, password, name);
    } catch (err) {
      switch(err.message) {
        case 'Error: (auth/invalid-name)':
          setErrorType('name')
        break
        case 'Firebase: Error (auth/invalid-email).':
          setErrorType('email')
        break
        case 'Firebase: Error (auth/missing-password).':
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          setErrorType('password')
        break
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor={errorType === 'name' ? colors.error : colors.placeholder}
        value={name}
        onChangeText={setName}
        style={[styles.input, errorType === 'name' && styles.error]}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor={errorType === 'email' ? colors.error : colors.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, errorType === 'email' && styles.error]}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={errorType === 'password' ? colors.error : colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, errorType === 'password' && styles.error]}
      />

      {
        errorType &&
        <Text style={styles.errorText}>
          {errorType === 'email' ? 'E-mail inválido' : errorType === 'name' ? 'Nome inválido' : 'Senha inválida'}
        </Text>
      }

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: colors.secondary },
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
