// Plante.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Plante() {
  const [data, setData] = useState<{ temp?: number; hum?: number; lux?: number }>({});

  useEffect(() => {
    const ws = new WebSocket('ws://10.1.254.4:8080');

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
      <Text style={styles.title}>Données de la plante</Text>
      <Text>Température : {data.temp} °C</Text>
      <Text>Humidité : {data.hum} %</Text>
      <Text>Luminosité : {data.lux} lux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
