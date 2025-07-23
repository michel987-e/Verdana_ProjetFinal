import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { loginUser } from '../../services/userService';
import { saveSecureItem } from '../../services/secureStore';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        await saveSecureItem('auth_token', data.token)
      }
    } catch(err) {
      alert(`Login : ${err}`)
    }
  };

  const handleQuickLogin = () => {
    navigation.replace('Home'); // ou navigation.navigate('Home') selon la logique souhaitée
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <Text style={styles.welcomeTitle}>Connection</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#2C5530"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#2C5530"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#85C1E9' }]} onPress={handleQuickLogin}>
        <Text style={styles.loginButtonText}>Connexion rapide</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>Vous n'avez pas de compte? Inscrivez-vous</Text>
      </TouchableOpacity>
    </Animated.View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '80%',
    backgroundColor: '#E0F0E0',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    color: '#2C5530',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#28B463',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'green',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
});