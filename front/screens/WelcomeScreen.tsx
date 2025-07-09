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
  const textBlockPosition = useRef(new Animated.Value(0)).current;
  const textBlockOpacity = useRef(new Animated.Value(1)).current;
  const textBlockAppearOpacity = useRef(new Animated.Value(0)).current;

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
      Animated.timing(textBlockAppearOpacity, {
        toValue: 1,
        duration: 1200,
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
        Animated.timing(textBlockOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textBlockPosition, {
          toValue: 80,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace('Login');
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
      <Animated.Text
        style={[
          styles.brand,
          {
            opacity: welcomeOpacity,
            position: 'absolute',
            top: 60,
            alignSelf: 'center',
            zIndex: 20,
            fontSize: 32,
          },
        ]}
      >
        Verdana
      </Animated.Text>
      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.potContainer,
            {
              transform: [
                { translateY: logoPosition },
                { scale: logoScale },
              ],
            },
          ]}
        >
          <Image
            source={require('../assets/images/verdana.png')}
            style={styles.potImage}
            resizeMode="contain"
          />
          <View style={[styles.bubble, styles.bubbleSun]}><Text style={styles.bubbleText}>Sun Light</Text></View>
          <View style={[styles.bubble, styles.bubbleWater]}><Text style={styles.bubbleText}>Water Level</Text></View>
          <View style={[styles.bubble, styles.bubbleHumidity]}><Text style={styles.bubbleText}>Humidity Level</Text></View>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.textBlockBottom,
          {
            opacity: Animated.multiply(textBlockOpacity, textBlockAppearOpacity),
            transform: [
              { translateY: textBlockPosition },
            ],
          },
        ]}
      >
        <Text style={styles.smartCare}><Text style={styles.smart}>Smart Care</Text> for</Text>
        <Text style={styles.blossoms}>Blossoms</Text>
        <Text style={styles.sloganHome}>Easily monitor and care for your plants{"\n"}with real-time updates.</Text>
      </Animated.View>
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
  
  brand: {
    color: '#fff',
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
  potContainer: {
     position: 'absolute',
  top: 200,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  potImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'transparent',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubbleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4e7d5a',
  },
  bubbleSun: {
    left: -60,
    top: 30,
    backgroundColor: '#f7f7d4',
  },
  bubbleWater: {
    right: -60,
    top: 30,
    backgroundColor: '#d4eafd',
  },
  bubbleHumidity: {
    left: 10,
    bottom: -18,
    backgroundColor: '#e6f7e7',
  },
  textBlockBottom: {
    position: 'absolute',
    bottom: 250,
    left: 0,
    right: 0,
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  textBlock: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
  },
  smartCare: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  smart: {
    color: '#fff',
    fontWeight: 'bold',
  },
  blossoms: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  sloganHome: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 22,
  },
});