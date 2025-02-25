import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState("");
  const [userList, setUserList] = useState([]);
  const [maiorNota, setMaiorNota] = useState(0);
  const [media, setMedia] = useState(0);

  useEffect(() => {
    const loadUserList = async () => {
      try {
        const storedList = await AsyncStorage.getItem('userList');
        if (storedList) {
          const parsedList = JSON.parse(storedList);
          setUserList(parsedList);
          calcularInfo(parsedList);
        }
      } catch (error) {
        console.log('Erro ao carregar lista de usuários', error);
      }
    };
    loadUserList();
  }, []);

  const calcularInfo = (list) => {
    if (list.length > 0) {
      const notas = list.map(user => parseFloat(user.nota));
      setMaiorNota(Math.max(...notas));
      setMedia((notas.reduce((sum, n) => sum + n, 0) / notas.length).toFixed(2));
    } else {
      setMaiorNota(0);
      setMedia(0);
    }
  };

  const handleDelete = async (nomeToDelete) => {
    try {
      const updatedUserList = userList.filter(user => user.nome !== nomeToDelete);
      await AsyncStorage.setItem('userList', JSON.stringify(updatedUserList));
      setUserList(updatedUserList);
      calcularInfo(updatedUserList);
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  const handleAlter = (nomeToAlter) => {
    const userToAlter = userList.find(user => user.nome === nomeToAlter);
    if (userToAlter) {
      setNome(userToAlter.nome);
      setNota(userToAlter.nota);
    }
  };

  const handleReduzir = async (nomeToDelete) => {
    const existingUser = userList.find(user => user.nome === nomeToDelete);
    let updatedUserList = [...userList];
    if (existingUser) {
      existingUser.nota = existingUser.nota -1;
      Alert.alert('Sucesso', 'Nota atualizada com sucesso!');
    }
    await AsyncStorage.setItem('userList', JSON.stringify(updatedUserList));
    setUserList(updatedUserList);
    calcularInfo(updatedUserList);
  };

  const handleRegister = async () => {
    if (!nome || !nota) {
      Alert.alert('Erro', 'Campos são obrigatórios.');
      return;
    }
    try {
      const existingUser = userList.find(user => user.nome === nome);
      let updatedUserList = [...userList];
      if (existingUser) {
        existingUser.nota = nota;
        Alert.alert('Sucesso', 'Nota atualizada com sucesso!');
      } else {
        updatedUserList.push({ nome, nota });
        Alert.alert('Sucesso', 'Registrado com sucesso!');
      }
      await AsyncStorage.setItem('userList', JSON.stringify(updatedUserList));
      setUserList(updatedUserList);
      calcularInfo(updatedUserList);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as informações.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do aluno"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Nota"
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
      -------------------------------------------------------
      <ScrollView>
        <FlatList
          data={userList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 16 }}>
                Nome: {item.nome} - Nota: {item.nota}
              </Text>
              <Text style={{ fontSize: 16 }}>
                <Button title="Excluir" onPress={() => handleDelete(item.nome)} />
                <Button title="Alterar" onPress={() => handleAlter(item.nome)} />
                <Button title="Reduzir" onPress={() => handleReduzir(item.nome)} />
              </Text>
              
            </View>
          )}
        />
      </ScrollView>
      --------------------------------------------------
      <Text>Total de notas: {userList.length}</Text>
      <Text>Maior nota: {maiorNota}</Text>
      <Text>Média: {media}</Text>
    </View>
  );
}

const MyStack = createNativeStackNavigator({
  screens: {
    "": {
      screen: HomeScreen,
    },
  },
});

const Navigation = createStaticNavigation(MyStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default function App() {
  return <Navigation />;
}
