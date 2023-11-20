import React, { useContext, useEffect, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, Keyboard, Alert, Button } from 'react-native';
import { LogoApp } from '../components/LogoApp';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any>{};


export const LoginScreen = ( { navigation } : Props) => {

  const [_formatRUT, setFormatRUT] = useState('');
  const [_messageRUT, setMessageRUT] = useState('');
  
  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { 
    form,
    onChange, 
    } = useForm({
    rut: '',
    password: ''
  });

  useEffect(() => {

    if ( errorMessage.length === 0 ) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Aceptar',
        onPress: () => removeError(),
        style: 'default'
      }
    ])
      
    //console.log("Se ejecuta solo");
    const getToken = async() => {
      const token = await AsyncStorage.getItem('token');
      //console.log(token);
    }

    getToken();


  }, [errorMessage])

  const onLogin = () => {
    console.log(`${form.rut} , ${form.password}`);
    Keyboard.dismiss(); // ocultar teclado

    // detectar conexión

    signIn({ rut_dv: form.rut, password: form.password });
  }

  const checkRut = (_rut: string) => {
    
    if(_rut.length > 0){
      // inicializar
      setMessageRUT("");

      // despejar puntos
      let valor : any = _rut.replace('.', '');
      // despejar guión
      valor = valor.replace('-', '');

      // aislar cuerpo y dígito verificador
      let cuerpo = valor.slice(0, -1);
      let dv = valor.slice(-1).toUpperCase();

      // formatear rut
      _rut = cuerpo + '-' + dv;

      // si no cumple con el mínimo ej. (n.nnn.nnn)
      if (cuerpo.length < 7) {
        setMessageRUT("RUT Incompleto");
        setFormatRUT(_rut);
        return false;
      }

      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;

      // Para cada dígito del Cuerpo
      for (let i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        let index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

      // Calcular Dígito Verificador en base al Módulo 11
      let dvEsperado = 11 - (suma % 11);

      // Casos Especiales (0 y K)
      dv = (dv == 'K') ? 10 : dv;
      dv = (dv == 0) ? 11 : dv;

      // Validar que el Cuerpo coincide con su Dígito Verificador
      if (dvEsperado != dv) { 
        setMessageRUT("RUT Inválido"); 
        setFormatRUT(_rut);
        return false; 
      }

      // Si todo sale bien, eliminar errores (decretar que es válido)
      setMessageRUT('');
      form.rut = _rut;
      setFormatRUT(_rut);
    } else {
      setMessageRUT('');
      setFormatRUT('');
    }
  }



  return (
    //<div>LoginScreen</div>
    <View style={{ alignItems: 'center'}}>
      {/* Backgroud */}
      <ImageBackground source={ 
          require('../assets/fondo.jpg')}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center'
          }}
          resizeMode='cover'
        >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={ (Platform.OS === 'ios') ? 'padding' : 'height'}
        >
        {/* Keyboard avoid view */}
        {/* Crear formulario view */}
        <View style={ loginStyles.form } >

          <LogoApp/>
          <Text style={ loginStyles.title }>Sistema de Gestión y Contabilidad</Text>

          <Text style={ loginStyles.label }>R.U.T</Text>
          <TextInput
            placeholder='Ingrese R.U.T'
            keyboardType='email-address'
            underlineColorAndroid='gray'
            style={ loginStyles.inputField}
            onChangeText={ (value:any) => {
              // onChange(value, 'rut');
              checkRut(value); 
            }}
            value={ _formatRUT }
            onSubmitEditing={ onLogin }
            />
          <Text style={{ color: 'red'}}>{ _messageRUT }</Text>
          <Text style={ loginStyles.label }>Contraseña</Text>
          <TextInput
            placeholder='**************'
            underlineColorAndroid='gray'
            secureTextEntry={ true }
            style={[ 
              loginStyles.inputField,
              ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
            ]}
            selectionColor="black"
            autoCapitalize="none"
            autoCorrect={ false }
            onChangeText={ (value:any) => onChange(value, 'password') }
            value={ form.password }
            onSubmitEditing={ onLogin }
          />  

          {/* Boton login */}
          <View style={ loginStyles.buttonContainer }>
            <TouchableOpacity
              style={ loginStyles.button }
              //onPress={ () => navigation.navigate('RecepcionesScreen') }
              onPress={ onLogin }
            >
              <Text style={{
                color: 'white'
              }}>Ingresar</Text>
            </TouchableOpacity>

          </View>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      
    </View>
  )
}
