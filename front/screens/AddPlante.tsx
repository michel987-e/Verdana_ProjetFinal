import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

const PLANTS = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    image: require('../assets/images/verdana.png'),
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    image: require('../assets/images/verdana.png'),
  },
  {
    id: '3',
    name: 'Snake Plant',
    image: require('../assets/images/verdana.png'),
  },
  {
    id: '4',
    name: 'ZZ Plant',
    image: require('../assets/images/verdana.png'),
  },
];


export default function AddPlante({ navigation }: any) {
  const [search, setSearch] = useState('');
  const filteredPlants = PLANTS.filter(plant =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <Feather name="arrow-left" size={24} color="#232323" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter une nouvelle plante</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Rechercher une plante..."
          onChangeText={setSearch}
          value={search}
          style={{ margin: 10, borderRadius: 16, backgroundColor: '#F4F4F4', elevation: 0 }}
          inputStyle={{ fontSize: 16 }}
        />
      </View>
      <Text style={styles.sectionTitle}>Populaire</Text>
      <FlatList
        data={filteredPlants}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Info', { plantId: item.id })}>
              <Image source={item.image} style={styles.plantImage} />
              </TouchableOpacity>
            </View>
            <Text style={styles.plantName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232323',
  },
  searchbarContainer: {
    margin: 20,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    elevation: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232323',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    margin: 8,
    flex: 1,
    minWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  imageWrapper: {
    borderRadius: 50,
    width: 90,
    height: 90,
    backgroundColor: '#E6F2E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#C2E0C6',
  },
  plantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  plantName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2C5530',
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 0,
  },
});