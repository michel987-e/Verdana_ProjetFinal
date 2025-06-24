import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Support() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Support</Text>
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.contactText}>Nous contacter</Text>
        <View style={styles.underline} />
      </View>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
    margin: 8,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  headerBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#232323',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 48,
  },
  contactText: {
    fontSize: 28,
    color: '#232323',
    marginBottom: 8,
  },
  underline: {
    width: 180,
    height: 1,
    backgroundColor: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  
  
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FDF8E3',
    marginLeft: 300,
  },
});