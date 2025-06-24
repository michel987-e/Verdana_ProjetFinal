import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Plante from './plante3';
import Profil from './Profil';
import Deconnexion from './Deconnexion';
import Securite from './Securite';
import Gestion from './Gestion';
import Notifications from './Notifications';
import Support from './Support';
const Stack = createStackNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
<Text>Open up App.tsx to start working on your app!</Text>
      <View style={styles.buttonRow}>
        <Button title="Connexion" onPress={() => alert('abababbaba')} />
        <Button title="Plante" onPress={() => navigation.navigate('plante3')} />
        <Button title="Support" onPress={() => alert('bahahaha !')} />
          
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="plante3" component={Plante} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Securite" component={Securite} />
        <Stack.Screen name="Gestion" component={Gestion} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Support" component={Support} />
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
