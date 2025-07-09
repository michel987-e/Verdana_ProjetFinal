import React, { useState, useRef, useEffect } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, TextInput, Animated, View
} from 'react-native';
import { registerUser } from '../../services/userService';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleLogin = () => {
    const newUser = registerUser(email, password)
    alert(`newUser : ${newUser}`);
  };
  
  const isEmailValid = email.length > 0;
  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;
  const canSubmit = isEmailValid && isPasswordValid && isConfirmPasswordValid && passwordsMatch;

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
      <Text style={styles.welcomeTitle}>Inscription</Text>

      <TextInput
        style={[
          styles.input,
          !isEmailValid && styles.inputError,
        ]}
        placeholder="Email"
        placeholderTextColor="#2C5530"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[
          styles.input,
          !isPasswordValid && password.length > 0 && styles.inputError,
        ]}
        placeholder="Mot de passe"
        placeholderTextColor="#2C5530"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isPasswordValid && password.length > 0 && (
        <Text style={styles.errorText}>
          Le mot de passe doit contenir au moins 8 caractères.
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          !passwordsMatch && isConfirmPasswordValid && styles.inputError,
        ]}
        placeholder="Confirmation mot de passe"
        placeholderTextColor="#2C5530"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {!passwordsMatch && (
        <Text style={styles.errorText}>
          Les mots de passe ne correspondent pas
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.loginButton,
          !canSubmit && styles.loginButtonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>Vous avez déjà un compte ? Connectez-vous</Text>
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  loginButtonDisabled: {
    backgroundColor: '#A5D6A7',
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
