import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import Home from '../screens/Home';
import Plante from '../screens/plante3';
import Profil from '../screens/Profil';
import Deconnexion from '../screens/Deconnexion';
import Securite from '../screens/Securite';
import Gestion from '../screens/Gestion';
import Notifications from '../screens/Notifications';
import Support from '../screens/Support';  
import InscriptionScreen from '../screens/InscriptionScreen';
import GuestWelcome from '../screens/Info';
import Info from '../screens/Info';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
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
        </Stack.Navigator>
    );
}