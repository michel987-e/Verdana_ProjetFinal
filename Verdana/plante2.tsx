// Plante.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, PermissionsAndroid, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function plante2() {
  const [data, setData] = useState<{ temp?: number; hum?: number; lux?: number }>({});
  const [showMenu, setShowMenu] = useState(false);
  const [apiData, setApiData] = useState<any>({});
  const [getState, setGetState] = useState('tamilnadu');
  const [state, setState] = useState('tamilnadu');

  // API KEY AND URL
  const apiKey = "9ab10294789d0d8f37d31c431cfecb3e";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

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

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  React.useEffect(() => {
    const getLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission localisation refusée');
            return;
          }
        }
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            reverseGeocode(latitude, longitude);
          },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } catch (err) {
        console.error('Erreur getLocation', err);
      }
    };
    const reverseGeocode = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village;
        if (city) {
          fetchWeather(city);
        }
      } catch (err) {
        console.error('Erreur reverse geocoding', err);
      }
    };
    const fetchWeather = async (cityName: string) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setApiData(data);
        setState(cityName);
      } catch (err) {
        console.error('Erreur fetchWeather', err);
      }
    };
    getLocation();
  }, []);

  const kelvinToFarenheit = (k: any) => {
    return (k - 273.15).toFixed(2);
  };

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
        <View style={{ marginTop: 20, alignItems: 'center', width: '100%' }}>
          <View
            style={{
              marginTop: 20,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 16,
              alignItems: 'center',
            }}
          >
            {apiData.main ? (
              <View style={{ alignItems: 'center' }}>
                {apiData.weather && apiData.weather[0] && (
                  <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png` }}
                    style={{ width: 80, height: 80, marginBottom: 8 }}
                  />
                )}
                <Text style={{ fontSize: 32, fontWeight: 'bold', marginVertical: 8 }}>
                  {kelvinToFarenheit(apiData.main.temp)}° C
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 8 }}>
                  {apiData.name}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>
                      Min: {kelvinToFarenheit(apiData.main.temp_min)}° C
                    </Text>
                    <Text>
                      Max: {kelvinToFarenheit(apiData.main.temp_max)}° C
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>
                      {apiData.weather && apiData.weather[0] && apiData.weather[0].main}
                    </Text>
                    <Text>
                      {apiData.sys && apiData.sys.country}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text>Loading</Text>
            )}
          </View>
          <View style={{ marginTop: 16 }}>
            
          </View>
        </View>
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
    backgroundColor: '#444444',
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
    fontSize: 40,
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
