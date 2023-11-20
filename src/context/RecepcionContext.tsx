import React, { createContext, useState } from 'react';
import sigalcasApi from '../api/sigalcasApi';
import { Recepcion } from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Text } from 'react-native';
import { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import { db, selectRecepciones } from '../utils/db';

type RecepcionContextProps = {
    recepciones: Recepcion[];
    obtenerRecepcion: () => Promise<void>;
    grabarRecepcion: (folio_doc_recep: string) => Promise<void>;
    actualizarRecepcion: (folio_doc_recep: string) => Promise<void>;
    grabarRecepcionDetalle: (folio_doc_recep: string) => Promise<void>;
    actualizarRecepcionDetalle: (folio_doc_recep: string) => Promise<void>;
    eliminarRecepcion: (folio_doc_recep: string) => Promise<void>;
    obtenerRecepcionById: (folio_doc_recep: string) => Promise<void>; // TODO: cambiar any
    // errorMessage:       string;
    // token:              string | null;
    // status:             'checking' | 'authenticated' | 'not-authenticated';
    // grabarRecepcion:    ( recepcionData: RecepcionData ) => void;
    // signIn:         ( loginData: LoginData) => void;
    // logOut:         () => void;
    // removeError:    () => void;
}

export const RecepcionContext = createContext({});

export const RecepcionProvider = ({ children }: any) => {

    const [_Recepcion, setRecepcion] = useState<Recepcion[]>([]);

    // useEffects obtener recepción, lección 344

    const obtenerRecepcion = async () => {
        throw new Error('Not implemented');
    };

    const grabarRecepcion = async (form: Recepcion) => {


        (await db).transaction(async txn => {

            const query =
                `insert into recepciones 
                        (
                            tipo_madera_id, 
                            madera_id, 
                            tipo_doc_recep_id, 
                            proveedor_id, 
                            origen_id, 
                            destino_id, 
                            transportista_id, 
                            chofer_id,
                            recepcionista_id,
                            fsc_id,
                            fsc_codigo,
                            patente_camion,
                            patente_carro,
                            flete,
                            poriva,
                            neto, 
                            iva,
                            total,
                            folio_doc_recep, 
                            fecha_doc_recep, 
                            predio,
                            rol,
                            observacion
                        ) values 
                        (
                            ${form.tipo_madera_id}, 
                            ${form.madera_id}, 
                            ${form.tipo_doc_recep_id}, 
                            ${form.proveedor_id}, 
                            ${form.origen_id}, 
                            ${form.destino_id}, 
                            ${form.transportista_id},
                            ${form.chofer_id},
                            ${form.recepcionista_id},
                            '${form.fsc_id}',
                            '${form.fsc_codigo}',
                            '${form.patente_camion}',
                            '${form.patente_carro}',
                            ${form.flete},
                            ${form.poriva},
                            ${form.neto},
                            ${form.iva},
                            ${form.total},
                            ${form.folio_doc_recep},
                            '${form.fecha_doc_recep}',
                            '${form.predio}',
                            '${form.rol}',
                            '${form.observacion}'
                        );`;


            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {

                    // selectRecepciones(db);
                    Alert.alert(
                        'Aviso',
                        'Recepción guardada correctamente',
                        [{
                            text: 'Aceptar',

                            //onPress: () => console.log('Cancelando'),
                            style: 'default'
                        }])

                },
                error => {
                    console.log("Error al guardar recepción");
                    Alert.alert('Error', 'Error al guardar recepción', [{
                        text: 'Aceptar',

                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                    return false;
                });

        });

        return true;
    };

    const actualizarRecepcion = async (form: Recepcion) => {

        (await db).transaction(async txn => {

            const query =
                `update recepciones 
             set
                tipo_madera_id = ${form.tipo_madera_id},
                madera_id = ${form.madera_id},
                tipo_doc_recep_id = ${form.tipo_doc_recep_id}, 
                proveedor_id = ${form.proveedor_id}, 
                origen_id = ${form.origen_id}, 
                destino_id = ${form.destino_id}, 
                transportista_id = ${form.transportista_id}, 
                chofer_id = ${form.chofer_id},
                recepcionista_id = ${form.recepcionista_id},
                fsc_id = '${form.fsc_id}',
                fsc_codigo = '${form.fsc_codigo}',
                patente_camion = '${form.patente_camion}',
                patente_carro = '${form.patente_carro}',
                flete =${form.flete},
                poriva = ${form.poriva},
                neto = ${form.neto}, 
                iva = ${form.iva},
                total = ${form.total},
                folio_doc_recep = ${form.folio_doc_recep}, 
                fecha_doc_recep = '${form.fecha_doc_recep}', 
                predio ='${form.predio}',
                rol = '${form.rol}',
                observacion = '${form.observacion}'
             where
                id = ${form.id};`;


            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {

                    // selectRecepciones(db);
                    Alert.alert(
                        'Aviso',
                        'Recepción guardada correctamente',
                        [{
                            text: 'Aceptar',

                            //onPress: () => console.log('Cancelando'),
                            style: 'default'
                        }])

                },
                error => {
                    console.log("Error al guardar recepción");
                    Alert.alert('Error', 'Error al guardar recepción', [{
                        text: 'Aceptar',

                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                    return false;
                });

        });

        return true;
    };

    const eliminarRecepcion = async (folio_doc_recep: string) => {
        throw new Error('Not implemented');
    };

    const obtenerRecepcionById = async (folio_doc_recep: string) => {
        throw new Error('Not implemented');
    };

    return (
        <RecepcionContext.Provider value={{
            _Recepcion,
            grabarRecepcion,
            actualizarRecepcion
        }}>
            {children}
        </RecepcionContext.Provider>
    )
}