import React, { useContext, useEffect, useState } from 'react'
import sigalcasApi from '../api/sigalcasApi';
import { Alert, Button, FlatList, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/recepcionTheme';
import DatePicker from 'react-native-date-picker'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';
import { RecepcionContext } from '../context/RecepcionContext';
import { Chofer, Despachador, Empresa, Fsc, Madera, OrigenDestino, Proveedor, TipoDocumento, TipoMadera, Transporte } from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import { ActivityIndicator, List } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '../utils/db';


interface Props extends StackScreenProps<any, any>{};


export const RecepcionTrozosScreen = ({ navigation, route } : Props) => {
    
    // const { mode }: any = route.params;
    const [_ModeForm, setModeForm] = useState("");
    const [_FirstLoad, setFirstLoad] = useState(true);
    const [_isLoading, setIsLoading] = useState( true );
    const [isLoadingFillForm, setIsLoadingFillForm] = useState( true );

    // fuentes de datos
    const [_TiposMaderas, setTiposMaderas] = useState([]);
    const [_Maderas, setMaderas] = useState([]);
    const [_TiposDocumentos, setTiposDocumentos] = useState([]);
    const [_Empresa, setEmpresa] = useState([]);
    const [_OrigenesDestinos, setOrigenesDestinos] = useState([]);
    const [_Despachadores, setDespachadores] = useState([]);
    const [_Fsc, setFsc] = useState([]);
    const [_Transportista, setTransporte] = useState([]);    
    const [_Choferes, setChoferes] = useState([]);
    
    // selected states
    const [_SelectedTipoMadera, setSelectedTipoMadera] = useState<any[]>([]);
    const [_SelectedMadera, setSelectedMadera] = useState<any[]>([]);
    const [_SelectedTipoDocumento, setSelectedTipoDocumento] = useState<any[]>([]); 
    const [_SelectedEmpresa, setSelectedEmpresa] = useState<any[]>([]);   
    const [_SelectedOrigen, setSelectedOrigen] = useState<any[]>([]);
    const [_SelectedDestino, setSelectedDestino] = useState<any[]>([]);
    const [_selectedDespachador, setSelectedDespachador] = useState<any[]>([]);
    const [_SelectedFsc, setSelectedFsc] = useState<any[]>([]);
    const [_SelectedTransportista, setSelectedTransportista] = useState<any[]>([]);    
    const [_SelectedChofer, setSelectedChofer] = useState<any[]>([]);

    useEffect(() => {
        
        if(_FirstLoad) {
            console.log("pasando por useEffect");
            setIsLoading(true);
            getTipoMaderas(); // tipo de recepción
            getTiposDocumentos();
            getEmpresas();
            getOrigenesDestinos();
            
            getDespachadores();
            getTransportistas();
            getChoferes();
    
            // mode === 'insert' ? insertForm() : editForm();
            if (route.params?.mode) {
               editForm(route.params.recepcionId);
              } else {
                console.log("MODO INSERT");
                
                setModeForm('insert');
                insertForm()
              }
            
              setIsLoading(false);
              setFirstLoad(false);
        }
        



    }, [_FirstLoad])
    
    
    const { grabarRecepcion, actualizarRecepcion } : any = useContext(RecepcionContext);
    
    const getTipoMaderas = async() => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from tipo_maderas`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).id } - ${ res.rows.item(index).nombre }`,
                          });
                    }
    
                    console.log("Tipos de maderas obtenidos correctamente");
                    setTiposMaderas(tasks);

                },
                error => {
 
                    Alert.alert('Error', 'Error al obtener tipo de maderas' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    } 

    const getTiposDocumentos = async() => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from tipo_documentos`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: res.rows.item(index).nombre,
                          });
                    }
    
                    console.log("Tipos de documentos obtenidos correctamente");
                    setTiposDocumentos(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener tipo de documentos' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;

    }

    const getEmpresas = async() => {

        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from empresas where proveedor = 1 and vigente = 1 order by razon_social asc`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).razon_social } - ${ res.rows.item(index).rut_dv }`,
                          });
                    }
    
                    console.log("Proveedores obtenidos correctamente");
                    setEmpresa(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Proveedores' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    }

    const getFSC = async(proveedorId : number) => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * 
                from fsc_empresas fe
                inner join fsc f on fe.fsc_id = f.id
                where fe.empresa_id = ${proveedorId}
                order by f.nombre asc;`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: res.rows.item(index).nombre,
                            codeFSC: res.rows.item(index).codigo
                          });
                    }
    
                    console.log("Códigos FSC obtenidos correctamente");
                    setFsc(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener códigos FSC' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    }

    const getOrigenesDestinos = async() => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from origen_destinos`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: res.rows.item(index).descripcion,
                          });
                    }
    
                    console.log("Orígenes y Destinos obtenidos correctamente");
                    setOrigenesDestinos(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Orígenes y Destinos' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    }

  
    const getMaderas = async(recepcionId : number) => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from maderas 
                where tipo_madera_id = ${ recepcionId } 
                order by tipo_madera_id, nombre asc`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).tipo_madera_id } - ${ res.rows.item(index).nombre }`,
                          });
                    }
    
                    console.log("Maderas obtenidas correctamente");
                    setMaderas(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Maderas' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    } 

    const getDespachadores = async() => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from despachadores order by nombre asc`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).nombre } - ${ res.rows.item(index).rut_dv }`,
                          });
                    }
    
                    console.log("Despachadores obtenidos correctamente");
                    setDespachadores(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Despachadores' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
    } 

    const getTransportistas = async() => {
        
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from empresas where transportista = 1 and vigente = 1 order by razon_social asc`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).razon_social } - ${ res.rows.item(index).rut_dv }`,
                          });
                    }
    
                    console.log("Transportistas obtenidos correctamente");
                    setTransporte(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Transportistas' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
        
    }    

    const getChoferes = async() => {
                
        const tasks: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from choferes`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        tasks.push({
                            value: res.rows.item(index).id,
                            label: `${ res.rows.item(index).nombre } - ${ res.rows.item(index).rut_dv }` ,
                          });
                    }
    
                    console.log("Choferes obtenidos correctamente");
                    setChoferes(tasks);
                },
                error => {
                    Alert.alert('Error', 'Error al obtener Choferes' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        return tasks;
    } 

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Dropdown label
            </Text>
          );
        }
        return null;
      };

    const { 
        id,
        folio_doc_recep,
        tipo_doc_recep_id,
        tipo_madera_id,
        madera_id,
        proveedor_id,
        origen_id,
        destino_id,
        transportista_id,				
        chofer_id,					
        recepcionista_id,		
        fecha_doc_recep,												
        fsc_id,								
        fsc_codigo,
        patente_camion,
        patente_carro,
        flete,
        poriva,
        neto,
        iva,
        total,
        predio,
        rol,
        observacion,
        created_id,
        updated_id,
        form, 
        onChange, setFormValue } = useForm({
        id: '0',
        folio_doc_recep: '0',
        tipo_doc_recep_id: '0',
        tipo_madera_id: '0',
        madera_id: '0',
        proveedor_id: '0',
        origen_id: '0',
        destino_id: '0',
        transportista_id: '0',				
        chofer_id: '0',					
        recepcionista_id: '0',		
        fecha_doc_recep: '',												
        fsc_id: '',								
        fsc_codigo: '',
        patente_camion: '',
        patente_carro: '',
        flete: '0',
        poriva: '0',
        neto: '0',
        iva: '0',
        total: '0',
        predio: '',
        rol: '',
        observacion: '',
        created_id: '',
        updated_id: '',
    });

    const onSave = async() => {
        console.log({ folio_doc_recep });
        Keyboard.dismiss(); // ocultar teclado

        // validar
        if (form.tipo_doc_recep_id === ''){
            Alert.alert('Validación', 'Por favor seleccione Tipo de Documento', [{
                text: 'Aceptar',
                //onPress: () => console.log('Cancelando'),
                style: 'default'
            }])

            return;
        } 

        form.proveedor_id === '' ? form.proveedor_id = '1': '';
        form.transportista_id === '' ? form.transportista_id = '1' : '';
        form.chofer_id === '' ? form.chofer_id = '1' : '';

        console.log('grabar recepcion')

        _ModeForm === 'edit' ? actualizarRecepcion(form) : grabarRecepcion(form);

    }

    const onDetails = async() => {

        if (parseInt(form.tipo_madera_id) === 9){

            navigation.navigate("AgregarDetalleRecepcionScreen", 
            { 
                id: form.id,
                proveedorId: form.proveedor_id,
                tipoMaderaId: form.tipo_madera_id,
                maderaId: form.madera_id
            }); 

        } else {

            navigation.navigate("ListaDetalleRecepcionScreen", 
            { 
                id: form.id, 
                proveedorId: form.proveedor_id,
                tipoMaderaId: form.tipo_madera_id,
                maderaId: form.madera_id
            });
        }
   
    }

    const insertForm = async() => {
        try{
            setModeForm('insert');
        }catch{
            console.log("INSERT FORM");
        }
        
    }

    const editForm = async(recepcionId:string) => {
        setFirstLoad(true);
        setIsLoadingFillForm(true);
        
        // cambiar a modo edición
        setModeForm('edit');

        // arreglos
        const tasksTipoMadera: any = [];
        const tasksMadera: any = [];
        const tasksTipoDocumento: any = [];
        const tasksEmpresa: any = [];
        const tasksOrigen: any = [];
        const tasksDestino: any = [];
        const tasksDespachador: any = [];
        const tasksFsc: any = [];
        const tasksTransporte: any = [];
        const tasksChofer: any = [];

        (await db).transaction(txn => {
    
            const query = `select * from recepciones where id = ${recepcionId}`;
    
            txn.executeSql(query,
                [],
                (sqlTxn: Transaction, res: ResultSet) => {
    
                    for (let index = 0; index < res.rows.length; index++) {
 
                        console.log("FOR EACH ROW");
                        console.log(res.rows.item(index));
    
                        // llenar listas
                        tasksTipoMadera.push({value: res.rows.item(index).tipo_madera_id});
                        tasksMadera.push({value: res.rows.item(index).madera_id});
                        tasksTipoDocumento.push({value: res.rows.item(index).tipo_doc_recep_id});
                        tasksEmpresa.push({value: res.rows.item(index).proveedor_id});
                        tasksOrigen.push({value: res.rows.item(index).origen_id});
                        tasksDestino.push({value: res.rows.item(index).destino_id});
                        tasksDespachador.push({value: res.rows.item(index).recepcionista_id});
                        tasksFsc.push({value: res.rows.item(index).fsc_id === '' ? '' : res.rows.item(index).fsc_id});
                        tasksTransporte.push({value: res.rows.item(index).transportista_id});
                        tasksChofer.push({value: res.rows.item(index).chofer_id});
                        
                        getMaderas(parseInt(res.rows.item(index).tipo_madera_id));
                        getFSC(parseInt(res.rows.item(index).proveedor_id));
    
                        // llenar formulario
                        form.id = res.rows.item(index).id === null  ? res.rows.item(index).id : res.rows.item(index).id.toString();
                        form.tipo_madera_id = res.rows.item(index).tipo_madera_id === null || res.rows.item(index).tipo_madera_id === '' ? '' : res.rows.item(index).tipo_madera_id.toString();
                        form.madera_id = res.rows.item(index).madera_id === null ? '' : res.rows.item(index).madera_id.toString();                 
                        form.proveedor_id = res.rows.item(index).proveedor_id === null ? '' : res.rows.item(index).proveedor_id.toString();
                        form.origen_id = res.rows.item(index).origen_id === null ? '' : res.rows.item(index).origen_id.toString();
                        form.destino_id = res.rows.item(index).destino_id === null ? '' : res.rows.item(index).destino_id.toString();               
                        form.tipo_doc_recep_id = res.rows.item(index).tipo_doc_recep_id === null ? '0' : res.rows.item(index).tipo_doc_recep_id.toString();
                        form.folio_doc_recep = res.rows.item(index).folio_doc_recep === null ? '0' : res.rows.item(index).folio_doc_recep.toString();
                        form.fecha_doc_recep = res.rows.item(index).fecha_doc_recep === null ? '' : res.rows.item(index).fecha_doc_recep.toString();
                        form.predio = res.rows.item(index).predio === null ? '' : res.rows.item(index).predio.toString();
                        form.rol = res.rows.item(index).rol === null ? '' : res.rows.item(index).rol.toString();
                        form.fsc_id = res.rows.item(index).fsc_id === null ? '' : res.rows.item(index).fsc_id.toString();
                        form.fsc_codigo = res.rows.item(index).fsc_codigo === null ? '' : res.rows.item(index).fsc_codigo.toString();
                        form.patente_camion = res.rows.item(index).patente_camion === null ? '' :  res.rows.item(index).patente_camion.toString();
                        form.patente_carro = res.rows.item(index).patente_carro === null ? '' : res.rows.item(index).patente_carro.toString();
                        form.chofer_id = res.rows.item(index).chofer_id === null ? '' : res.rows.item(index).chofer_id.toString();
                        form.transportista_id = res.rows.item(index).transportista_id === null ? '' : res.rows.item(index).transportista_id.toString();
                        form.flete = res.rows.item(index).flete === null ? '' : res.rows.item(index).flete.toString();
                        form.recepcionista_id = res.rows.item(index).recepcionista_id === null ? '' : res.rows.item(index).recepcionista_id.toString();
                        form.poriva = res.rows.item(index).poriva === null ? '' : res.rows.item(index).poriva.toString();
                        form.iva = res.rows.item(index).iva === null ? '' : res.rows.item(index).iva.toString();
                        form.neto = res.rows.item(index).neto === null ? '' : res.rows.item(index).neto.toString();
                        form.observacion = res.rows.item(index).observacion === null ? '' : res.rows.item(index).observacion.toString();
                        form.total = res.rows.item(index).total === null ? '' : res.rows.item(index).total.toString();
                        form.transportista_id = res.rows.item(index).transportista_id === null ? '' : res.rows.item(index).transportista_id.toString();
                    }
    
                    console.log("Recepción obtenida correctamente");
                    setSelectedTipoMadera(tasksTipoMadera);
                    setSelectedMadera(tasksMadera);
                    setSelectedTipoDocumento(tasksTipoDocumento);
                    setSelectedEmpresa(tasksEmpresa);
                    setSelectedOrigen(tasksOrigen);
                    setSelectedDestino(tasksDestino);
                    setSelectedDespachador(tasksDespachador);
                    setSelectedFsc(tasksFsc);
                    setSelectedTransportista(tasksTransporte);
                    setSelectedChofer(tasksChofer);


                    setIsLoadingFillForm(false);

                },
                error => {
                    Alert.alert('Error', 'Error al obtener Recepción' , [{
                        text: 'Aceptar',
                        //onPress: () => console.log('Cancelando'),
                        style: 'default'
                    }])
                });
        });
    
        
    }

  return (
    <View style={ styles.container }>
        <ScrollView style={styles.globalMargin}>
            { _isLoading  ? 
            <View  style={[styles.container, styles.horizontal]}>
                
                <ActivityIndicator size="large" color="#006110" />      
            </View>
            :
            <View>

            <Text style={styles.title } >Recepciones de trozos</Text>
            
            <View style={styles.card }>
                {/* <Text style={ styles.subtitle }>Antecedentes Recepción</Text>

                
                <View style={ styles.row }>
                    
                    <Text style={ styles.label }>N° Folio</Text>
                    <TextInput
                        placeholder='N° Folio'
                        style={ styles.inputField}
                        value={ folio_doc_recep }
                        onChangeText={ (value) => onChange( value, 'folio_doc_recep')}
                    />

                </View> */}

                <View style={ styles.row }>

                <View style={{ flex: 1 }} >

                    <Text style={ styles.label }>Tipo Recepcion</Text>
                    <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_TiposMaderas}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={isLoadingFillForm === false ? _SelectedTipoMadera[0].value : value}
                            placeholder={!isFocus ? 'Seleccione Tipo Recepción' : '...'}
                            searchPlaceholder="Buscar..."
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {

                                // asignar tipo recepción a formulario
                                onChange(item.value, 'tipo_madera_id');

                                // obtener lista de maderas filtradas por tipo de recepción
                                if(item.value !== ''){

                                    getMaderas(parseInt(item.value));
                                } else {
                                    console.log("DESHABILITAR MADERA");
                                }
                            }}
                        />

                </View>

                <View style={{ flex: 1 }}>
                    <Text style={ styles.label }>Madera</Text>
                    <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_Maderas}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={isLoadingFillForm === false ? _SelectedMadera[0].value : value}
                            placeholder={!isFocus ? 'Seleccione Madera' : '...'}
                            searchPlaceholder="Buscar..."
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'madera_id')}
                        />

                </View>
                </View> 

                <View style={ styles.row }>

                
                {/* <View style={ styles.container}> */}
                {/* <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}> */}
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Recepción con</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_TiposDocumentos}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Tipo de Documento' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedTipoDocumento[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'tipo_doc_recep_id')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>N° Guía / Factura</Text>
                        <TextInput
                            placeholder='Ingrese N° Guía / Factura'
                            style={ styles.numDocumento }
                            value={ folio_doc_recep }
                            onChangeText={ (value) => onChange( value, 'folio_doc_recep')}
                        />
                    </View>
                </View>

                {/* </View> */}
                {/* </View> */}


                <View style={ styles.row }>

                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label } >Fecha</Text>
                        <TextInput
                            placeholder='Fecha'
                            style={ styles.fechaRecepcion}
                            onPressIn={() => setOpen(true)}
                            onKeyPress={() => setOpen(true)}
                            value={ fecha_doc_recep }
                            //onChangeText={ (value) => onChange( value, 'fecha_doc_recep')}
                            // editable={ false }
                        ></TextInput>

                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {

                                console.log("FECHA")
                                //console.log(moment(date).format('YYYY-MM-DD'))
                                let fecha = moment(date).format('YYYY-MM-DD');
                                setOpen(false)
                                setDate(date)
                                onChange(fecha, 'fecha_doc_recep')
                            }}
                            mode='date'
                            confirmText='Aceptar'
                            cancelText='Cancelar'
                            title='Fecha Recepción'
                            onCancel={() => {
                                setOpen(false)
                            }}
                        /> 

                    </View>


                </View>

                <View style={ styles.row }>

                    <View style={{ flex: 1 }}>

                        <Text style={ styles.label }>Proveedor</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_Empresa}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Empresa' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedEmpresa[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                
                                // asignar proveedor a formulario
                                onChange(item.value, 'proveedor_id')

                                // obtener FSC y código FSC según proveedor
                                if(item.value !== ''){
                                    getFSC(parseInt(item.value));
                                }
                                
                        
                            }}
                        />

                    </View>
                </View>  

                <View style={ styles.row }>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Origen</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_OrigenesDestinos}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Orígen' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedOrigen[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'origen_id')}
                        />
                    </View>


                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Destino</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_OrigenesDestinos}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Destino' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedDestino[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'destino_id')}
                        />                    
                    </View>           

                </View>  

                <View style={ styles.row }>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Predio</Text>
                        <TextInput
                            placeholder='Ingrese Predio'
                            style={ styles.predio}
                            value={ predio }
                            onChangeText={ (value) => onChange( value, 'predio')}
                        />  
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Rol</Text>
                        <TextInput
                            placeholder='Ingrese Rol'
                            style={ styles.rol}
                            value={ rol }
                            onChangeText={ (value) => onChange( value, 'rol')}
                        /> 
                    </View>
                </View>
            
                <View style={ styles.row }>
                    <View style={{ flex: 1 }}>

                        <Text style={ styles.label }>Recepcionista</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_Despachadores}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Recepcionista' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _selectedDespachador[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'recepcionista_id')}
                        />

                    </View>

                </View>

                <View style={ styles.row }>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.label }>Tipo FSC</Text>
                        <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_Fsc}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione FSC' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedFsc[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={async (item) => {

                                // onChange(item.value, 'fsc_id'); 
                                const setFsc = async() => {
                                    onChange(item.value, 'fsc_id'); 
                                }

                                const setFscCode = async() => {
                                    form.fsc_codigo = item.codeFSC;
                                }

                                
                                await setFscCode();  
                                await setFsc();                                              
                            }}
                        />
                    
                    </View>

                    <View style={{ flex: 1 }}>

                        <Text style={ styles.label }>Code FSC</Text>
                        <TextInput
                            placeholder='Code FSC'
                            editable= {false}
                            style={ styles.codeFSC}
                            value={form.fsc_codigo}
                        /> 
                    </View>
            </View>

            <View style={{
                marginTop: 30,

            }}>

            <View style={ styles.row }>
                <Text style={ styles.title } >Antecedentes Transportista</Text>    
            </View>  

            <View style={ styles.row }>
                <Text style={ styles.label }>RUT</Text>
                <Dropdown
                            style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={_Transportista}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccione Transportista' : '...'}
                            searchPlaceholder="Buscar..."
                            value={isLoadingFillForm === false ? _SelectedTransportista[0].value : value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onChange(item.value, 'transportista_id')}
                        />
            </View>

        <View style={ styles.row }>
            <View style={{ flex: 1 }}>
                <Text style={ styles.label }>Camión</Text>
                <TextInput
                    placeholder='Camión'
                    style={ styles.camion}
                    value={ patente_camion }
                    onChangeText={ (value) => onChange( value, 'patente_camion')}
                /> 
            </View>

            <View style={{ flex: 1 }}>
                <Text style={ styles.label }>Carro</Text>
                <TextInput
                    placeholder='Carro'
                    style={ styles.carro}
                    value={ patente_carro }
                    onChangeText={ (value) => onChange( value, 'patente_carro')}
                />
            </View>
    
        </View>

        <View style={ styles.row }>
            
            <View style={{ flex: 1 }}>
                <Text style={ styles.label }>Chofer</Text>
                <Dropdown
                    style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={_Choferes}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Seleccione Chofer' : '...'}
                    searchPlaceholder="Buscar..."
                    value={isLoadingFillForm === false ? _SelectedChofer[0].value : value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => onChange(item.value, 'chofer_id')}
                />

            </View>

        </View>

        {/* Botones guardar y detalle de recepción */}
        <View style={[ styles.row, { justifyContent: 'space-between'} ]}>

            {/* Botón Guardar */}
            <View style={{
                marginTop: 30,
                marginBottom: 30,
            }}>
                <TouchableOpacity
                    style={styles.buttonGuardar}
                    onPress={ onSave }
                >
                    <Text style={styles.buttonGuardarText}>Guardar</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                marginTop: 30,
                marginBottom: 30,
                marginLeft: 10,
                height: 100,
            }}>
                <TouchableOpacity
                    style={[styles.buttonDetalle, _ModeForm === 'insert' ? { display: 'none'} : {display: 'flex'}]}
                    onPress={ onDetails }
                    disabled={false}
                >
                    <Text style={styles.buttonDetalleText}>Detalle recepción</Text>
                </TouchableOpacity>
            </View>
        </View>

        </View> 

        
            </View> 

        </View> 
        }   
        </ScrollView>
    </View>

  )
}



