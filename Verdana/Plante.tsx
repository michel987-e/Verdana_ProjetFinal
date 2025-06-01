// Plante.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



export default function Plante() {
  const [data, setData] = useState<{ temp?: number; hum?: number; lux?: number }>({});
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.16:8080');

    ws.onmessage = event => {
      try {
        const incomingData = JSON.parse(event.data);
        setData(incomingData);
      } catch (e) {
        console.error('Erreur de parsing WebSocket :', e);
      }
    };

    ws.onerror = err => {
      console.error('Erreur WebSocket', err);
    };

    ws.onclose = () => {
    };

    return () => ws.close();
  }, []);

  return (
    <View style={styles.container}>
<TouchableOpacity style={styles.userIconContainer} onPress={() => setShowMenu(!showMenu)}>
  <View style={styles.userIconBorder}>
    <FontAwesome name="user" size={36} color="white" />
  </View>
</TouchableOpacity>
      {showMenu && (
        <View style={styles.menuBox}>
          <Text style={styles.menuItem}>c'est ...</Text>
         
        </View>
      )}
      <View style={styles.topContent}>
        <Text style={styles.title}>Données de la plante</Text>
        <Text style={styles.name}>Nom Pot</Text>
        <Text>meteo du jour</Text>
      </View>
      <View style={styles.values}>
        <Text>Température : {data.temp} °C</Text>
        <Text>Humidité : {data.hum} %</Text>
        <Text>Luminosité : {data.lux} lux</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '',
  },
  topContent: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  values: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
 
  
  userIconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 20,
  },
  userIconBorder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#232323',
    borderWidth: 3,
    borderColor: '#b8b0ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBox: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  menuItem: {
    fontSize: 16,
    color: '#232323',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
