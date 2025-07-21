import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

import Home from '../screens/Home';
import Profil from '../screens/Profil';
import Parametres from '../screens/Parametres';
import UpdateAccount from '../screens/UpdateAccount';

import Plante from '../screens/plante3';
import Securite from '../screens/Securite';
import Notif from '../screens/Notifications';
import Support from '../screens/Support';  
import AddPlante from '../screens/AddPlante';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Parametres" component={Parametres} />
            <Stack.Screen name="Profil" component={Profil} options={{ headerShown: true }}/>
            <Stack.Screen name="UpdateAccount" component={UpdateAccount} options={{ headerShown: true }}/>

            <Stack.Screen name="plante3" component={Plante} />
            <Stack.Screen name="Securite" component={Securite} />
            <Stack.Screen name="Notif" component={Notif} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="AddPlante" component={AddPlante} />
        </Stack.Navigator>
    );
}