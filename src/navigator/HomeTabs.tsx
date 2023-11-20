import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RecepcionesScreen } from '../screens/RecepcionesScreen';
import { SincronizarScreen } from '../screens/SincronizarScreen';
import { Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Title } from 'react-native-paper';
import { View } from 'react-native';


export const HomeTabs = () => {
    return Platform.OS === 'ios' ? <TabsIOS/> : <TabsAndroid/>
}

const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {

  return (
    <BottomTabAndroid.Navigator  
        sceneAnimationEnabled={ true }
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{
            backgroundColor: '#006110',
            paddingBottom: 48 
            
        }}
        screenOptions={ ({ route }) => ({
            tabBarIcon: ({ color, focused}) => {

                let iconName: string = '';
                switch( route.name ) {
                    case 'RecepcionesScreen':
                        iconName: 'archive-outline'
                        
                    break;

                    case 'SincronizarScreen':
                        iconName: 'T2'
                        
                    break;
                }

                return <Icon name={ iconName } size={ 20 } color={color} />
            },
            
        }) }
    >
      <BottomTabAndroid.Screen name="RecepcionesScreen" component={ RecepcionesScreen } options={{ title: 'Tab 1'}} />
      <BottomTabAndroid.Screen name="SincronizarScreen" component={ SincronizarScreen } />
    </BottomTabAndroid.Navigator>
  );
}

const BottomTabIOS = createMaterialBottomTabNavigator();

const TabsIOS = () => {

  return (
    <View style={{ backgroundColor: 'white'} }>
      <BottomTabIOS.Navigator  
      >
        <BottomTabIOS.Screen name="RecepcionesScreen" component={ RecepcionesScreen } />
        <BottomTabIOS.Screen name="SincronizarScreen" component={ SincronizarScreen } />
      </BottomTabIOS.Navigator>
    </View>

  );
}