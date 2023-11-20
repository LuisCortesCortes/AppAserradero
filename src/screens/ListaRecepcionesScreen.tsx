import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import { styles } from '../theme/recepcionTheme';
import { db } from '../utils/db';
import { StackScreenProps } from '@react-navigation/stack';
import { RecepcionTrozosScreen } from './RecepcionTrozosScreen'
import { ProtectedScreen } from './ProtectedScreen'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<any, any>{};

export const ListaRecepcionesScreen = ({ navigation } : Props) => {

    const [isLoading, setIsLoading] = useState( true )
    const [_firstLoad, setFirstLoad] = useState( true )
    const [_Recepciones, setRecepciones] = useState([]);

    useEffect(() => {
        if(_firstLoad){
            getRecepciones();
            setFirstLoad(false);
        }
        

    }, [_Recepciones])

    const getRecepciones = async() => {
        
        setIsLoading(true);
        const tasks: any = [];

        (await db).transaction(txn => {

            const query = `select 
                        r.id,
                        r.tipo_madera_id,
                        tm.nombre as tipo_madera_nom,
                        r.madera_id,
                        m.nombre as madera_nom,
                        r.tipo_doc_recep_id,
                        td.nombre as tipo_doc_recep_nom,
                        r.folio_doc_recep,
                        r.proveedor_id,
                        p.razon_social
                    from recepciones r
                    inner join tipo_maderas tm on tm.id = r.tipo_madera_id
                    inner join maderas m on m.id = r.madera_id
                    inner join tipo_documentos td on td.id = r.tipo_doc_recep_id
                    inner join empresas p on p.id = r.proveedor_id and p.proveedor = 1
                    order by r.id asc;`;

            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {

                    for (let index = 0; index < res.rows.length; index++) {
                        tasks.push({
                            id: res.rows.item(index).id,
                            folio: res.rows.item(index).tipo_madera_id,
                            tipoMaderaId: res.rows.item(index).tipo_madera_id,
                            tipoMaderaNom: res.rows.item(index).tipo_madera_nom,
                            maderaId: res.rows.item(index).madera_id,
                            maderaNom: res.rows.item(index).madera_nom,
                            tipoDocRecepcionId: res.rows.item(index).tipo_doc_recep_id,
                            tipoDocRecepcionNom: res.rows.item(index).tipo_doc_recep_nom,
                            folioDocRecepcionNom: res.rows.item(index).folio_doc_recep,
                            proveedorId: res.rows.item(index).proveedor_id,
                            razonSocial: res.rows.item(index).razon_social,
                        });
                    }

                    console.log("Tipos de documentos obtenidos correctamente");
                    setRecepciones(tasks);
                    setIsLoading(false);
                },
                error => {
                    console.log("Error al obtener recepciones");
                    setIsLoading(false);
                    Alert.alert('Error', 'Error al obtener recepciones' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });

        return tasks;

    }

    const onDetails = async(item : any) => {

        navigation.navigate("RecepcionTrozosScreen", {
            mode: 'edit',
            recepcionId: item.id
        });

    }

    const renderItem = ({item}: any) => <Item title={item} />;

    const Item = ({title}: any) => (
        <TouchableOpacity
            onPress={ () => onDetails(title) }
            style={[styles.row, { flex: 1}]}
            >
            
        <View style={[styles.row, { flex: 1}]}>
            <Text style={[styles.rowHeader, { width: '10%' }]}>{title.id}</Text>
            <Text style={[styles.rowHeader, { width: '10%' }]}>{title.tipoMaderaNom}</Text>
            <Text style={[styles.rowHeader, { width: '20%' }]}>{title.maderaNom}</Text>
            <Text style={[styles.rowHeader, { width: '20%' }]}>{title.razonSocial}</Text>
            <Text style={[styles.rowHeader, { width: '20%' }]}>{title.tipoDocRecepcionNom}</Text>
            <Text style={[styles.rowHeader, { width: '20%' }]}>{title.folioDocRecepcionNom}</Text>
        </View>

        </TouchableOpacity>
    );

    const onChangeSearch = (texto: any) => {
        console.log("Buscar");
    }

    const menu = () => {
        navigation.navigate("ProtectedScreen");
    }

    const crear = () => {
        navigation.navigate("RecepcionTrozosScreen");
    }
    
  return (
    <View style={styles.container }>

        <View style={[styles.row, { justifyContent: 'space-between'}]}>
            
            <View>
                <TouchableOpacity
                    style={[styles.buttonCancelar, {width: 'auto'}]}
                    onPress={menu}
                >
                    <View style={styles.row}>
                        <Icon name="home-outline" color="white" size={20} />
                        <Text style={styles.buttonDetalleText}> MENÚ</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    style={[styles.buttonAgregar, {width: 'auto'}]}
                    onPress={crear}
                >
                    <View style={styles.row}>
                        <Icon name="add-outline" color="white" size={20} />
                        <Text style={styles.buttonDetalleText}> Crear</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>

        <TextInput
            style={{
            height: 50,
            borderColor: '#919191',
            borderWidth: 1,
            margin: 10,
            paddingLeft: 15,
            borderRadius: 10,
            }}
            onChangeText={(newText: any) => onChangeSearch(newText)}
            placeholder="Buscar recepción..."
        />
        <View style={styles.row}>
            <Text style={[styles.listaHeader, { width: '10%' }]}>N°</Text>
            <Text style={[styles.listaHeader, { width: '10%' }]}>Tipo</Text>
            <Text style={[styles.listaHeader, { width: '20%' }]}>Madera</Text>
            <Text style={[styles.listaHeader, { width: '20%' }]}>Proveedor</Text>
            <Text style={[styles.listaHeader, { width: '20%' }]}>Tipo Documento</Text>
            <Text style={[styles.listaHeader, { width: '20%' }]}>N° Documento</Text>
        </View>

        <View style={styles.row}>
            <FlatList
                data={_Recepciones}
                renderItem={renderItem}
                keyExtractor={(item:any, index) => item.id}
            />
        </View>

    </View>
  )

}

