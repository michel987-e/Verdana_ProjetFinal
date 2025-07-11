import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { changePassword, updateMyUser } from '../services/userService';
import { validateToken } from '../services/authService';

export default function EditProfileField({ route, navigation }: any) {
    const { field, label, value } = route.params;
    const [inputValue, setInputValue] = useState(value);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSave = async () => {
        try {
            const data = await validateToken();

            if (field === 'password') {
                if (!oldPassword || !newPassword || !confirmPassword) {
                    Alert.alert("Erreur", "Tous les champs sont requis.");
                    return;
                }

                if (newPassword !== confirmPassword) {
                    Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
                    return;
                }

                await changePassword(oldPassword, newPassword);
                Alert.alert("Succès", "Mot de passe mis à jour");
                navigation.goBack();
            } else {
                await updateMyUser(field, inputValue);
                Alert.alert("Succès", `${label} mis à jour`);
                navigation.goBack();
            }
        } catch (error: any) {
            Alert.alert("Erreur", error.message || "Une erreur est survenue");
        }
    };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modifier {label}</Text>

      {field === 'password' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Ancien mot de passe"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le nouveau mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      ) : (
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          autoCapitalize="none"
        />
      )}

      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
