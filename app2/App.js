import { Text, View, Button } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Primeira página"
        onPress={() => navigation.navigate('Page1')}
      />
      <Text><br/></Text>
      <Button
        title="Segunda página"
        onPress={() => navigation.navigate('Page2')}
      />
      <Text><br/></Text>
       <Button
        title="Terceira página"
        onPress={() => navigation.navigate('Page3')}
      />
    </View>
  );
}

function Page1Screen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Primeira pagina</Text>
    </View>
  );
}

function Page2Screen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Segunda pagina</Text>
    </View>
  );
}

function Page3Screen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Terceira pagina</Text>
    </View>
  );
}

const MyStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Page1: Page1Screen,
    Page2: Page2Screen,
    Page3: Page3Screen,
  },
});

const Navigation = createStaticNavigation(MyStack);

export default function App() {
  return <Navigation />;
}
