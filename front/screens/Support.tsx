import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';


export default function Support({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#232323" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Contactez-nous</Text>

      <TouchableOpacity style={styles.contactItem}>
        <View style={styles.iconContainer}>
          <Feather name="mail" size={24} color="#2C5530" />
        </View>
        <View>
          <Text style={styles.contactItemTitle}>Email</Text>
          <Text style={styles.contactItemSubtitle}></Text>
        </View>
      </TouchableOpacity>



      <Text style={styles.sectionTitle}>Tutoriel</Text>
          {/*un tuto a voir*/}
      <TouchableOpacity style={styles.tutorialItem} onPress={() => alert('Voir le tutoriel')}>
        <View style={styles.iconContainer}>
          <Feather name="play-circle" size={24} color="#2C5530" />
        </View>
        <Text style={styles.tutorialItemText}></Text>
        <Feather name="chevron-right" size={20} color="#7F8C8D" />
      </TouchableOpacity>

    </ScrollView>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232323',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
  contactItemSubtitle: {
    fontSize: 14,
    color: '#2C5530',
  },
  tutorialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tutorialItemText: {
    flex: 1,
    fontSize: 16,
    color: '#232323',
    marginLeft: 15,
  },
});