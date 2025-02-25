import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

const Maiuscula = ({ children }) => {
  return (
    <Text style={styles.text}>
      {children.toUpperCase()}
    </Text>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
       Aula de PDME8
      </Text>
      <Card>
        <AssetExample />
      </Card>
      <Text style={styles.paragraph}>
       Aluno:
      </Text>
      <Maiuscula style={styles.paragraph}>
       Este texto deve estar com letras maiúsculas
      </Maiuscula>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green'
  },
});

Asset.js
import { Text, View, StyleSheet, Image } from 'react-native';

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        IFSP - Instituto Federal de São Paulo
      </Text>
      <Image style={styles.logo} source={require('../assets/ifsp.png')} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue'
  },
  logo: {
    height: 256,
    width: 128,
  }
});