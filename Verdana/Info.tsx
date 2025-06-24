import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Info({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bonjour</Text>
      <Text style={styles.subtitle}>liste de plante</Text>
      <TouchableOpacity onPress={() => navigation.navigate('plante3')}>
        <Image
          source={require('./assets/images/verdana.png')}
          style={styles.flower}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.info}>Touchez la fleur pour en savoir plus !</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => alert('nouvelll page ')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C5530',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#2C5530',
    marginBottom: 20,
  },
  flower: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#2C5530',
    marginTop: 10,
  },
  addButton: {
    marginTop: 40,
    backgroundColor: '#2C5530',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 