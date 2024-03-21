import { StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const styles = StyleSheet.create({
  scrolview: {
    flex: 1,
  },
  card: {
    margin: 10,
  },

  image: {
    width: Dimensions.get('window').width - 65,
    height: 100,
    alignSelf: 'center',
  },

  imagenBanner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    alignSelf: 'center',
  },
  button: {
    marginLeft: 10,
  },
  buttonCrud: {
    padding: 10,
    marginLeft: 10,
  },
  buttonImageCrud: {
    marginTop: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    padding: 8,
  },

  form: {
    backgroundColor: '#ADD8E6',
  },

  input: {
    marginBottom: 2, // margem inferior
    borderWidth: 1, // largura da borda
    borderColor: '#d58500', //cor
    borderRadius: 5, // raio de borda para cantos arredondados
    padding: 8, // preenchimento intern
  },

  moeda: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  map: {
    width: '100%',
    height: '100%',
  },
});

export const valorFormatado = (valor) => {
  return valor.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};
