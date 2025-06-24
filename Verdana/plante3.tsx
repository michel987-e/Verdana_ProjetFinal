// Plante.tsx
import React, { useEffect, useState } from 'react';
import { Alert,View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, PermissionsAndroid, Platform } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';



export default function PlanteScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<{ temp?: number; hum?: number; lux?: number }>({});
  const [showMenu, setShowMenu] = useState(false);
  const [apiData, setApiData] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'leaf' | 'settings'>('leaf');
    const Stack = createStackNavigator();


  const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;

  useEffect(() => {
    console.log('API KEY (expoConfig.extra):', apiKey);
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
    ws.onclose = () => {};
    return () => ws.close();
  }, []);

  useEffect(() => {
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
        console.log("API KEY:", apiKey);
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
      } catch (err) {
        console.error('Erreur fetchWeather', err);
      }
    };
    getLocation();
  }, []);

  const kelvinToCelsius = (k: any) => {
    return (k - 273.15).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.userIconContainer} onPress={() => setShowMenu(!showMenu)}>
          <View style={styles.userIconBorder}>
            <FontAwesome name="user" size={28} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard Plante</Text>
        <TouchableOpacity style={styles.bellIconContainer}>
          <Feather name="bell" size={26} color="#232323" />
        </TouchableOpacity>
      </View>
      {showMenu && (
        <View style={styles.menuBox}>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('Profil')}>Profil utilisateur</Text>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('Securite')}>Profil utilisateur</Text>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('Gestion')}>Gestion</Text>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>Profil utilisateur</Text>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('Support')}>Profil utilisateur</Text>
          <Text
  style={styles.menuItem}
  onPress={() => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Oui", onPress: () => navigation.navigate('Home') }
      ]
    );
  }}
>
  Deconnexion
</Text>

        </View>
      )}
      <View style={styles.weatherBox}>
        {apiData.weather && apiData.weather[0] && (
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png` }}
            style={{ width: 48, height: 48, marginRight: 12 }}
          />
        )}
        <View style={styles.weatherInfoCol}>
          <Text style={styles.weatherTitle}>Meteo du jour</Text>
          <Text style={styles.weatherTemp}>
            {apiData.main ? `${kelvinToCelsius(apiData.main.temp)}°C` : '--'}
          </Text>
          <Text style={styles.weatherCity}>
            {apiData.name || '--'}
          </Text>
        </View>
        
      </View>
      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="thermometer" size={28} color="#e67e22" />
          <Text style={styles.cardValue}>{data.temp ?? '--'}°C</Text>
          <Text style={styles.cardLabel}>Température</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="water-percent" size={28} color="#3498db" />
          <Text style={styles.cardValue}>{data.hum ?? '--'}%</Text>
          <Text style={styles.cardLabel}>Humidité</Text>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="white-balance-sunny" size={28} color="#f1c40f" />
          <Text style={styles.cardValue}>{data.lux ?? '--'}</Text>
          <Text style={styles.cardLabel}>Lumière</Text>
        </View>
      </View>
      {/*<View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => setActiveTab('leaf')}
        >
          <FontAwesome
            name="leaf"
            size={22}
            color={activeTab === 'leaf' ? "#4a90e2" : "#b8b0ad"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => setActiveTab('settings')}
        >
          <FontAwesome
            name="cog"
            size={22}
            color={activeTab === 'settings' ? "#4a90e2" : "#b8b0ad"}
          />
        </TouchableOpacity>
      </View>*/}
    </SafeAreaView>
    
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  triangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 180,
    borderBottomWidth: 120,
    borderLeftColor: 'transparent',
    borderBottomColor: '#e6f0fa',
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#232323',
    letterSpacing: 0.5,
  },
  userIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  userIconBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#232323',
    borderWidth: 2,
    borderColor: '#b8b0ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  menuBox: {
    position: 'absolute',
    top: 70,
    left: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    zIndex: 20,
  },
  menuItem: {
    fontSize: 16,
    color: '#232323',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  weatherBox: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  weatherInfoCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 4,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
    marginBottom: 2,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 0,
  },
  weatherCity: {
    fontSize: 15,
    color: '#232323',
    marginTop: 2,
  },
  weatherBtn: {
    marginLeft: 'auto',
    backgroundColor: '#e6f0fa',
    borderRadius: 16,
    padding: 8,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 32,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: '#b8b0ad',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
   
    elevation: 8,
  },
  footerBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
