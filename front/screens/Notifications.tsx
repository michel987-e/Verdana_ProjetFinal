import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { TextInput } from 'react-native-paper';
import { pushToken } from '../services/recommendationService';
import { IUser } from '../interfaces';
import { validateToken } from '../services/authService';
import { getUserById } from '../services/userService';
import { useFocusEffect } from '@react-navigation/native';

export default function Notif({ navigation }: any) {
  const [token, setToken] = useState<string>('')
  const [userData, setUserData] = useState<IUser>();

  const fetchUser = async () => {
    try {
      const data = await validateToken();
      const user = await getUserById(data.payload.sub);
      setUserData(user);
    } catch (err) {
      navigation.navigate('Login');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  useEffect(() => {
    async function loadNotification() {
      Notifications.requestPermissionsAsync();
      setToken((await Notifications.getDevicePushTokenAsync()).data);
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
    pushToken(userData!.id, (await Notifications.getDevicePushTokenAsync()).data);
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