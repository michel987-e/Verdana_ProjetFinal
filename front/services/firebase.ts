import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  const finalStatus = existingStatus === 'granted'
    ? existingStatus
    : (await Notifications.requestPermissionsAsync()).status;

  if (finalStatus !== 'granted') {
    alert('Permission refusée pour les notifications');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
