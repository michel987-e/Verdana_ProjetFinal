import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}

