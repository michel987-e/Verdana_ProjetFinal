import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getFlowerByUserID } from "services/flowerService";
import { validateToken } from "services/authService";
import { getUserById } from "services/userService";
import flowerImage from '../assets/images/flower.png';
import addButtonImage from "../assets/images/add_button.png";
import { IFlower } from "interfaces";
import * as Location from "expo-location";
import { Platform, PermissionsAndroid } from "react-native";
import Constants from 'expo-constants';


const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;
const ITEM_SPACING = 10;

export default function Home({ navigation }: any) {
  const [flowers, setFlowers] = useState<IFlower[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const bannerWidth = width * 2;

// recupere les plante

  const fetchFlowers = async (userId: number) => {
    try {
      const userFlowers = await getFlowerByUserID(userId);
      console.log(" Fleurs récupérées :", userFlowers);

      const enrichedFlowers = userFlowers.map((f: IFlower) => ({
        ...f,
        image: flowerImage,
      }));

      setFlowers(enrichedFlowers);
    } catch (error) {
      console.error("Erreur fetchFlowers", error);
    }
  };

// api user / flower

useFocusEffect(
  useCallback(() => {
    const loadData = async () => {
      try {
        const tokenData = await validateToken();
        const user = await getUserById(tokenData.payload.sub);
        setUserData(user);

        const flowers = await getFlowerByUserID(user.id);
        console.log(" Fleurs récupérées :", flowers);

        const enrichedFlowers = flowers.map((f: IFlower) => ({
          ...f,
          image: flowerImage,
        }));

        setFlowers(enrichedFlowers);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        navigation.navigate("Login");
      }
    };

    loadData();
  }, [navigation])
);

  useEffect(() => {
    if (userData?.id) {
      fetchFlowers(userData.id);
    }
  }, [userData]);

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

// api meteo


  const [apiData, setApiData] = useState<any>(null); 
  const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;
  const [weather, setWeather] = useState("Météo ici...");

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

// info affichage meteo

    useEffect(() => {
      if (!apiData || !apiData.main || !apiData.weather) return;

      const tempC = (apiData.main.temp - 273.15).toFixed(1);
      const condition = apiData.weather[0].description;

      setWeather(`🌡️ ${tempC}°C - ${condition}`);
    }, [apiData]);

type CarouselItem = {
  key: string;
  image?: number;
  title?: string;
};

  const carouselData: CarouselItem[] = [
    { key: "left-spacer" },
    ...flowers.map((flower) => ({
      key: flower.id.toString(),
      title: flower.name,
      image: flower.image,
    })),
    { key: "add-button", image: addButtonImage },
    { key: "right-spacer" },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* météo bandeau */}
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

      {/* carrousel animée*/}
      <Animated.FlatList
        data={carouselData}
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
          console.log("Item rendu :", item);

          if (!item.image) {
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
// bouton add
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
                  <Image source={item.image} style={styles.cardImage} />
                </Animated.View>
              </TouchableOpacity>
            );
          }
// bouton cards pots
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
                <Image source={item.image} style={styles.cardImage} />
                {item.title && <Text style={styles.title}>{item.title}</Text>}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
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
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    height: 250,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C5530",
  },
});
