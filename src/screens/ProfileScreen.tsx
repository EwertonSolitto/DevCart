import React, { ComponentProps } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../theme/themes';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation()
  const profileButtons: Array<{ 
    name: string, icon: 
    ComponentProps<typeof FontAwesome>['name'] ,
    onPress: () => void }
  > = [
    { name: 'Histórico de compras', icon: 'list-ul' ,onPress: () => navigation.navigate('Orders') },
    { name: 'Dados da conta', icon: 'address-book-o', onPress: () => navigation.navigate('AccountData') },
    { name: 'Favoritos', icon: 'heart', onPress: () => navigation.navigate('Favorites')},
    { name: 'Sair', icon: 'sign-out', onPress: logout }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome name='user-circle' color={colors.secondary} size={108} />
        <Text style={styles.profileName}>{user?.name}</Text>
      </View>
      
      <FlatList 
        data={profileButtons}
        style={styles.buttonList}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.button} onPress={item.onPress}>
            <View style={styles.buttonTextContainer}>
              <FontAwesome name={item.icon} size={16} color={colors.secondary} />
              <Text style={styles.buttonText}>{item.name}</Text>
            </View>
            <FontAwesome name={'angle-right'} size={20} color={colors.secondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32 },
  button: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});