import 'react-native-gesture-handler'
import { View, Button, StyleSheet,  Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './src/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
       <Button title="se connecter" onPress={() => navigation.navigate('Explore')} />
        <Button title="s'inscrire" onPress={() => navigation.navigate('Explore')} />
       <Image
  source={require('../../assets/images/verdana.png')}
  style={{ width: 200, height: 200, top: -270,}}
  
/>
  <View style={styles.transparentBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   transparentBox: {
    width: 200,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#008000',
    borderRadius: 10,
    top: -50,
  },
});
