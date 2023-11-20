import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeTabs } from '../navigator/HomeTabs';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { RecepcionTrozosScreen } from '../screens/RecepcionTrozosScreen';
import { SincronizarScreen } from '../screens/SincronizarScreen';
import { ListaRecepcionesScreen } from '../screens/ListaRecepcionesScreen';
import { MenuRecepcionesScreen } from '../screens/MenuRecepcionesScreen';
import { ListaDetalleRecepcionScreen } from '../screens/ListaDetalleRecepcionScreen';
import { AgregarDetalleRecepcionScreen } from '../screens/AgregarDetalleRecepcionScreen';
import { AgregarDetalleRecepcionOtrosScreen } from '../screens/AgregarDetalleRecepcionOtrosScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  const { status } = useContext( AuthContext );

    
  return (
    <Stack.Navigator
      // initialRouteName='ProtectedScreen'
       screenOptions={{
         headerShown:false,
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
      {
        (status !== 'authenticated')
          ?(
            <>
              <Stack.Screen 
                name="LoginScreen" 
                options={{headerShown: false}}
                component={ LoginScreen } />
              {/* <Stack.Screen name="LoginScreen" component={ LoginScreen } />  podría ir la pantalla de registro */} 
            </>
          )
          :(
            <>

            {/* Menú principal */}
            <Stack.Screen 
              name='MenuRecepcionesScreen'
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
              component={ MenuRecepcionesScreen }
            />
            {/* Menú inicio */}
            {/* <Stack.Screen 
              name="ProtectedScreen" 
               options={{ 
                title:"Inicio",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                }
              }}
              component={ ProtectedScreen } /> */}

            {/* Recepciones */}
            {/* <Stack.Screen 
              name="RecepcionesScreen" 
              options={{headerShown: false}}
              component={ RecepcionesScreen } />
            <Stack.Screen name="HomeTabs" options={{ title:""}}  component={ HomeTabs } />
            <Stack.Screen name="RecepcionTrozosScreen" 
              options={{ 
                title:"Recepciones de Trozos",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
                }}  component={ RecepcionTrozosScreen } /> */}
            {/* <Stack.Screen name="SincronizarScreen" 
              options={{ 
                title:"Sincronizar con servidor",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
                }}  component={ SincronizarScreen } /> */}
            {/* <Stack.Screen name="ListaRecepcionesScreen" 
              options={{ 
                title:"Lista de Recepciones",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
                }} component={ ListaRecepcionesScreen } /> */}

            {/* <Stack.Screen name="ListaDetalleRecepcionScreen" 
              options={{ 
                title:"Detalle de recepción",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
              }} 
              component={ ListaDetalleRecepcionScreen } /> */}
            {/* <Stack.Screen name="AgregarDetalleRecepcionScreen" 
              options={{ 
                title:"Agregar detalle de recepción",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
                }} component={ AgregarDetalleRecepcionScreen } /> */}
            {/* <Stack.Screen name="AgregarDetalleRecepcionOtrosScreen" 
              options={{ 
                title:"Agregar detalle de recepción",
                headerStyle: {
                  backgroundColor: '#006110'
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal'
                },
                }} component={ AgregarDetalleRecepcionOtrosScreen } />     */}
            </>
          )
      }
      
     
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}