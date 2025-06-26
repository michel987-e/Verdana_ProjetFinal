import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import Home from './Home';
import Plante from './plante3';
import Profil from './Profil';
import Deconnexion from './Deconnexion';
import Securite from './Securite';
import Gestion from './Gestion';
import Notifications from './Notifications';
import Support from './Support';  
import InscriptionScreen from './InscriptionScreen';
import GuestWelcome from './Info';
import Info from './Info';
import AddPlante from './AddPlante';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
        <Stack.Screen name="plante3" component={Plante}  />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Securite" component={Securite} />
        <Stack.Screen name="Gestion" component={Gestion} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="AddPlante" component={AddPlante} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 40,
    left: 0,
    paddingHorizontal: 20,
  },
});
