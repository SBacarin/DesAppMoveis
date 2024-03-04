import { List, TextInput, Button, Card } from 'react-native-paper';
import { ScrollView, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { styles, valorFormatado } from './Utils';
import firebase from '../Firebase';

export default Tela01_Home = ({ navigation }) => {
  // Definindo as variáveis ...
  // set registros é uma variávei array pois quando recuperar os registros do BD eles serão gravados nela
  let [tabRegistros, settabRegistros] = useState([]);
  
  // definindo as variáveis do formulário, a primeira é semelhante a um ID 
  let [key, setKey] = useState('');
  let [estabelecimento, setEstabelecimento] = useState('');
  let [categoria, setCategoria] = useState('');
  let [nome, setNome] = useState('');
  let [marca, setMarca] = useState('');
  let [unidade, setUnidade] = useState('');
  let [valor, setValor] = useState('');
  let [data, setData] = useState('');

  // definindo variáveis para controle dos botões
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);

  // faz chamada da função selecionar todos para manter atualização
  useEffect(() => { selecionarTodos(); [tabRegistros]});

  /* função selecionar todos recupera todos os registros do banco de dados linha a linha e passando para a variável array itens definida na propria função, snapshot é um componente que traz todos os registros que eu tenho no banco de dados semelhante ao for it, em seguida estes itens são gravados no array que está declarado nesta tela o settabRegistros*/
  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('tabRegistros').orderByChild('nome').on('value',
      (snapshot) => {
        snapshot.forEach((linha) => {
          itens.push({
            key: linha.key,
            estabelecimento: linha.val().estabelecimento,
            categoria: linha.val().categoria,
            nome: linha.val().nome,
            marca: linha.val().marca,
            unidade: linha.val().unidade,
            valor: linha.val().valor,
            data: linha.val().data});
        });
        settabRegistros(itens);
      });
  };

  const inserirRegistro = () => {
    if (estabelecimento != '' && categoria != '') {
      try {
        firebase.database().ref('tabRegistros').push({
          estabelecimento: estabelecimento,
          categoria: categoria,
          nome: nome,
          marca: marca,
          unidade: unidade,
          valor: valor,
          data: data
        });
        alert('Registro inserido com sucesso');
        cancelar();
      } catch (e) {
        alert('Erro ao inserir' + e);
      }
    }}
   
const alterarRegistro = () => {
    if (estabelecimento != "" && 
        categoria != "" &&
        nome != "" &&
        marca != "" &&
        unidade != "" &&
        valor != "" &&
        data != "")
        {
      try {
        firebase.database().ref('tabRegistros').child(key).update({
          estabelecimento: estabelecimento,
          categoria: categoria,
          nome: nome,
          marca: marca,
          unidade: unidade,
          valor: valor,
          data: data
        });
        alert("Registro alterado com sucesso!");
        cancelar();
      } catch(e){
        alert("Erro ao alterar:"+e);
      }
    }
  }

  const selecionar = (key, estabelecimento, categoria, nome, marca, unidade, valor, data) => {
    setKey(key);
    setEstabelecimento(estabelecimento);
    setCategoria(categoria);
    setNome(nome);
    setMarca(marca);
    setUnidade(unidade);
    setValor(valor);
    setData(data);
    setBotaoAlterarExcluir(false);
    setBotaoInserir(true);
  }
   
const cancelar = () => {
    setKey("");
    setEstabelecimento("");
    setCategoria("");
    setNome("");
    setMarca("");
    setUnidade("");
    setValor("");
    setData("");
    settabRegistros([]);
    selecionarTodos();
    setBotaoAlterarExcluir(true);
    setBotaoInserir(false);
  }

const excluirRegistro = () => {
    Alert.alert("Excluir Registro", "Deseja realmente excluir esse registro?",
      [
        {
          text: "Sim",
          onPress: () => {
            try{
              firebase.database().ref("tabRegistros").child(key).remove();
              alert("Registro excluído com sucesso!");
              cancelar();
            } catch(e){
              alert("Erro ao excluir!"+e);
            }
          }
        }, 
        {
          text: "Não",
          onPress: () =>{
            cancelar();
          }
        }
      ]);
  }

  return (
    <ScrollView style = {styles.form} >
      <Card style = {styles.form}>
        
        <Card.Title title="Formulario de Pesquisa de Preços" />
        <Card.Content>
          <TextInput
            style={styles.input}
            placeholder="Informe o nome do estabelecimento comercial"
            value={estabelecimento}
            mode="outlined"
            onChangeText={(text) => setEstabelecimento(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Informe a categoria do produto (ex:alimentício, limpeza, etc.)"
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Informe o nome do produto"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Informe a marca do produto"
            value={marca}
            onChangeText={(text) => setMarca(text)}
          />

        <TextInput
            style={styles.input}
            placeholder="Informe a unidade de medida(ex:kg,ml,etc"
            value={unidade}
            onChangeText={(text) => setUnidade(text)}
          />

        <TextInput
            style={styles.input}
            placeholder="Informe o valor do produto"
            value={valorFormatado(Number(valor))}
            keyboardType='numeric'
            onChangeText={(text) => setValor(text)}
          />

        <TextInput
            style={styles.input}
            placeholder="Data do registro"
            value={data}
            onChangeText={(text) => setData(text)}
          />

        </Card.Content>
       
       <Card.Actions>
          <Button
            color='#003761'
            title="Inserir"
            icon="plus"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoInserir}
            onPress={() => inserirRegistro()}></Button>
          <Button
            color='#003761'
            icon="pencil"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoAlterarExcluir}
            onPress={() => alterarRegistro()}></Button>
          <Button
            color='#003761'
            icon="delete"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoAlterarExcluir}
            onPress={() => excluirRegistro()}></Button>
          <Button
            color='#003761'
            icon="cancel"
            mode="contained"
            style={styles.buttonCrud}
            onPress={() => cancelar()}></Button>
        </Card.Actions>
      </Card>
      <List.Section>
        <List.Subheader> Pesquisas Registradas </List.Subheader>
        <FlatList
          data={tabRegistros}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.estabelecimento}
                left={(props) => <List.Icon icon="arrow-right"/>}
                onPress={() => selecionar(item.key, item.estabelecimento, item.categoria, item.nome, item.marca, item.unidade, item.valor, item.data)}
              />
            );
          }}
        />
      </List.Section>
    </ScrollView>
  );
};