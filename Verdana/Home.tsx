import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-40)).current;

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
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    alert(`Connexion tentée avec ${email} et ${password}`);
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
      <Text style={styles.welcomeTitle}>Bienvenue</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#1B3A2B"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => {
        }}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Mot de passe"
          placeholderTextColor="#1B3A2B"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
          accessibilityLabel={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#2C5530" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.signUpText}>Vous n'avez pas de compte? Inscrivez-vous</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.guestButtonText}>Continuer en tant qu'invite</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0E6BA',
    paddingHorizontal: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#013237',
    letterSpacing: 0.5,
  },
  input: {
    width: '85%',
    backgroundColor: '#fff', 
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    color: '#013237',
    borderWidth: 1,
    borderColor: '#B6E2C6',
    shadowColor: '#2C5530',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  loginButton: {
    width: '85%',
    backgroundColor: '#2C5530',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#2C5530',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signUpText: {
    color: '#2C5530',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 30,
    fontWeight: '500',
  },
  guestButton: {
    backgroundColor: '#013237',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#2C5530',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  errorText: {
    color: '#B00020',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 18,
    top: 15,
    padding: 4,
  },
});