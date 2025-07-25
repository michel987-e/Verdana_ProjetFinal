import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, PermissionsAndroid, StatusBar } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';


import { Platform } from 'react-native';

const getWSHost = () => {
  return Platform.OS === 'ios' || Platform.OS === 'android'
    ? '192.168.0.16'
    : 'localhost';
};
const host = getWSHost();

export default function PlanteScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<{ temp?: number; hum?: number; lux?: number }>({});
  const [showMenu, setShowMenu] = useState(false);
  const [apiData, setApiData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'leaf' | 'settings'>('leaf');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const Stack = createStackNavigator();
  const route = useRoute();
  const plantId = (route.params as { plantId?: string })?.plantId;

  const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;
const host ='192.168.116.197'
  useEffect(() => {
  const interval = setInterval(() => {
    fetch(`http://${host}/data`)
      .then(response => response.json())
      .then(json => {
        console.log(' Données reçues depuis ESP32 :', json);
        setData({
          temp: json.temperature,
          hum: json.humidity,
          lux: json.light
        });
      })
      .catch(err => {
        console.error('Erreur fetch ESP32:', err);
      });
  }, 3000);

  return () => clearInterval(interval);
}, [host]);


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
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission localisation refusée');
          return;
        }
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10
        });
        reverseGeocode(location.coords.latitude, location.coords.longitude);
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
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Réponse non-JSON reçue, utilisation de la ville par défaut');
          fetchWeather('Paris');
          return;
        }
        
        const data = await response.json();
        const city = data.address?.city || data.address?.town || data.address?.village;
        if (city) {
          fetchWeather(city);
        } else {
          console.log('Ville non trouvée, utilisation de la ville par défaut');
          fetchWeather('Paris');
        }
      } catch (err) {
        console.error('Erreur reverse geocoding', err);
        console.log('Utilisation de la ville par défaut en cas d\'erreur');
        fetchWeather('Paris');
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

  function getSensorStatus(type: 'temp' | 'hum' | 'lux', value: number | undefined) {
    if (value === undefined || value === null) return { color: 'gray', label: 'Indisponible' };
    if (type === 'temp') {
      if (value < 15) return { color: 'red', label: 'Trop froid' };
      if (value > 28) return { color: 'red', label: 'Trop chaud' };
      return { color: 'green', label: 'Optimal' };
    }
    if (type === 'hum') {
      if (value < 40) return { color: 'red', label: 'Pas assez' };
      if (value > 80) return { color: 'red', label: 'Trop' };
      return { color: 'green', label: 'Optimal' };
    }
    if (type === 'lux') {
      if (value < 200) return { color: 'red', label: 'Pas assez' };
      if (value > 2000) return { color: 'red', label: 'Trop de lumiere' };
      return { color: 'green', label: 'Optimal' };
    }
    return { color: 'gray', label: 'Indisponible' };
  }

  const BlinkingDot = ({ color }: { color: string }) => {
    const [visible, setVisible] = useState(true);
    
    return (
      <View style={{ alignItems: 'center', height: 18 }}>
        {visible && (
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color, marginBottom: 2 }} />
        )}
      </View>
    );
  };
  const tempStatus = getSensorStatus('temp', data.temp ?? 10);
  const humStatus = getSensorStatus('hum', data.hum ?? 80);
  const luxStatus = getSensorStatus('lux', data.lux?? 500); 

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#232323' : '#FAFAFA'} />
      
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setShowMenu(!showMenu)}
        >
          <Feather name="menu" size={24} color={isDarkMode ? '#FFF' : '#2C5530'} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, isDarkMode && { color: '#FAFAFA' }]}>Dashboard plante</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton} onPress={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <Feather name="sun" size={22} color="#FFD700" />
          ) : (
            <Feather name="moon" size={22} color="#2C5530" />
          )}
        </TouchableOpacity>
      </View>
{/*}
      {showMenu && (
        <TouchableOpacity 
          style={styles.menuOverlay} 
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profil')}>
              <Feather name="user" size={18} color="#2C5530" />
              <Text style={styles.menuText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Securite')}>
              <Feather name="shield" size={18} color="#2C5530" />
              <Text style={styles.menuText}>Sécurité</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Gestion')}>
              <Feather name="settings" size={18} color="#2C5530" />
              <Text style={styles.menuText}>Gestion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
              <Feather name="bell" size={18} color="#2C5530" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Support')}>
              <Feather name="help-circle" size={18} color="#2C5530" />
              <Text style={styles.menuText}>Support</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity 
              style={[styles.menuItem, styles.logoutItem]}
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
              <Feather name="log-out" size={18} color="#E74C3C" />
              <Text style={[styles.menuText, styles.logoutText]}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
*/}
      <View style={styles.weatherSection}>
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Feather name="map-pin" size={16} color="#7F8C8D" />
            <Text style={[styles.locationText, isDarkMode && { color: '#000' }]}>{apiData.name || 'Localisation'}</Text>
          </View>
          
          <View style={styles.weatherContent}>
            {apiData.weather && apiData.weather[0] && (
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png` }}
                style={styles.weatherIcon}
              />
            )}
            <View style={styles.weatherInfo}>
              <Text style={[styles.temperature, isDarkMode && { color: '#000' }]}>
                {apiData.main ? `${kelvinToCelsius(apiData.main.temp)}°` : '--'}
              </Text>
              <Text style={[styles.weatherDescription, isDarkMode && { color: '#000' }]}>
                {apiData.weather && apiData.weather[0] ? apiData.weather[0].description : 'Météo'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sensorsSection}>
        <Text style={{ fontSize: 60, textAlign: 'center', marginBottom: 0 }}>🪴</Text>
        
        <Text style={[styles.sectionTitle, isDarkMode && { color: '#FAFAFA' }]}>État de vos plantes</Text>
        
        <View style={styles.sensorsGrid}>
          <View style={styles.sensorCard}>
            <View style={styles.sensorIconContainer}>
              <MaterialCommunityIcons name="thermometer" size={24} color="#E67E22" />
            </View>
            <Text style={[styles.sensorValue, isDarkMode && { color: '#000' }]}>{data.temp ?? 10}°C</Text>
            <BlinkingDot color={tempStatus.color} />
            <Text style={{ fontSize: 13, color: tempStatus.color, marginBottom: 8 }}>{tempStatus.label}</Text>
            <Text style={[styles.sensorLabel, isDarkMode && { color: '#000' }]}>Température</Text>
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorIconContainer}>
              <MaterialCommunityIcons name="water-percent" size={24} color="#3498DB" />
            </View>
            <Text style={[styles.sensorValue, isDarkMode && { color: '#000' }]}>{data.hum ?? 80}%</Text>
            <BlinkingDot color={humStatus.color} />
            <Text style={{ fontSize: 13, color: humStatus.color, marginBottom: 8 }}>{humStatus.label}</Text>
            <Text style={[styles.sensorLabel, isDarkMode && { color: '#000' }]}>Humidité</Text>
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorIconContainer}>
              <MaterialCommunityIcons name="white-balance-sunny" size={24} color="#F1C40F" />
            </View>
            <Text style={[styles.sensorValue, isDarkMode && { color: '#000' }]}>{data.lux ?? 500}</Text>
            <BlinkingDot color={luxStatus.color} />
            <Text style={{ fontSize: 13, color: luxStatus.color, marginBottom: 8 }}>{luxStatus.label}</Text>
            <Text style={[styles.sensorLabel, isDarkMode && { color: '#000' }]}>Luminosité</Text>
          </View>
        </View>
      </View>
      <View style={styles.sensorGraph}>
        <Text style={[styles.sectionTitle, isDarkMode && { color: '#FAFAFA' }]}>Graphique des capteurs</Text>
        <Text style={{ fontSize: 16, color: '#7F8C8D', textAlign: 'center', marginBottom: 16 }}>
          (Graphique à venir bouton voir plus ?)
        </Text>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  containerDark: {
    backgroundColor: '#232323',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  headerDark: {
    backgroundColor: '#232323',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C5530',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1000,
  },
  menuContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#2C5530',
    marginLeft: 12,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 8,
  },
  logoutItem: {
    marginTop: 4,
  },
  logoutText: {
    color: '#E74C3C',
  },
  weatherSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  weatherInfo: {
    flex: 1,
  },
  temperature: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2C5530',
    marginBottom: 4,
  },
  weatherDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textTransform: 'capitalize',
  },
  sensorsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C5530',
    marginBottom: 16,
  },
  sensorsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sensorCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sensorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C5530',
    marginBottom: 4,
  },
  sensorLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  sensorGraph: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sensorGraphTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C5530',
    marginBottom: 16,
  },
});
