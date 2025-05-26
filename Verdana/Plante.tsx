import { View, Text, StyleSheet } from 'react-native';

export default function Plante() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Plante</Text>
      <Text style={styles.description}>
Pourquoi soren toujours toi !!!      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
