import 'react-native-gesture-handler';
import { View, Button, StyleSheet,  Image, Text, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './src/types';
import React, { useState } from 'react';

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

export default function   ExploreScreen() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
   const [email, setEmail] = useState<string>('');
    const [mdp, setmdp] = useState<string>('');

  return (
    <View style={styles.container}>
       
        <Text style={styles.label}>Email :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Entrez votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.text}>Email saisi : {email}</Text>


      <Text style={styles.label}>mots de passe :</Text>
      <TextInput
        style={styles.input}
        value={mdp}
        onChangeText={setmdp}
        placeholder="Entrez votre mots de passe"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.text}>mots de passe saisi : {mdp}</Text>
      

       <Image
  source={require('./assets/images/verdana.png')}
  style={{ width: 200, height: 200, top: -350,}}
  
/>
 
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   
  input: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    top: 147,
  },

  label: {
    bottom: -130,
    fontSize: 16,
  },

  text: {
    marginTop: 167,
    fontSize: 14,
    color: 'gray',
  },
});
