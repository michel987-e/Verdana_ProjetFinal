import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getUserById } from '../services/userService';
import { logoutUser, validateToken } from '../services/authService';
import { IUser } from '../interfaces';

export default function Parametres({ navigation }: any) {
  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await validateToken();
        const user = await getUserById(data.payload.sub);
        setUserData(user);
      } catch (err) {
        navigation.navigate('Login');
      }
    };

    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#232323" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/photo.png')} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData?.name ?? userData?.email.trim().split("@")[0] ?? "Guest"}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Compte</Text>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Profil')}>
        <Text style={styles.menuItemText}>Compte</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => alert('Changer le mot de passe')}>
        <Text style={styles.menuItemText}>Changer votre mot de passe</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Notifications')}>
        <Text style={styles.menuItemText}>Notifications</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Support</Text>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Support')}>
        <Text style={styles.menuItemText}>Contactez-Nous</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => alert('Conditions de service')}>
        <Text style={styles.menuItemText}>Conditions de service</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => alert('Politique de confidentialité')}>
        <Text style={styles.menuItemText}>Politique de confidentialité</Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => {
                Alert.alert(
                  "Déconnexion",
                  "Voulez-vous vous déconnecter ?",
                  [
                    { text: "Annuler", style: "cancel" },
                    { text: "Oui", onPress: () => logoutUser().then(() => navigation.navigate('Login')) }
                  ]
                );
              }}>
        <Text style={styles.logoutButtonText}>Deconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232323',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232323',
  },
  profileStatus: {
    fontSize: 14,
    color: '#28B463',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#232323',
  },
  logoutButton: {
    backgroundColor: '#E0F0E0', 
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#2C5530',
    fontSize: 18,
    fontWeight: 'bold',
  },
});