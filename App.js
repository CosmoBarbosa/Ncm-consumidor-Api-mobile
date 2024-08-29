import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3800/NCM');
        setData(response.data.Nomenclaturas);
        setFilteredData(response.data.Nomenclaturas);
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const newData = data.filter((item) =>
      item.Descricao.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(newData);
  }, [searchQuery, data]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.codigo}>{item.Codigo}</Text>
      <Text style={styles.descricao}>{item.Descricao}</Text>
      <Text style={styles.datas}>Início: {item.Data_Inicio} | Fim: {item.Data_Fim}</Text>
      <Text style={styles.ato}>Ato: {item.Tipo_Ato_Ini} {item.Numero_Ato_Ini}/{item.Ano_Ato_Ini}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar descrição..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.Codigo}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop:10,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 3,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 3,
  },
  codigo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descricao: {
    fontSize: 14,
    marginTop: 5,
  },
  datas: {
    fontSize: 12,
    marginTop: 10,
    color: '#888',
  },
  ato: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
});

export default App;
