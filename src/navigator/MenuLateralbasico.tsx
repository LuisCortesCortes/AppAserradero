import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator'; 
import { useWindowDimensions } from 'react-native';


const Drawer = createDrawerNavigator();

export const MenuLateralbasico = () => {
  
  const dimensions = useWindowDimensions();

  return (
    
    <Drawer.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 1024 ? 'back': 'front',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="StackNavigator" options={{ title: 'Home' }} component={StackNavigator} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}