import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProtectedScreen } from './ProtectedScreen';
import { ListaRecepcionesScreen } from './ListaRecepcionesScreen';
import { RecepcionTrozosScreen } from './RecepcionTrozosScreen';
import { ListaDetalleRecepcionScreen } from './ListaDetalleRecepcionScreen';
import { AgregarDetalleRecepcionScreen } from './AgregarDetalleRecepcionScreen';
import { AgregarDetalleRecepcionOtrosScreen } from './AgregarDetalleRecepcionOtrosScreen';
import { SincronizarScreen } from './SincronizarScreen';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<any, any>{};

const Stack = createStackNavigator();

export const MenuRecepcionesScreen = ({ navigation } : Props) => {
  

  const recep = async() => {

    console.log("PARAMETRO")
    // navigation.navigate("RecepcionTrozosScreen", {
    //     mode: 'edit' 
    // });

  }

  return (
  <Stack.Navigator
      // initialRouteName='ProtectedScreen'
       screenOptions={{
      //   headerShown:true,
         headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          display: 'none'
         },
         cardStyle: {
           backgroundColor: 'white'
         }
       }}
    >

      {/* Menú principal */}
      <Stack.Screen 
        name='ProtectedScreen'
        options={{
          title: "MENU",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ ProtectedScreen }
      />

      <Stack.Screen 
        name='ListaRecepcionesScreen'
        options={{
          title: "LISTA DE RECEPCIONES",
          headerStyle: {
            backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ ListaRecepcionesScreen }
      />

      <Stack.Screen 
        name='RecepcionTrozosScreen'
        options={{
          title: "RECEPCIÓN DE TROZO",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ RecepcionTrozosScreen }
      />

      <Stack.Screen 
        name='ListaDetalleRecepcionScreen'
        options={{
          title: "DETALLE RECEPCIÓN",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ ListaDetalleRecepcionScreen }
      />

      <Stack.Screen 
        name='AgregarDetalleRecepcionScreen'
        options={{
          title: "AGREGAR DETALLES DE RECEPCIÓN (TROZOS)",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ AgregarDetalleRecepcionScreen }
      />

    <Stack.Screen 
        name='AgregarDetalleRecepcionOtrosScreen'
        options={{
          title: "AGREGAR DETALLES DE RECEPCIÓN (OTROS)",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ AgregarDetalleRecepcionOtrosScreen }
      />


      <Stack.Screen 
        name='SincronizarScreen'
        options={{
          title: "SINCRONIZAR",
          headerStyle: {
          backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'normal'
          }
        }}
        component={ SincronizarScreen }
      />

    </Stack.Navigator>
  )
}


