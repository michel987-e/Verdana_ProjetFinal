import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomNav from './components/BottomNav';

const plantsData = [
  {
    id: '1',
    name: 'plante1',
    
    image: require('./assets/images/favicon.png'),
  },
  {
    id: '2',
    name: 'plante2',
    
    image: require('./assets/images/verdana.png'),
  },
  {
    id: '3',
    name: 'plante3',
    
    image: require('./assets/images/verdana.png'), 
  },
  {
    id: '4',
    name: 'plante4',
    
    image: require('./assets/images/verdana.png'), 
  },
];

export default function Info({ navigation }: any) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1700,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const renderPlantItem = ({ item }: { item: typeof plantsData[0] }) => (
    <TouchableOpacity style={styles.plantCard} onPress={() => navigation.navigate('plante3', { plantId: item.id })}>
      <Image source={item.image} style={styles.plantImage} />
      <View style={styles.plantDetails}>
        <Text style={styles.plantName}>{item.name}</Text>
              </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mes plantes</Text>
          
        </View>
        
        <FlatList
          data={plantsData}
          renderItem={renderPlantItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.plantList}
        />

        <BottomNav navigation={navigation} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C5530',
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
  activeNavItem: {
  },
  addButton: {
  width: 24,
  height: 44,
  backgroundColor: '#abdfab',
  borderRadius: 22,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 2,
},
})