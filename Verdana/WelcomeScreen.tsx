import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Text, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  const logoPosition = useRef(new Animated.Value(height)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoHalo = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [haloBg, setHaloBg] = useState('#b6e2c6');

  useEffect(() => {
    Animated.spring(logoPosition, {
      toValue: 0,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(logoScale, { toValue: 1.1, duration: 400, useNativeDriver: true }),
        Animated.timing(logoScale, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    }, 1200);

    setTimeout(() => {
      Animated.timing(logoHalo, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
    }, 800);

    setTimeout(() => {
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 1000);

    setTimeout(() => {
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    setTimeout(() => {
      setHaloBg('transparent');
    }, 1500);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(welcomeOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 0.7,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(logoPosition, {
          toValue: height,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(logoHalo, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
      ]).start(() => {
        navigation.replace('Home');
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const backgroundInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FAFAFA', '#74a860'],
  });

  const haloScale = logoHalo.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] });
  const haloOpacity = logoHalo.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.05] });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundInterpolate }]}>  
      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.halo,
            {
              opacity: haloOpacity,
              backgroundColor: haloBg,
              shadowColor: '#74a860',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 24,
              transform: [
                { scale: haloScale },
                { translateY: logoPosition },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.logoContainer,
            {
              borderRadius: 80,
              padding: 18,
              transform: [
                { translateY: logoPosition },
                { scale: logoScale },
              ],
            },
          ]}
        >
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.welcomeTextContainer,
            {
              opacity: welcomeOpacity,
              transform: [
                {
                  translateY: welcomeOpacity.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.welcomeText}>Bienvenue sur Verdana</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  halo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    zIndex: 1,
    alignSelf: 'center',
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
    color: '#232323',
    letterSpacing: 1,
    textShadowColor: 'rgba(44,85,48,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brand: {
    color: '#2C5530',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  slogan: {
    marginTop: 10,
    fontSize: 16,
    color: '#4e7d5a',
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});