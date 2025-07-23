import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;
const ITEM_SPACING = 10;

const DATA = [
  { key: "left-spacer" },
  { key: "1", title: "..a/assets/images/flower.png" },
  { key: "2", title: "../assets/images/verdana.png" },
  { key: "3", title: "../assets/images/verdana.png" },
  { key: "right-spacer" },
];

export default function Home({ navigation }: any ) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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

          return (
            <TouchableOpacity onPress={() => navigation.navigate('plante3')}>
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
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}> 
          <Feather name="home" size={24} color="#2C5530" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Parametres')}> 
          <Feather name="settings" size={24} color="#2C5530" />
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    height: 250,
    borderRadius: 20,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  plantList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  plantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  plantDetails: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5530',
  },
  plantInfo: {
    fontSize: 14,
    color: '#2C5530',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 