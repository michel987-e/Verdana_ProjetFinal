import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { TextInput } from 'react-native-paper';

export default function Notif() {
  const [token, setToken] = useState<string>('')
  useEffect(() => {
    async function loadNotification() {
      Notifications.requestPermissionsAsync();
      setToken((await Notifications.getDevicePushTokenAsync()).data);
      alert(`Push token: ${token}`);
    }
    loadNotification();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: false,
        shouldShowList: false
      }),
    });
  }, []);

  const sendLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test local',
        body: 'Voici une notification locale !',
      },
      trigger: null,
    });
  };

  return (
    <View>
      <Text>Notification</Text>

      <TextInput
        label="Token"
        value={token}
      />
      <TouchableOpacity
        onPress={sendLocalNotification}
      > 
        <Text>Send notif</Text>
      </TouchableOpacity>
    </View>
  );
}