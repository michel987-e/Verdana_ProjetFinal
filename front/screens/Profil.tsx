import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { deleteAccount, getUserById } from '../services/userService';
import { IUser } from '../interfaces';
import { Feather } from '@expo/vector-icons';
import { validateToken } from '../services/authService';
import { useFocusEffect } from '@react-navigation/native';

export default function Profil({ navigation }: any) {
  const [userData, setUserData] = useState<IUser>()

  const fetchUser = async () => {
    try {
      const data = await validateToken();
      const user = await getUserById(data.payload.sub);
      setUserData(user);
    } catch (err) {
      navigation.navigate('Login');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Informations du compte
            </Text>

            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.infos} onPress={() => navigation.navigate('UpdateAccount', {
                field: 'name',
                label: 'Nom',
                value: userData.name || ''
              })}>
                <Text style={styles.infoTitle}>Nom</Text>
                <Text style={styles.infoContent}>{userData.name ?? "Non renseigné"}</Text>
                <Feather name="chevron-right" size={20} color="#7F8C8D" />
              </TouchableOpacity>

              <View style={styles.divider}></View>

              <TouchableOpacity style={styles.infos} onPress={() => navigation.navigate('UpdateAccount', {
                field: 'email',
                label: 'Email',
                value: userData.email
              })}>
                <Text style={styles.infoTitle}>E-mail</Text>
                <Text style={styles.infoContent} >{userData.email}</Text>
                <Feather name="chevron-right" size={20} color="#7F8C8D" />
              </TouchableOpacity>

              <View style={styles.divider}></View>

              <TouchableOpacity style={styles.infos} onPress={() => navigation.navigate('UpdateAccount', {
                field: 'city',
                label: 'Ville',
                value: userData.city || ''
              })}>
                <Text style={styles.infoTitle}>Ville</Text>
                <Text style={styles.infoContent}>{userData.city ?? "Non renseignée"}</Text>
                <Feather name="chevron-right" size={20} color="#7F8C8D" />
              </TouchableOpacity>

              <View style={styles.divider}></View>

              <TouchableOpacity style={styles.infos} onPress={() => navigation.navigate('UpdateAccount', {
                field: 'country',
                label: 'Pays',
                value: userData.country || ''
              })}>
                <Text style={styles.infoTitle}>Pays</Text>
                <Text style={styles.infoContent}>{userData.country ?? "Non renseignée"}</Text>
                <Feather name="chevron-right" size={20} color="#7F8C8D" />
              </TouchableOpacity>

               <TouchableOpacity style={styles.infos} onPress={() => navigation.navigate('UpdateAccount', {
                field: 'password',
                label: 'Mot de passe',
                value: ''
              })}>
                <Text style={styles.infoTitle}>Mot de passe</Text>
                <Feather name="chevron-right" size={20} color="#7F8C8D" />
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Gestion du compte
            </Text>

            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.deleteAccount} onPress={() => {
                Alert.alert("Supprimer le compte", "Etes-vous sûr de vouloir supprimer le compte ?", [
                  {text: "Annuler", style: "cancel"},
                  {text: "Supprimer", onPress: () => deleteAccount(userData.id).then(() => navigation.navigate('Login'))}
                ])
              }}>
                <Text style={styles.infoTitle}>Supprimer le compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#484848',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  deleteAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  divider: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#232323',
  },
  infoContent: {
    fontSize: 14,
    color: '#484848',
  }
})