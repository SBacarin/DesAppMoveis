// importação das bibliotecas
import { SafeAreaView,  View,  Image} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Tela01_Home from './components/Tela01_Home'; // importação da Tela01 para dentro do arquivo principal APP
import Tela02_Exibir from './components/Tela02_Exibir'; // importação da Tela01 para dentro do arquivo principal APP
import {styles} from './components/Utils';

//
const firebase = require('firebase');

// aqui se insere as funções que for preciso
const Drawer = createDrawerNavigator();

// aqui se faz a exportação pra mostrar a tela principal com renderização, aquela que contem a barra home e exibir
// <Context> tudo que estiver dentro pode ser passado de contexto de uma tela para outra
// <NavigationContainer> componente raiz para uso do atributo navigate que faz a navegação entre as telas
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imagenBanner}>
          <Image
          source={require('./assets/BannerToledo.png')}
          style={styles.imagenBanner}
        />
      </View>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Tela01_Home} />
            <Drawer.Screen name="Localização" component={Tela02_Exibir} />
          </Drawer.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}
