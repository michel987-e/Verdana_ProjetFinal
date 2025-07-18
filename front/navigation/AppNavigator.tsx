import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Home from '../screens/Home';
import ChatbotScreen from "../screens/chatbot";
import Plante from '../screens/plante3';
import Profil from '../screens/Profil';
import Securite from '../screens/Securite';
import Gestion from '../screens/Gestion';
import Notifications from '../screens/Notifications';
import Support from '../screens/Support';  
import AddPlante from '../screens/AddPlante';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="plante3" component={Plante}  />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Securite" component={Securite} />
            <Stack.Screen name="Gestion" component={Gestion} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="AddPlante" component={AddPlante} options={{ headerShown: false }} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: "Chatbot" }} />
        </Stack.Navigator>
    );
}