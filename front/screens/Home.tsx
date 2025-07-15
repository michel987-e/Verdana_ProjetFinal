import React, { useState, useRef, useEffect } from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const SPACING = 20;


const carouselData = [
  { id: '1', image: require('../assets/images/verdana.png') },
  { id: '2', image: require('../assets/images/verdana.png') },
  { id: '3', image: require('../assets/images/verdana.png') },
  { id: 'add', isAddButton: true },
];



export default function Home({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

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

      <Animated.FlatList
        data={carouselData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ perspective: 1000 }, { scale }],
                  opacity,
                },
              ]}
            >
              {item.isAddButton ? (
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}></Text>
                </TouchableOpacity>
              ) : (
                <Animated.Image
                  source={item.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              )}
            </Animated.View>
          );
        }}
      />
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
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.6,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  addButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 48,
    color: '#28B463',
  },
});