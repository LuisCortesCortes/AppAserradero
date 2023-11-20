  import 'react-native-gesture-handler';
  import { NavigationContainer } from '@react-navigation/native';
  import { AuthProvider } from './src/context/AuthContext';
  import { StackNavigator } from './src/navigator/StackNavigator';
  import { RecepcionProvider } from './src/context/RecepcionContext';
  import { MenuLateralbasico } from './src/navigator/MenuLateralbasico';
  import { MenuLateral } from './src/navigator/MenuLateral';


  const AppState = ({ children }: any) => {
    return(
      <AuthProvider>
        <RecepcionProvider>
          { children }
        </RecepcionProvider>
        
      </AuthProvider>
    )
  }

  export const App = () => {

    return (
      <NavigationContainer>
        <AppState>
          <StackNavigator></StackNavigator>
          {/* <MenuLateralbasico></MenuLateralbasico> */}
          {/* <MenuLateral></MenuLateral> */}
        </AppState>
      </NavigationContainer>
    )
  }


  export default App;
