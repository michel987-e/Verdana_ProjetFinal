import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  const logoPosition = useRef(new Animated.Value(height)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(logoPosition, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 1000);

    setTimeout(() => {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    setTimeout(() => {
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2500);

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Home');
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const backgroundInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2C5530', '#FAFAFA'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundInterpolate, opacity: fadeAnim }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ translateY: logoPosition }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[ styles.welcomeTextContainer, { opacity: welcomeOpacity, transform: [{ translateY: welcomeOpacity.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}>    
      <Text style={styles.welcomeText}>Bienvenue sur Verdana</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C5530',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});