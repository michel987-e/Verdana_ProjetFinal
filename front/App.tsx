import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './services/firebase';
import { sendTokenToBackend } from './services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  }),
});

export default function App() {
  useEffect(() => {
    (async () => {
      const fcmToken = await registerForPushNotificationsAsync();
      
      if (fcmToken) {
        console.log('Token FCM obtenu :', fcmToken);
        await sendTokenToBackend(fcmToken);
      } else {
        console.warn('Aucune permission de notification ou token FCM vide');
      }

      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification reçue :', notification);
      });

      return () => subscription.remove();
    })();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}
