
import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import React, { useState } from 'react';


export default function InscriptionScreen() {
      const [email, setEmail] = useState<string>('');
      const [mdp, setmdp] = useState<string>('');
  return (
    <View style={styles.container}>
     
      <Image
        source={require('../../assets/images/verdana.png')}
        style={{ width: 200, height: 200, top: -150,}}
      />
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

           <Text style={styles.label2}>definissez un mots de passe :</Text>
          <TextInput
            style={styles.input2}
            value={mdp}
            onChangeText={setmdp}
            placeholder="Entrez votre mots de passe"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.text2}>mots de passe saisi : {email}</Text>
          
             <Text style={styles.label3}>confirmez mots de passe :</Text>
          <TextInput
            style={styles.input3}
            value={mdp}
            onChangeText={setmdp}
            placeholder="Entrez a nouveau votre mots de passe"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.text3}>mots de passe saisi : {email}</Text>
          
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
    top: -117,
  },

  label: {
    bottom: 140,
    fontSize: 16,
  },
  text: {
    top: -107,
    fontSize: 14,
    color: 'gray',
  },
  input2: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    top: -89,
  },
  label2: {
    bottom: 100,
    fontSize: 16,
  },
  
 text2: {
    top: -80,
    fontSize: 14,
    color: 'gray',
  },

  input3: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    top: -59,
  },

  label3: {
    bottom: 70,
    fontSize: 16,
  },

  text3: {
    top: -50,
    fontSize: 14,
    color: 'gray',
  },
});
