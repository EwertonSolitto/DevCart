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
  container: { flex: 1, alignItems: 'center', backgroundColor: colors.background, paddingTop: 64, gap: 48 },
  profileContainer: { alignItems: 'center', gap: 16 },
  profileName: { fontSize: 28, color: colors.secondary, fontWeight: 500 },
  buttonList: { width: '90%', marginInline: 16 },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBlock: 20,
    paddingInline: 12
  },
  buttonTextContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  buttonText: { color: colors.secondary, fontWeight: 500, fontSize: 16 },
});