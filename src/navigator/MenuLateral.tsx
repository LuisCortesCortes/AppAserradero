import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator'; 
import { Image, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native';
import { styles } from '../theme/recepcionTheme';
import { MenuRecepcionesScreen } from '../screens/MenuRecepcionesScreen';
import { SincronizarScreen } from '../screens/SincronizarScreen';
import { ListaRecepcionesScreen } from '../screens/ListaRecepcionesScreen';
import { LoginScreen } from '../screens/LoginScreen';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  
  const dimensions = useWindowDimensions();

  return (
    
    <Drawer.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 1024 ? 'front' : 'front',
        drawerPosition: 'left',
      }}
      drawerContent={(props) => <MenuInterno {...props } />}
    >
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      <Drawer.Screen 
        name="MenuRecepcionesScreen"
        options={{ 
          title: 'Recepciones',
          headerStyle: {
            backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'normal'
          }
        }} 
        component={MenuRecepcionesScreen} />
      <Drawer.Screen name="SincronizarScreen" component={SincronizarScreen} />
      <Drawer.Screen 
        name="ListaRecepcionesScreen" 
        component={ListaRecepcionesScreen}
        options={{ 
          title: 'Recepciones',
          headerStyle: {
            backgroundColor: '#006110'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'normal'
          }
        }} 
      />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{
        headerShown: false
      }}/>
    </Drawer.Navigator>
  );
}

const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>

      {/* sección de avatar */}
      <View style={ styles.avatarContainer }>
        <Image
              source={ require('../assets/avatar.png') }
              style={ styles.avatar }
          />
      </View>

      {/* opciones de menú */}
      <View style={styles.menuContainer}>

          <TouchableOpacity 
            style={ styles.menuBoton }
            onPress={ () => navigation.navigate('ListaRecepcionesScreen') }
            >
            <Text style={ styles.menuTexto }>Recepción</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={ styles.menuBoton }
            onPress={ () => navigation.navigate('SincronizarScreen') }
          >
            <Text style={ styles.menuTexto }>Sincronizar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={ styles.menuBoton }
            onPress={ () => navigation.navigate('LoginScreen') }
          >
            <Text style={ styles.menuTexto }>Login</Text>
          </TouchableOpacity>



      </View>
    </DrawerContentScrollView>
  );
}