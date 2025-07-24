import React, { useRef, useEffect, useState, useCallback,  } from "react";
import { PermissionsAndroid } from "react-native";
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import flowerImage from "../assets/images/flower.png";
import addButtonImage from "../assets/images/add_button.png";
import { Feather } from "@expo/vector-icons";
import { IFlower, IUser } from "interfaces";
import { getUserById } from "services/userService";
import { validateToken } from "services/authService";
import { useFocusEffect } from "@react-navigation/native";
import { getAllFlower, getFlowerByUserID } from "services/flowerService";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;
const ITEM_SPACING = 10;

const DATA = [
  { key: "left-spacer" },
  { key: "1", title: flowerImage },
  { key: "2", title: flowerImage },
  { key: "3", title: flowerImage },
  { key: "add-button", title: addButtonImage },
  { key: "right-spacer" },
];

export default function Home({ navigation }: any) {

  const [userData, setUserData] = useState<IUser>();
  const [flowers, setFlowers] = useState<IFlower[]>();

  const fetchUser = async () => {
    try {
      const data = await validateToken();
      const user = await getUserById(data.payload.sub);
      setUserData(user);
    } catch (err) {
      navigation.navigate('Login');
    }
  };
  
  const fetchFlowers = async () => {
    try {
      const flowers = await getFlowerByUserID(userData!.id);
      setFlowers(flowers);
      console.log("Flowers fetched successfully:", flowers);
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchFlowers();
    }, [])
  );

// api meteo

    const [apiData, setApiData] = useState<any>({});
    const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;

  

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

  
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const weather = apiData.weather;
  const bannerWidth = width * 2;

  useEffect(() => {
    const animate = () => {
      scrollAnim.setValue(width);
      Animated.timing(scrollAnim, {
        toValue: -bannerWidth,
        duration: 13000, 
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, []);
// bouton Notification et chatbot
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.headerIconsContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("ChatBot")}
        >
          <Feather name="zap" size={20} color="#2C5530" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Feather name="bell" size={20} color="#2C5530" />
        </TouchableOpacity>
      </View>
{/* animation meteo  */}
      <View style={styles.weatherBannerContainer}>
        <Animated.View
          style={[
            styles.weatherBannerContent,
            {
              transform: [{ translateX: scrollAnim }],
            },
          ]}
        >
          <Text style={styles.weatherText}>{weather}</Text>
        </Animated.View>
      </View>
{/* animation / carousel des cartes  */}
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          if (!item.title) {
            return <View style={{ width: SPACER_WIDTH }} />;
          }

          const inputRange = [
            (index - 2) * (ITEM_WIDTH + ITEM_SPACING),
            (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
            index * (ITEM_WIDTH + ITEM_SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: ["15deg", "0deg", "-15deg"],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
            extrapolate: "clamp",
          });
// carte bouton plus
          if (item.key === "add-button") {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("AddPlante")}>
                <Animated.View
                  style={[
                    styles.card,
                    {
                      transform: [
                        { perspective: 1000 },
                        { scale },
                        { rotateY },
                        { translateY },
                      ],
                    },
                  ]}
                >
                  <Image source={item.title} style={styles.cardImage} resizeMode="cover" />
                </Animated.View>
              </TouchableOpacity>
            );
          }
// carte des pots
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Plante")}>
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [
                      { perspective: 1000 },
                      { scale },
                      { rotateY },
                      { translateY },
                    ],
                  },
                ]}
              >
                <Image source={item.title} style={styles.cardImage} resizeMode="cover" />
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />

{/* barre de navigation en bas */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Feather name="home" size={24} color="#2C5530" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Parametres")}>
          <Feather name="settings" size={24} color="#2C5530" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
// css
const styles = StyleSheet.create({
  weatherBannerContainer: {
    height: 50,
    backgroundColor: "#e6f4ea",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 80, 
    marginBottom: 40, 
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherBannerContent: {
    flexDirection: "row",
    width: width * 2,
  },
  weatherText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2C5530",
    paddingLeft: 10,
  },
  notificationIconContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F7E9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    height: 250,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 24,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
  width: "100%",
  height: "100%",
  borderRadius: 20,
  },
  headerIconsContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F7E9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
