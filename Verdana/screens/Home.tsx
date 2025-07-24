import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { FlatList, Dimensions, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function Home({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

const renderItem = ({ item, index }: any) => {
  if (item.addCard) {
    return (
      <View style={[styles.card, styles.addCard]}>
        <TouchableOpacity onPress={() => alert('Ajouter une carte')}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </Animated.View>
  );
};

<Animated.FlatList
  data={data}
  keyExtractor={(item) => item.id}
  horizontal
  showsHorizontalScrollIndicator={false}
  snapToInterval={ITEM_WIDTH}
  decelerationRate="fast"
  bounces={false}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  )}
  contentContainerStyle={{ paddingHorizontal: SPACER }}
  renderItem={renderItem}
/>


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
    alert(`Connexion tentée avec ${email} et ${password}`);
  };
/*
const handleLogin = async () => {
  try {
    const response = await fetch('https:/localhost/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      // Connexion réussie
      navigation.navigate('Info');
    } else {
      alert('Email ou mot de passe incorrect');
    }
  } catch (error) {
    alert('Erreur de connexion');
  }
};*/
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

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#2C5530"24
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
  guestButton: {
    backgroundColor: '#2C5530',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 20,
  },
  guestButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },

  card: {
  width: ITEM_WIDTH,
  height: 200,
  borderRadius: 20,
  backgroundColor: '#DFFFD6',
  marginHorizontal: 10,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 10,
},
cardTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#2C5530',
},
addCard: {
  backgroundColor: '#B8E986',
},
addText: {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#2C5530',
}

});