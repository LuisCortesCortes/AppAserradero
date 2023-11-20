import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import sigalcasApi from '../api/sigalcasApi';

import { LoginResponse, Usuario, LoginData } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import { Alert } from 'react-native';


type AuthContextProps = {
    errorMessage:   string;
    token:          string | null;
    user:           Usuario | null;
    status:         'checking' | 'authenticated' | 'not-authenticated';
    signUp:         () => void;
    signIn:         ( loginData: LoginData) => void;
    logOut:         () => void;
    removeError:    () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

   const [ state, dispatch ] = useReducer( authReducer, authInicialState );

   useEffect(() => {
       checkToken();
   }, []);

   const checkToken = async() => {

        
        const token = await AsyncStorage.getItem('token');

        // si no hay token, no está autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated'});

        const tokenJSON = JSON.parse(token);
        
        // hay token, redireccionar a pantalla de recepciones
        dispatch({
            type: 'signUp',
            payload:{
                token: tokenJSON.token,
                user:  tokenJSON.user
            }
        });

   }

   const signIn = async({ rut_dv, password }: LoginData ) => {

        try {
            console.log("CONECTANDO");

            const { data } : any = await sigalcasApi.post<LoginResponse>('/login', { rut_dv, password });
            console.log(data);
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', JSON.stringify(data.data));

            const token = await AsyncStorage.getItem('token');
            console.log(token);
            
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'RUT de usuario o contraseña incorrecto, por favor intente nuevamente.'             
            });

        }

   };

   const signUp = () => {};

   const logOut = () => {};

   const removeError = () => {
    dispatch({ type: 'removeError'});
   };

    return(
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,

        }}> 
            { children }
        </AuthContext.Provider>
    )
}
