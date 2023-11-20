
import React from 'react'
import Icon  from 'react-native-vector-icons/Ionicons';
import { Button, FlatList, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../theme/recepcionTheme';
import { ListaRecepcionesScreen } from './ListaRecepcionesScreen';
import { SincronizarScreen } from './SincronizarScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from '../interfaces/appInterfaces';
import { FlatListMenuItem } from '../components/FlatListMenuItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuRecepcionesScreen } from './MenuRecepcionesScreen';

interface Props extends StackScreenProps<any, any>{};

const menuItems: MenuItem[] = [
  {
    name: 'Recepción',
    icon: 'archive-outline',
    component: 'ListaRecepcionesScreen'
  },
  {
    name: 'Sincronizar',
    icon: 'sync',
    component: 'SincronizarScreen'
  }
]

export const ProtectedScreen = ( { navigation }: Props) => {

  // proteger sector notch
  const { top } = useSafeAreaInsets();


  const redirect = (option: string) => {

    switch(option){
      case 'recepcion':
        console.log("Navegando a recepciones");
        navigation.navigate("ListaRecepcionesScreen", { ParamName: 'param' });
        break;
      case 'sync':
        navigation.navigate("SincronizarScreen", { ParamName: 'param' });
        break;
    }
  }


  return (

      <View style={[ styles.globalMargin, styles.container, { flex: 1 }]}>

        <View>
          <Text style={ styles.Menutitle }>Opciones de Menú</Text>
          <View style={ styles.BarMenuTitle } /></View>
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center',}}>
          <View 
            style={[ styles.row,
            {
              backgroundColor: '#c89551',
              marginLeft: '30%',
              marginRight: '30%',
              justifyContent: 'center',
              alignContent: 'center',
              height: '27%',
              width: '30%',
              paddingTop: '2%',
              paddingBottom: '2%',
              borderRadius: 20
            }]}>
              <TouchableOpacity onPressIn={ () => redirect('recepcion')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    <Icon
                      name= "archive-outline"
                      color="white"
                      size={ 90 }
                    />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>  
                      <Text style={{ 
                        color: 'white', 
                        justifyContent: 'center',
                        fontSize: 30
                        }}>Recepción</Text>
                    </View>
              </TouchableOpacity>
          </View>

          <View style={[ styles.row,
            {
              marginTop: 50,
              backgroundColor: '#c89551',
              marginLeft: '30%',
              marginRight: '30%',
              justifyContent: 'center',
              alignContent: 'center',
              height: '27%',
              width: '30%',
              paddingTop: '2%',
              paddingBottom: '2%',
              borderRadius: 20
            }]}>

            <TouchableOpacity onPressIn={ () => redirect('sync')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                <Icon
                    name= "sync-outline"
                    color="white"
                    size={ 90 }
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                  <Text style={{ 
                      color: 'white', 
                      justifyContent: 'center',
                      fontSize: 30
                      }}>Sincronizar</Text>
                  </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      // <View style={ styles.globalMargin }>
      //   <Text style={ styles.title }>Home</Text>


      // <Button
      //     title='Ir a HOME RECEP'
      //     onPress={ () => navigation.navigate('HomeTabs') } 
      //   />

      // <Icon name="archive-outline" size={50} color="#900" onPress={ () => navigation.navigate('HomeTabs') } > Recepciones</Icon>
      // {/* <Icon name="archive-outline" size={40} color="#900"/> */}
      // </View>
    
    // <>
    //     <Text>Protected</Text>
    //     {/* Agregar panel drawer */}
    //     {/* Agegar tab buttom menu */}
    // </>
  )
}
