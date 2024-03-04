import { View, Text, Image } from 'react-native';
//import MapView, {Marker} from 'react-native-maps';
import {styles} from './Utils';

export default Tela02_Exibir = ({ navigation }) => {

return (
    <MapView style={styles.map} initialRegion={{
        latitude: -22.1135, 
        longitude: -51.37584,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
        <Marker coordinate={{latitude: -22.1135, longitude: -51.37584}}>
          <View>
              <Image source={require('../assets/Marcador.png')} style={{height: 35, width: 35}} />
              <Text>Toledo Prudente</Text>
          </View>
        </Marker>
      </MapView>
  );
}



 /*<View>
      <Text>Em desenvolvimento</Text>
      </View> */