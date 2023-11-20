import React, {useEffect, useState} from 'react'
import { Image, Text, View, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { deleteChoferes, deleteDespachadores, deleteEmpresas, deleteFSC, deleteFSCEmpresas, deleteMaderas, deleteOrigenDestino, deleteProductos, deleteProveedorPrecios, deleteRecepciones, deleteTipoDocumentos, deleteTipoMaderas, initDatabase, insertChoferes, insertDespachadores, insertEmpresas, insertFSC, insertFSCEmpresas, insertMaderas, insertOrigenDestino, insertProductos, insertTipoDocumentos, insertTipoMaderas, selectTipoDocumentos, insertPreciosProveedores, insertPreciosDiametros, deletePrecioDiametros, uploadRecepciones } from '../utils/db';
import Icon from 'react-native-vector-icons/Ionicons';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { styles } from '../theme/recepcionTheme';

interface ItemProps {
  title: string,
  status: boolean
}

export const SincronizarScreen = () => {

  const [_FirstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState( false );
  const [_tipoDocumentos, setTipoDocumentos] = useState('download');
  const [_empresas, setEmpresas] = useState('download');
  const [_fsc, setFsc] = useState('download');
  const [_fscEmpresas, setFscEmpresas] = useState('download');
  const [_origenDestino, setOrigenDestino] = useState('download');
  const [_tipoMaderas, setTipoMaderas] = useState('download');
  const [_maderas, setMaderas] = useState('download');
  const [_despachadores, setDespachadores] = useState('download');
  const [_choferes, setChoferes] = useState('download');
  const [_productos, setProductos] = useState('download');
  const [_preciosProveedores, setPreciosProveedores] = useState('download');
  const [_preciosDiametros, setPreciosDiametros] = useState('download');

  const [_recepciones, setRecepciones] = useState('upload');
  const [_recepcionesDetalles, setRecepcionesDetalles] = useState('upload');

  const [_items, setItems] = useState<ItemProps | null>( null );

  useEffect(() =>{

    if(_FirstLoad){
      createDB();

      setFirstLoad(false);
    }

  }, 
  [
    _FirstLoad
  ])

  const createDB = async() => {
    await initDatabase();
  }


  const sincronizarTipoDocumentos = async() => {

    try{
      
      setTipoDocumentos('loading');
      await deleteTipoDocumentos();
      const resultTD = await insertTipoDocumentos();
      resultTD === false ? setTipoDocumentos('warning') : setTipoDocumentos('success'); 
      
    } catch (ex: any){
      setTipoDocumentos('warning');
    }

  }

  const sincronizarEmpresas = async() => {

    // empresas
    try{
      setEmpresas('loading');
      await deleteEmpresas();
      const resultEmpresas = await insertEmpresas();
      resultEmpresas === false ? setEmpresas('warning') : setEmpresas('success');  

    } catch (ex: any){
      setEmpresas('warning');
    }
  }

  const sincronizarFsc = async() =>{

    // fsc
    try{
      setFsc('loading');
      await deleteFSC();
      const resultFSC = await insertFSC();
      resultFSC === false ? setFsc('warning') : setFsc('success'); 

    } catch (ex: any){
      setFsc('warning');
    }
    
  }

  const sincronizarFscEmpresas = async() =>{

    // fsc empresas
    try{
      setFscEmpresas('loading');
      await deleteFSCEmpresas();
      const resultFSCEmpresas = await insertFSCEmpresas();
      resultFSCEmpresas === false ? setFscEmpresas('warning') : setFscEmpresas('success'); 

    } catch (ex: any){
      setFscEmpresas('warning');
    }
  }

  const sincronizarOrigenesDestinos = async() => {
    
    // orígenes / destinos
    try{
      setOrigenDestino('loading');
      await deleteOrigenDestino();
      const resultOrigenDestino = await insertOrigenDestino();
      resultOrigenDestino === false ? setOrigenDestino('warning') : setOrigenDestino('success');  

    } catch (ex: any){
      setOrigenDestino('warning');
    }

  }

  const sincronizarTipoMadera = async() => {

    // Tipos de madera
    try{
      setTipoMaderas('loading');
      await deleteTipoMaderas();
      const resultTipoMaderas = await insertTipoMaderas();
      resultTipoMaderas === false ? setTipoMaderas('warning') : setTipoMaderas('success');  

    } catch (ex: any){
      setTipoMaderas('warning');
    } 

  }

  const sincronizarMaderas = async() => {
    // Maderas
    try{
      setMaderas('loading');
      await deleteMaderas();
      const resultMaderas = await insertMaderas();
      resultMaderas === false ? setMaderas('warning') : setMaderas('success');  

    } catch (ex: any){
      setMaderas('warning');
    }
        
  }

  const sincronizarDespachadores = async() => {

    // Despachadores
    try{
      setDespachadores('loading');
      await deleteDespachadores();
      const resultDespachadores = await insertDespachadores();
      resultDespachadores === false ? setDespachadores('warning') : setDespachadores('success');  

    } catch (ex: any){
      setDespachadores('warning');
    }   
  }

  const sincronizarChoferes = async() => {
    // Choferes
    try{
      setChoferes('loading');
      await deleteChoferes();
      const resultChoferes = await insertChoferes();
      resultChoferes === false ? setChoferes('warning') : setChoferes('success');  

    } catch (ex: any){
      setChoferes('warning');
    }
  }

  const sincronizarProductos = async() => {
    
    // Productos
    try{
      setProductos('loading');
      await deleteProductos();
      const resultProductos = await insertProductos();
      resultProductos === false ? setProductos('warning') : setProductos('success');  

    } catch (ex: any){
      setProductos('warning');
    }
  }

  const sincronizarPreciosProveedores = async() => {
    // Precios proveedores
    try{
      setPreciosProveedores('loading');
      await deleteProveedorPrecios();
      const resultProveedorPrecios = await insertPreciosProveedores();
      resultProveedorPrecios === false ? setPreciosProveedores('warning') : setPreciosProveedores('success');  

    } catch (ex: any){
      setPreciosProveedores('warning');
    }

  }

  const sincronizarPreciosDiametros = async() => {
    // Precios diámetros
    try{
      setPreciosDiametros('loading');
      await deletePrecioDiametros();
      const resultPreciosDiametros = await insertPreciosDiametros();
      resultPreciosDiametros === false ? setPreciosDiametros('warning') : setPreciosDiametros('success');  

    } catch (ex: any){
      setPreciosDiametros('warning');
    }     

  }

  const uploadRecepciones = async() => {
    // borrar registros de tablas
    // await deleteRecepciones(db);
    // console.log("Resultado Tipos");
    // console.log(resultTD);
    // resultTD ? items[0]["status"] = true : items[0]["status"] = false;

    // console.log(items);

    // carga en base de datos
    // try {
    //   await uploadRecepciones(db);
    // }
    // catch (ex: any) {
    //   console.log("Error en carga para BD");
    // }
  }

  const sincronizar = async() => {

    await sincronizarTipoDocumentos();
    await sincronizarEmpresas();
    await sincronizarFsc();
    await sincronizarFscEmpresas();
    await sincronizarOrigenesDestinos();
    await sincronizarTipoMadera();
    await sincronizarMaderas();
    await sincronizarDespachadores();
    await sincronizarChoferes();
    await sincronizarProductos();
    await sincronizarPreciosProveedores();
    await sincronizarPreciosDiametros();
    //await uploadRecepciones();
  }



  return (
    
    <View style={[styles.container, { flex: 1 }]}>

        { isLoading === false ? 
        <View>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%'
          }}
          onPress={ () => { 
            sincronizar();
            setIsLoading(true); 
          }}
          >
          <Image
            source={ require('../assets/icons-sync.png')}
          />
          <Text style={{
            marginLeft: 5,
            marginTop: 8,
            fontSize: 50
            }}>Sincronizar</Text>
          </TouchableOpacity>

        </View>
        :
        <View style={{ flex: 1 }}> 

          <ScrollView>
          <Text style={styles.title }>Descargas de Servidor</Text>
          <View style={styles.BarMenuTitle}></View>

            
                   

            <View style={styles.card }>
              <View>
              <View style={{ flex: 1}}>
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 8,
                    fontSize: 25
                  }}>Tipos de Documentos</Text>

                  { _tipoDocumentos === 'download' ? 
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue' 
                      }}
                    />
                  : '' }

                  { _tipoDocumentos === 'success' ? 
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _tipoDocumentos === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                      onPress={ sincronizarTipoDocumentos }
                    />
                  : '' }

                  { _tipoDocumentos === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
              </View>

                <View style={{flex: 1}}>
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 8,
                    fontSize: 25
                  }}>Empresas (Clientes, Proveedores, Transportistas)</Text>
                  
                  { _empresas === 'download' ? 
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _empresas === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _empresas === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                      onPress={sincronizarEmpresas}
                    />
                  : '' }

                  { _empresas === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

                <View style={styles.row}>  
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 8,
                    fontSize: 25
                  }}>Códigos FSC</Text>

                  { _fsc === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _fsc === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _fsc === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                      onPress={sincronizarFsc}
                    />
                  : '' }

                  { _fsc === 'warning' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

                <View style={styles.row}>  
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 8,
                    fontSize: 25
                  }}>Códigos FSC de Empresas</Text>

                  { _fscEmpresas === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _fscEmpresas === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _fscEmpresas === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                      onPress={ sincronizarFscEmpresas }
                    />
                  : '' }

                  { _fscEmpresas === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

                <View style={styles.row}>  
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Orígenes / Destinos</Text>

                  { _origenDestino === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _origenDestino === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _origenDestino === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                  : '' }  

                  { _origenDestino === 'warning' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' } 

                </View>
                </View>

                <View style={styles.row}>    
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Tipos de Maderas</Text>

                    { _tipoMaderas === 'download' ?
                      <Icon 
                        name='cloud-download'
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: 'blue'
                        }}
                      />
                    : '' } 

                    { _tipoMaderas === 'success' ?
                      <Icon 
                        name='checkmark'
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: 'green'
                        }}
                      />
                    : '' } 

                    { _tipoMaderas === 'warning' ?
                      <Icon 
                        name='warning'
                        style={{
                          fontSize: 40,
                          fontWeight: 'bold',
                          color: 'yellow'
                        }}
                      />
                    : '' } 

                    { _tipoMaderas === 'loading' ?
                      <ActivityIndicator size="large" color="#0000ff" />
                    : '' } 

                </View>
                </View>

                <View style={styles.row}>    
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Maderas</Text>

                  { _maderas === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' } 

                  { _maderas === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' } 

                  { _maderas === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                    : '' } 

                  { _maderas === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' } 

                </View>
                </View>

                <View style={styles.row}>
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Despachadores</Text>

                  { _despachadores === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _despachadores === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }
                  
                  { _despachadores === 'warning' ?  
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                  : '' }

                  { _despachadores === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

                <View style={styles.row}>    
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Choferes</Text>
                  
                  { _choferes === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }  
                  
                  { _choferes === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _choferes === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                  : '' }

                  { _choferes === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }
                </View>
                </View>

                <View style={styles.row}>    
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Productos</Text>
                  
                  { _productos === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _productos === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _productos === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                      onPress={sincronizarProductos}
                    />
                  : '' }

                  { _productos === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

                <View style={styles.row}>
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Precios de Proveedores</Text>
                  
                  { _preciosProveedores === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _preciosProveedores === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _preciosProveedores === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                  : '' }

                  { _preciosProveedores === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }
                </View>
                </View>

                <View style={styles.row}>    
                <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                  <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Precios de Diámetros</Text>
                  
                  { _preciosDiametros === 'download' ?
                    <Icon 
                      name='cloud-download'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                  : '' }

                  { _preciosDiametros === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                  : '' }

                  { _preciosDiametros === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                  : '' }

                  { _preciosDiametros === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                  : '' }

                </View>
                </View>

              </View>
            </View>
            
            
            <Text style={styles.title }>Cargas a Servidor</Text>
            <View style={styles.BarMenuTitle}></View>

            <View style={styles.card }>

            <View style={styles.row}>
              <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                <Text style={{
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 8,
                    fontSize: 25
                }}>Recepciones</Text>

                { _recepciones === 'upload' ?
                    <Icon 
                      name='cloud-upload'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                : '' }

                { _recepciones === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                : '' }

                { _recepciones === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                : '' }

                { _recepciones === 'loading' ?
                  <ActivityIndicator size="large" color="#0000ff" />
                : '' }  
              
              </View>
            </View>

            <View style={styles.row}>
              <View 
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#006110',
                    paddingBottom: 20
                  }}>
                <Text style={{
                      flex: 1,
                      marginLeft: 5,
                      marginTop: 8,
                      fontSize: 25
                    }}>Detalles de Recepciones</Text>

                { _recepcionesDetalles === 'upload' ?
                    <Icon 
                      name='cloud-upload'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'blue'
                      }}
                    />
                : '' }

                { _recepcionesDetalles === 'success' ?
                    <Icon 
                      name='checkmark'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'green'
                      }}
                    />
                : '' }

                { _recepcionesDetalles === 'warning' ?
                    <Icon 
                      name='warning'
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'yellow'
                      }}
                    />
                : '' }

                { _recepcionesDetalles === 'loading' ?
                  <ActivityIndicator size="large" color="#0000ff" />
                : '' }  

              </View>
            </View>
            </View>
            </ScrollView>

        </View>

        }
    </View>


    
  )
}
