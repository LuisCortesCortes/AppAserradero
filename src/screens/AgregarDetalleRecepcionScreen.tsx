import React, { useContext, useEffect, useState } from 'react'
import { Platform, Alert, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/recepcionTheme';
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { db } from '../utils/db'
import { SQLiteDatabase, Transaction, ResultSet } from 'react-native-sqlite-storage'
import { Dropdown } from 'react-native-element-dropdown'
import { StackScreenProps } from '@react-navigation/stack'
import { RecepcionDetallesContext } from '../context/RecepcionDetallesContext';
import { useForm } from '../hooks/useForm';


interface Props extends StackScreenProps<any, any>{};

export const AgregarDetalleRecepcionScreen = ({ navigation, route } : Props) => {

  const [isLoading, setIsLoading] = useState( true );
  
  // fuentes de datos
  const [_Id, setId] = useState(0);
  const [_FirstLoad, setFirstLoad] = useState(true);
  const [_Productos, setProductos] = useState([]);
  const [_Proveedor, setProveedor] = useState('');
  const [_LargoFactura, setLargoFactura] = useState(3.2);
  const [_maderaId, setMaderaId] = useState(0);

  const [isFocus, setIsFocus] = useState(false);

  // cantidad
  const [cantidad12, setCantidad12] = useState(0);
  const [cantidad14, setCantidad14] = useState(0);
  const [cantidad16, setCantidad16] = useState(0);
  const [cantidad18, setCantidad18] = useState(0);
  const [cantidad20, setCantidad20] = useState(0);
  const [cantidad22, setCantidad22] = useState(0);
  const [cantidad24, setCantidad24] = useState(0);
  const [cantidad26, setCantidad26] = useState(0);
  const [cantidad28, setCantidad28] = useState(0);
  const [cantidad30, setCantidad30] = useState(0);
  const [cantidad32, setCantidad32] = useState(0);
  const [cantidad34, setCantidad34] = useState(0);
  const [cantidad36, setCantidad36] = useState(0);
  const [cantidad38, setCantidad38] = useState(0);
  const [cantidad40, setCantidad40] = useState(0);
  const [cantidad42, setCantidad42] = useState(0);
  const [cantidad44, setCantidad44] = useState(0);
  const [cantidad46, setCantidad46] = useState(0);
  const [cantidad48, setCantidad48] = useState(0);
  const [cantidad50, setCantidad50] = useState(0);
  const [cantidad52, setCantidad52] = useState(0);
  const [cantidad54, setCantidad54] = useState(0);
  const [cantidad56, setCantidad56] = useState(0);
  const [cantidad58, setCantidad58] = useState(0);
  const [cantidad60, setCantidad60] = useState(0);
  const [cantidad62, setCantidad62] = useState(0);
  const [cantidad64, setCantidad64] = useState(0);
  const [cantidad66, setCantidad66] = useState(0);
  const [cantidad68, setCantidad68] = useState(0);
  const [cantidad70, setCantidad70] = useState(0);

  // metro cubico M3
  const [mc12, setMc12] = useState(0);
  const [mc14, setMc14] = useState(0);
  const [mc16, setMc16] = useState(0);
  const [mc18, setMc18] = useState(0);
  const [mc20, setMc20] = useState(0);
  const [mc22, setMc22] = useState(0);
  const [mc24, setMc24] = useState(0);
  const [mc26, setMc26] = useState(0);
  const [mc28, setMc28] = useState(0);
  const [mc30, setMc30] = useState(0);
  const [mc32, setMc32] = useState(0);
  const [mc34, setMc34] = useState(0);
  const [mc36, setMc36] = useState(0);
  const [mc38, setMc38] = useState(0);
  const [mc40, setMc40] = useState(0);
  const [mc42, setMc42] = useState(0);
  const [mc44, setMc44] = useState(0);
  const [mc46, setMc46] = useState(0);
  const [mc48, setMc48] = useState(0);
  const [mc50, setMc50] = useState(0);
  const [mc52, setMc52] = useState(0);
  const [mc54, setMc54] = useState(0);
  const [mc56, setMc56] = useState(0);
  const [mc58, setMc58] = useState(0);
  const [mc60, setMc60] = useState(0);
  const [mc62, setMc62] = useState(0);
  const [mc64, setMc64] = useState(0);
  const [mc66, setMc66] = useState(0);
  const [mc68, setMc68] = useState(0);
  const [mc70, setMc70] = useState(0);


  // precios
  const [precio12, setPrecio12] = useState(0);
  const [precio14, setPrecio14] = useState(0);
  const [precio16, setPrecio16] = useState(0);
  const [precio18, setPrecio18] = useState(0);
  const [precio20, setPrecio20] = useState(0);
  const [precio22, setPrecio22] = useState(0);
  const [precio24, setPrecio24] = useState(0);
  const [precio26, setPrecio26] = useState(0);
  const [precio28, setPrecio28] = useState(0);
  const [precio30, setPrecio30] = useState(0);
  const [precio32, setPrecio32] = useState(0);
  const [precio34, setPrecio34] = useState(0);
  const [precio36, setPrecio36] = useState(0);
  const [precio38, setPrecio38] = useState(0);
  const [precio40, setPrecio40] = useState(0);
  const [precio42, setPrecio42] = useState(0);
  const [precio44, setPrecio44] = useState(0);
  const [precio46, setPrecio46] = useState(0);
  const [precio48, setPrecio48] = useState(0);
  const [precio50, setPrecio50] = useState(0);
  const [precio52, setPrecio52] = useState(0);
  const [precio54, setPrecio54] = useState(0);
  const [precio56, setPrecio56] = useState(0);
  const [precio58, setPrecio58] = useState(0);
  const [precio60, setPrecio60] = useState(0);
  const [precio62, setPrecio62] = useState(0);
  const [precio64, setPrecio64] = useState(0);
  const [precio66, setPrecio66] = useState(0);
  const [precio68, setPrecio68] = useState(0);
  const [precio70, setPrecio70] = useState(0);

  // total
  const [total12, setTotal12] = useState(0);
  const [total14, setTotal14] = useState(0);
  const [total16, setTotal16] = useState(0);
  const [total18, setTotal18] = useState(0);
  const [total20, setTotal20] = useState(0);
  const [total22, setTotal22] = useState(0);
  const [total24, setTotal24] = useState(0);
  const [total26, setTotal26] = useState(0);
  const [total28, setTotal28] = useState(0);
  const [total30, setTotal30] = useState(0);
  const [total32, setTotal32] = useState(0);
  const [total34, setTotal34] = useState(0);
  const [total36, setTotal36] = useState(0);
  const [total38, setTotal38] = useState(0);
  const [total40, setTotal40] = useState(0);
  const [total42, setTotal42] = useState(0);
  const [total44, setTotal44] = useState(0);
  const [total46, setTotal46] = useState(0);
  const [total48, setTotal48] = useState(0);
  const [total50, setTotal50] = useState(0);
  const [total52, setTotal52] = useState(0);
  const [total54, setTotal54] = useState(0);
  const [total56, setTotal56] = useState(0);
  const [total58, setTotal58] = useState(0);
  const [total60, setTotal60] = useState(0);
  const [total62, setTotal62] = useState(0);
  const [total64, setTotal64] = useState(0);
  const [total66, setTotal66] = useState(0);
  const [total68, setTotal68] = useState(0);
  const [total70, setTotal70] = useState(0);

  
  // totales
  const [totalMC, setTotalMC] = useState(0);
  const [totalValorFlete, setTotalValorFlete] = useState(0);
  const [totalValorFleteMC, setTotalValorFleteMC] = useState(0);
  const [totalNeto, setTotalNeto] = useState(0);
  const [iva, setIva] = useState(19);
  const [totalIva, setTotalIva] = useState(0);
  const [totalRecepcion, setTotalRecepcion] = useState(0);
  const [totalTrozos, setTotalTrozos] = useState(0);

  // incrementadores de cantidad

  const calcarM3 = (diametro: number, largo: number, cantidad: number):number => {

    let mc = (((diametro * diametro * largo)/10000)* cantidad);
    return mc;
  }

  const calcularM3Total = async() => {
    
    let mc = mc12 + mc14 + mc16 + mc18 + mc20 + mc22 + mc24 + mc26 + mc28 + mc30 + mc32 + mc34 + mc36 + mc38 + mc40 + mc42 + mc44 + mc46 + mc48 + mc50 + mc52 + mc54 + mc56 + mc58 + mc60 + mc62 + mc64 + mc66 + mc68 + mc70;
    return mc;
  }

  //const { grabarDetalle } : any = useContext(RecepcionDetallesContext);

  const setIdRecepcion = async() => {

    return new Promise((resolve:any, reject) => {
      let id = route.params?.id === null ? 0 : route.params?.id;

      setId(id);
      resolve();
    });
  
  }

  const getRecepcion = async() => {

    const db :SQLiteDatabase = await getDbConnection();

    let id = route.params?.id === null ? 0 : route.params?.id;
    const tasks: any = [];
    
    if(id > 0){
      const query =
      `select * from recepciones where id = ${id};`;

      const result = await db.executeSql(query);

      result.forEach(function (resultSet) {

        tasks.push({
          valor_flete: resultSet.rows.item(0).flete,
          total_neto: resultSet.rows.item(0).neto,
          total_iva: resultSet.rows.item(0).iva,
          total_recepcion: resultSet.rows.item(0).total,
        });

      });
    }  
    
    return tasks;

  }
  
  const getDetalles = async() => {

    const db :SQLiteDatabase = await getDbConnection();

    let id = route.params?.id === null ? 0 : route.params?.id;
    const tasks: any = [];
    
    if(id > 0){
      const query =
      `select * from recepcion_detalles where recepcion_id = ${id} order by diametro asc;`;

      const result = await db.executeSql(query);

      result.forEach(function (resultSet) {

        for (let index = 0; index < resultSet.rows.length; index++) {

          tasks.push({
            diametro: resultSet.rows.item(index).diametro,
            cantidad: resultSet.rows.item(index).cant_despacho,
            mc: resultSet.rows.item(index).mc_despacho,
            precio: resultSet.rows.item(index).precio,
            total: resultSet.rows.item(index).total
          });

          
        }

      });

      return tasks;
    }       

  }

  const getProductos = async() => {
        
    try{

        

        const db :SQLiteDatabase = await getDbConnection();
        const tasks: any = [];
        const query = `select * from productos`;
                
        const result = await db.executeSql(query);

        result.forEach(function (resultSet) {
            for (let index = 0; index < resultSet.rows.length; index++) {

              tasks.push({
                value: resultSet.rows.item(index).id,
                label: `${ resultSet.rows.item(index).nombre }`,
              });

            }
        });
        
        setProductos(tasks);


      } catch (ex: any) {

          Alert.alert('Error', ex.message , [{
              text: 'Aceptar',
              //onPress: () => console.log('Cancelando'),
              style: 'default'
          }])
      }
  }

  const getTipoTrozos = async() => {
        
    try{

        const db :SQLiteDatabase = await getDbConnection();
        const tasks: any = [];
        const query = 
        `select tm.id as tm_id, m.id as id, m.nombre as nombre
          from tipo_maderas tm 
              inner join maderas m on tm.id = m.tipo_madera_id
              where tm.id=9
          order by tm.id, m.nombre asc;`;
                
        const result = await db.executeSql(query);

        result.forEach(function (resultSet) {
            for (let index = 0; index < resultSet.rows.length; index++) {

              tasks.push({
                value: resultSet.rows.item(index).id,
                label: `${ resultSet.rows.item(index).nombre }`,
              });

            }
        });
        
        setProductos(tasks);

      } catch (ex: any) {

          Alert.alert('Error', ex.message , [{
              text: 'Aceptar',
              //onPress: () => console.log('Cancelando'),
              style: 'default'
          }])
      }
  }

  const getProveedor = async() => {
        
    try{

        let proveedorId = route.params?.proveedorId === null ? 0 : route.params?.proveedorId;

          if(proveedorId > 0){

            const db :SQLiteDatabase = await getDbConnection();
            const tasks: any = [];
            const query = 
            `select * from empresas where proveedor = 1 and id = ${proveedorId};`;
                    
            const result = await db.executeSql(query);
    
            result.forEach(function (resultSet) {
              setProveedor(resultSet.rows.item(0).razon_social);
            });
                
          } 

        }catch (ex: any) {

          Alert.alert('Error', ex.message , [{
              text: 'Aceptar',
              //onPress: () => console.log('Cancelando'),
              style: 'default'
          }])
      }
       
  }

  const getPrecios = async() => {
    try{

      let proveedorId = route.params?.proveedorId === null ? 0 : route.params?.proveedorId;

        if(proveedorId > 0){

          const db :SQLiteDatabase = await getDbConnection();
          const tasks: any = [];
          const query = 
          `select * from proveedor_precios pp
            inner join precio_diametros pd on pd.pprecio_id = pp.id
            where pp.proveedor_id = ${proveedorId}
            order by pd.diametro asc;`;
                  
          const result = await db.executeSql(query);
  
          result.forEach(function (resultSet) {
            for (let index = 0; index < resultSet.rows.length; index++) {
              console.log("PRECIOS")
              console.log(`DIAMETRO: ${resultSet.rows.item(index).diametro}`);

              if(resultSet.rows.item(index).diametro === 12){
                console.log(resultSet.rows.item(index).valor_m3);
                setPrecio12(resultSet.rows.item(index).valor_m3);
              }

              if(resultSet.rows.item(index).diametro === 14){
                setPrecio14(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 16){
                setPrecio16(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 18){
                setPrecio18(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 20){
                setPrecio20(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 22){
                setPrecio22(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 24){
                setPrecio24(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 26){
                setPrecio26(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 28){
                setPrecio28(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 30){
                setPrecio30(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 32){
                setPrecio32(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index)?.diametro === 34){
                setPrecio34(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 36){
                setPrecio36(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 38){
                setPrecio38(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 40){
                setPrecio40(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 42){
                setPrecio42(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 44){;
                setPrecio44(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 46){
                setPrecio46(resultSet.rows.item(index).valor_m3);
              }
    
    
              if(resultSet.rows.item(index).diametro === 48){
                setPrecio48(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 50){
                setPrecio50(resultSet.rows.item(index).valor_m3);

              }
    
              if(resultSet.rows.item(index).diametro === 52){
                setPrecio52(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 54){
                setPrecio54(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 56){
                setPrecio56(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 58){
                setPrecio58(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 60){
                setPrecio60(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 62){
                setPrecio62(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 64){
                setPrecio64(resultSet.rows.item(index).valor_m3);

              }
    
              if(resultSet.rows.item(index).diametro === 66){
                setPrecio66(resultSet.rows.item(index).valor_m3);
              }
    
              if(resultSet.rows.item(index).diametro === 68){
                setPrecio68(resultSet.rows.item(index).valor_m3);;
              }
    
              if(resultSet.rows.item(index).diametro === 70){
                setPrecio70(resultSet.rows.item(index).valor_m3);
              }
            }
          });
            
        } 
       
      }catch (ex: any) {

        Alert.alert('Error', ex.message , [{
            text: 'Aceptar',
            //onPress: () => console.log('Cancelando'),
            style: 'default'
        }])
    }
  }

  const calularFleteTotal = async() => {
    
    let vt = totalMC * totalValorFleteMC;
    setTotalValorFlete(vt);
  }

  const calcularTotales = async() => {
    let neto = total12 + total14 + total16 + total18 + total20 + total22 + total24 + total26 + total28 + total30 + total32 + total34 + total36 + total38 + total40 + total42 + total44 + total46 + total48 + total50 + total52 + total54 + total56 + total58 + total60 + total62 + total64 + total66 + total68 + total70;
    let iva = neto * 0.19;
    let total = neto + iva;
    
    setTotalNeto(neto);
    setTotalIva(iva);
    setTotalRecepcion(total);
  }


  useEffect(() => {

    if(_FirstLoad){

      const cargaInicial = async() => {
        setIsLoading(true);
        setMaderaId(route.params?.maderaId !== undefined ? route.params?.maderaId : 0);

        await setIdRecepcion();
        await getTipoTrozos();
        await getProveedor();
        await getPrecios();
        const detalles = await getDetalles();
        let total_trozos: number = 0;
        for (let index = 0; index < detalles.length; index++) {

          if(detalles[index].diametro === 12){

            setCantidad12(detalles[index].cantidad);
            setMc12(detalles[index].mc);
            setPrecio12(detalles[index].precio);
            setTotal12(detalles[index].total);
          }

          if(detalles[index].diametro === 14){
            setCantidad14(detalles[index].cantidad);
            setMc14(detalles[index].mc);
            setPrecio14(detalles[index].precio);
            setTotal14(detalles[index].total);
          }

          if(detalles[index].diametro === 16){
            setCantidad16(detalles[index].cantidad);
            setMc16(detalles[index].mc);
            setPrecio16(detalles[index].precio);
            setTotal16(detalles[index].total);
          }

          if(detalles[index]?.diametro === 18){
            setCantidad18(detalles[index].cantidad);
            setMc18(detalles[index].mc);
            setPrecio18(detalles[index].precio);
            setTotal18(detalles[index].total);
          }

          if(detalles[index]?.diametro === 20){
            setCantidad20(detalles[index].cantidad);
            setMc20(detalles[index].mc);
            setPrecio20(detalles[index].precio);
            setTotal20(detalles[index].total);
          }

          if(detalles[index]?.diametro === 22){
            setCantidad22(detalles[index].cantidad);
            setMc22(detalles[index].mc);
            setPrecio22(detalles[index].precio);
            setTotal22(detalles[index].total);
          }

          if(detalles[index]?.diametro === 24){
            setCantidad24(detalles[index].cantidad);
            setMc24(detalles[index].mc);
            setPrecio24(detalles[index].precio);
            setTotal24(detalles[index].total);
          }

          if(detalles[index]?.diametro === 26){
            setCantidad26(detalles[index].cantidad);
            setMc26(detalles[index].mc);
            setPrecio26(detalles[index].precio);
            setTotal26(detalles[index].total);
          }

          if(detalles[index]?.diametro === 28){
            setCantidad28(detalles[index].cantidad);
            setMc28(detalles[index].mc);
            setPrecio28(detalles[index].precio);
            setTotal28(detalles[index].total);
          }

          if(detalles[index]?.diametro === 30){
            setCantidad30(detalles[index].cantidad);
            setMc30(detalles[index].mc);
            setPrecio30(detalles[index].precio);
            setTotal30(detalles[index].total);
          }

          if(detalles[index]?.diametro === 32){
            setCantidad32(detalles[index].cantidad);
            setMc32(detalles[index].mc);
            setPrecio32(detalles[index].precio);
            setTotal32(detalles[index].total);
          }

          if(detalles[index]?.diametro === 34){
            setCantidad34(detalles[index].cantidad);
            setMc34(detalles[index].mc);
            setPrecio34(detalles[index].precio);
            setTotal34(detalles[index].total);
          }

          if(detalles[index].diametro === 36){
            setCantidad36(detalles[index].cantidad);
            setMc36(detalles[index].mc);
            setPrecio36(detalles[index].precio);
            setTotal36(detalles[index].total);
          }

          if(detalles[index].diametro === 38){
            setCantidad38(detalles[index].cantidad);
            setMc38(detalles[index].mc);
            setPrecio38(detalles[index].precio);
            setTotal38(detalles[index].total);
          }

          if(detalles[index].diametro === 40){
            setCantidad40(detalles[index].cantidad);
            setMc40(detalles[index].mc);
            setPrecio40(detalles[index].precio);
            setTotal40(detalles[index].total);
          }

          if(detalles[index].diametro === 42){
            setCantidad42(detalles[index].cantidad);
            setMc42(detalles[index].mc);
            setPrecio42(detalles[index].precio);
            setTotal42(detalles[index].total);
          }

          if(detalles[index].diametro === 44){
            setCantidad44(detalles[index].cantidad);
            setMc44(detalles[index].mc);
            setPrecio44(detalles[index].precio);
            setTotal44(detalles[index].total);
          }

          if(detalles[index].diametro === 46){
            setCantidad46(detalles[index].cantidad);
            setMc46(detalles[index].mc);
            setPrecio46(detalles[index].precio);
            setTotal46(detalles[index].total);
          }


          if(detalles[index].diametro === 48){
            setCantidad48(detalles[index].cantidad);
            setMc48(detalles[index].mc);
            setPrecio48(detalles[index].precio);
            setTotal48(detalles[index].total);
          }

          if(detalles[index].diametro === 50){
            setCantidad50(detalles[index].cantidad);
            setMc50(detalles[index].mc);
            setPrecio50(detalles[index].precio);
            setTotal50(detalles[index].total);
          }

          if(detalles[index].diametro === 52){
            setCantidad52(detalles[index].cantidad);
            setMc52(detalles[index].mc);
            setPrecio52(detalles[index].precio);
            setTotal52(detalles[index].total);
          }

          if(detalles[index].diametro === 54){
            setCantidad54(detalles[index].cantidad);
            setMc54(detalles[index].mc);
            setPrecio54(detalles[index].precio);
            setTotal54(detalles[index].total);
          }

          if(detalles[index].diametro === 56){
            setCantidad56(detalles[index].cantidad);
            setMc56(detalles[index].mc);
            setPrecio56(detalles[index].precio);
            setTotal56(detalles[index].total);
          }

          if(detalles[index].diametro === 58){
            setCantidad58(detalles[index].cantidad);
            setMc58(detalles[index].mc);
            setPrecio58(detalles[index].precio);
            setTotal58(detalles[index].total);
          }

          if(detalles[index].diametro === 60){
            setCantidad60(detalles[index].cantidad);
            setMc60(detalles[index].mc);
            setPrecio60(detalles[index].precio);
            setTotal60(detalles[index].total);
          }

          if(detalles[index].diametro === 62){
            setCantidad62(detalles[index].cantidad);
            setMc62(detalles[index].mc);
            setPrecio62(detalles[index].precio);
            setTotal62(detalles[index].total);
          }

          if(detalles[index].diametro === 64){
            setCantidad64(detalles[index].cantidad);
            setMc64(detalles[index].mc);
            setPrecio64(detalles[index].precio);
            setTotal64(detalles[index].total);
          }

          if(detalles[index].diametro === 66){
            setCantidad66(detalles[index].cantidad);
            setMc66(detalles[index].mc);
            setPrecio66(detalles[index].precio);
            setTotal66(detalles[index].total);
          }

          if(detalles[index].diametro === 68){
            setCantidad68(detalles[index].cantidad);
            setMc68(detalles[index].mc);
            setPrecio68(detalles[index].precio);
            setTotal68(detalles[index].total);
          }

          if(detalles[index].diametro === 70){
            setCantidad70(detalles[index].cantidad);
            setMc70(detalles[index].mc);
            setPrecio70(detalles[index].precio);
            setTotal70(detalles[index].total);
          }

          total_trozos = Number(total_trozos) + Number(detalles[index].cantidad);
        }

        const m3 = await calcularM3Total();
        await calularFleteTotal();
        await calcularTotales();

        const totales = await getRecepcion();
        setTotalTrozos(total_trozos);
        setTotalMC(m3);
        setTotalValorFlete(totales[0].valor_flete);
        setTotalNeto(totales[0].total_neto);
        setTotalIva(totales[0].total_iva);
        setTotalRecepcion(totales[0].total_recepcion);

        setIsLoading(false);
        setFirstLoad(false);
      }

      cargaInicial();
    }

  }, 
  [
    _FirstLoad,
    //totalValorFlete
  ])

  const {
      id,
      recepcion_id,
      producto_id,
      diametro_12,
      diametro_14,
      diametro_16,
      diametro_18,
      diametro_20,
      diametro_22,
      diametro_24,
      diametro_26,
      diametro_28,
      diametro_30,
      diametro_32,
      diametro_34,
      diametro_36,
      diametro_38,
      diametro_40,
      diametro_42,
      diametro_44,
      diametro_46,
      diametro_48,
      diametro_50,
      diametro_52,
      diametro_54,
      diametro_56,
      diametro_58,
      diametro_60,
      diametro_62,
      diametro_64,
      diametro_66,
      diametro_68,
      diametro_70,
      volumen,
      esperor,
      ancho,
      largo,
      cant_despacho,
      mc_despacho,
      pulg_despacho,
      mruma_despacho,
      cant_recepcion,
      mc_recepcion,
      pulg_recepcion,
      mruma_recepcion,
      precio,
      total,
      created_id,
      updated_id,
      deleted_id,
      created_at,
      updated_at,
      deleted_at,
      form,
      onChange, setFormValue } = useForm({
      id: '0',
      recepcion_id: '0',
      producto_id: '0',
      diametro_12: {
        diametro: '12'
      },
      cantidad12:'0',
      diametro_14: {
        diametro: '14'
      },
      diametro_16: {
        diametro: '16'
      },
      diametro_18: {
        diametro: '18'
      },
      diametro_20: {
        diametro: '20'
      },
      diametro_22: {
        diametro: '22'
      },
      diametro_24: {
        diametro: '24'
      },
      diametro_26: {
        diametro: '26'
      },
      diametro_28: {
        diametro: '28'
      },
      diametro_30: {
        diametro: '30'
      },
      diametro_32: {
        diametro: '32'
      },
      diametro_34: {
        diametro: '34'
      },
      diametro_36: {
        diametro: '36'
      },
      diametro_38: {
        diametro: '38'
      },
      diametro_40: {
        diametro: '40'
      },
      diametro_42: {
        diametro: '42'
      },
      diametro_44: {
        diametro: '44'
      },
      diametro_46: {
        diametro: '46'
      },
      diametro_48: {
        diametro: '48'
      },
      diametro_50: {
        diametro: '50'
      },
      diametro_52: {
        diametro: '52'
      },
      diametro_54: {
        diametro: '54'
      },
      diametro_56: {
        diametro: '56'
      },
      diametro_58: {
        diametro: '58'
      },
      diametro_60: {
        diametro: '60'
      },
      diametro_62: {
        diametro: '62'
      },
      diametro_64: {
        diametro: '64'
      },
      diametro_66: {
        diametro: '66'
      },
      diametro_68: {
        diametro: '68'
      },
      diametro_70: {
        diametro: '70'
      },
      volumen: '0',
      esperor: '0',
      ancho: '0',
      largo: '0',
      cant_despacho: '0',
      mc_despacho: '0',
      pulg_despacho: '0',
      mruma_despacho: '0',
      cant_recepcion: '0',
      mc_recepcion: '0',
      pulg_recepcion: '0',
      mruma_recepcion: '0',
      precio: '0',
      total: '0',
      created_id: '0',
      updated_id: '0',
      deleted_id: '0',
      created_at: '0',
      updated_at: '0',
      deleted_at: '0',
    });
    
  const sumaTrozos = async() => {

    let totalTrozos : number = 
      cantidad12 + 
      cantidad14 + 
      cantidad16 + 
      cantidad18 + 
      cantidad20 + 
      cantidad22 + 
      cantidad24 + 
      cantidad26 + 
      cantidad28 + 
      cantidad30 + 
      cantidad32 + 
      cantidad34 + 
      cantidad36 + 
      cantidad38 + 
      cantidad40 + 
      cantidad42 + 
      cantidad44 + 
      cantidad46 + 
      cantidad48 + 
      cantidad50 + 
      cantidad52 + 
      cantidad54 + 
      cantidad56 + 
      cantidad58 + 
      cantidad60 + 
      cantidad62 + 
      cantidad64 + 
      cantidad66 + 
      cantidad68 + 
      cantidad70;
    
    setTotalTrozos(totalTrozos);
    
  }

  const grabarDetalle = async( id: number, recepcion_id: number, producto_id: number, diametro: number, cant_despacho: number, mc_despacho: number, precio: number, total: number, tipo: String ) => {
    try{


        console.log(tipo)
        if (tipo === 'trozos') {

            const query_exists = `select count(*) as count from recepcion_detalles where recepcion_id = ${recepcion_id} and diametro = ${diametro}`;
            console.log(query_exists);

            const exists = await db.executeSql(query_exists);
            
            if (parseInt(exists[0].rows.item(0).count) > 0){

              const query =
              `update recepcion_detalles 
                set
                  producto_id = ${producto_id},
                  cant_despacho = ${cant_despacho},
                  mc_despacho = ${mc_despacho},
                  cant_recepcion = ${cant_recepcion},
                  mc_recepcion = ${mc_recepcion},
                  precio = ${precio},
                  total = ${total}
                where
                  recepcion_id = ${ recepcion_id} and 
                  diametro = ${diametro};`;
                  console.log(query);
                  db.executeSql(query);    
                  console.log(`Recepción N° ${recepcion_id}, actualizado para el diámetro ${diametro}`);   

            } else {

              const query =
              `insert into recepcion_detalles 
                  (
                      recepcion_id,
                      producto_id,
                      diametro,
                      cant_despacho,
                      mc_despacho,
                      cant_recepcion,
                      mc_recepcion,
                      precio,
                      total
                  ) values (
                      ${recepcion_id},
                      ${producto_id},
                      ${diametro},
                      ${cant_despacho},
                      ${mc_despacho},
                      ${cant_despacho},
                      ${mc_despacho},
                      ${precio},
                      ${total}
                  );`;

                  console.log(query);

                  db.executeSql(query);
                  console.log(`Recepción N° ${recepcion_id}, ingresado para el diámetro ${diametro}`);  
       
            }
            
        }

    }
    catch(ex: any){
        console.log(ex.message);
        Alert.alert('Error', ex.message , [{
            text: 'Aceptar',

            //onPress: () => console.log('Cancelando'),
            style: 'default'
        }])
    }

    return true;
  }

  const grabarTotales = async( recepcion_id: number, tipo_madera_id: number, madera_id: number, flete: number, poriva: number, neto: number, iva: number, total: number) => {
        

    (await db).transaction(async txn => {

      const query = `
          update recepciones 
            set 
                tipo_madera_id = ${tipo_madera_id}, 
                madera_id = ${madera_id}, 
                flete = ${flete},
                poriva = ${poriva}, 
                neto = ${neto}, 
                iva = ${iva},
                total = ${total}
            where id = ${recepcion_id}`;


      txn.executeSql(query,
        [],
        (sqlTxn: Transaction, res: ResultSet) => {
          console.log("Totales de Recepción guardados exitosamente");

        },
        error => {
          console.log("Error al guardar Totales de Recepción");
          Alert.alert('Error', "Error al guardar Totales de Recepción", [{
            text: 'Aceptar',
            style: 'default'
          }])

        });

    });

    return true;
  }

  const onSave = async() => {

    Keyboard.dismiss(); // ocultar teclado

    // validar campos vacíos

    // llamar métodos insert or update
    if(form.id === '0'){
      console.log("Grabando detalles");
      cantidad12 > 0 ?  await grabarDetalle(0, _Id, 1, 12, cantidad12, mc12, precio12, total12, 'trozos'): '';
      cantidad14 > 0 ?  await grabarDetalle(0, _Id, 1, 14, cantidad14, mc14, precio14, total14, 'trozos'): '';
      cantidad16 > 0 ?  await grabarDetalle(0, _Id, 1, 16, cantidad16, mc16, precio16, total16, 'trozos'): '';
      cantidad18 > 0 ?  await grabarDetalle(0, _Id, 1, 18, cantidad18, mc18, precio18, total18, 'trozos'): '';
      cantidad20 > 0 ?  await grabarDetalle(0, _Id, 1, 20, cantidad20, mc20, precio20, total20, 'trozos'): '';
      cantidad22 > 0 ?  await grabarDetalle(0, _Id, 1, 22, cantidad22, mc22, precio22, total22, 'trozos'): '';
      cantidad24 > 0 ?  await grabarDetalle(0, _Id, 1, 24, cantidad24, mc24, precio24, total24, 'trozos'): '';
      cantidad26 > 0 ?  await grabarDetalle(0, _Id, 1, 26, cantidad26, mc26, precio26, total26, 'trozos'): '';
      cantidad28 > 0 ?  await grabarDetalle(0, _Id, 1, 28, cantidad28, mc28, precio28, total28, 'trozos'): '';
      cantidad30 > 0 ?  await grabarDetalle(0, _Id, 1, 30, cantidad30, mc30, precio30, total30, 'trozos'): '';
      cantidad32 > 0 ?  await grabarDetalle(0, _Id, 1, 32, cantidad32, mc32, precio32, total32, 'trozos'): '';
      cantidad34 > 0 ?  await grabarDetalle(0, _Id, 1, 34, cantidad34, mc34, precio34, total34, 'trozos'): '';
      cantidad36 > 0 ?  await grabarDetalle(0, _Id, 1, 36, cantidad36, mc36, precio36, total36, 'trozos'): '';
      cantidad38 > 0 ?  await grabarDetalle(0, _Id, 1, 38, cantidad38, mc38, precio38, total38, 'trozos'): '';
      cantidad40 > 0 ?  await grabarDetalle(0, _Id, 1, 40, cantidad40, mc40, precio40, total40, 'trozos'): '';
      cantidad42 > 0 ?  await grabarDetalle(0, _Id, 1, 42, cantidad42, mc42, precio42, total42, 'trozos'): '';
      cantidad44 > 0 ?  await grabarDetalle(0, _Id, 1, 44, cantidad44, mc44, precio44, total44, 'trozos'): '';
      cantidad46 > 0 ?  await grabarDetalle(0, _Id, 1, 46, cantidad46, mc46, precio46, total46, 'trozos'): '';
      cantidad48 > 0 ?  await grabarDetalle(0, _Id, 1, 48, cantidad48, mc48, precio48, total48, 'trozos'): '';
      cantidad50 > 0 ?  await grabarDetalle(0, _Id, 1, 50, cantidad50, mc50, precio50, total50, 'trozos'): '';
      cantidad52 > 0 ?  await grabarDetalle(0, _Id, 1, 52, cantidad52, mc52, precio52, total52, 'trozos'): '';
      cantidad54 > 0 ?  await grabarDetalle(0, _Id, 1, 54, cantidad54, mc54, precio54, total54, 'trozos'): '';
      cantidad56 > 0 ?  await grabarDetalle(0, _Id, 1, 56, cantidad56, mc56, precio56, total56, 'trozos'): '';
      cantidad58 > 0 ?  await grabarDetalle(0, _Id, 1, 58, cantidad58, mc58, precio58, total58, 'trozos'): '';
      cantidad60 > 0 ?  await grabarDetalle(0, _Id, 1, 60, cantidad60, mc60, precio60, total60, 'trozos'): '';
      cantidad62 > 0 ?  await grabarDetalle(0, _Id, 1, 62, cantidad62, mc62, precio62, total62, 'trozos'): '';
      cantidad64 > 0 ?  await grabarDetalle(0, _Id, 1, 64, cantidad64, mc64, precio64, total64, 'trozos'): '';
      cantidad66 > 0 ?  await grabarDetalle(0, _Id, 1, 66, cantidad66, mc66, precio66, total66, 'trozos'): '';
      cantidad68 > 0 ?  await grabarDetalle(0, _Id, 1, 68, cantidad68, mc68, precio68, total68, 'trozos'): '';
      cantidad70 > 0 ?  await grabarDetalle(0, _Id, 1, 70, cantidad70, mc70, precio70, total70, 'trozos'): '';

      // grabar totales
      await grabarTotales(_Id, 9, _maderaId, totalValorFlete, iva, totalNeto, totalIva, totalRecepcion);
      console.log("Fin Grabando detalles");
    }


  }

  return (
    <View style={[styles.container, { flex: 1 }]}>

      <Text style={styles.title } >Detalle de Recepción Folio N° { _Id }</Text>
      <View style={styles.BarMenuTitle}></View>

      <ScrollView>
      { isLoading ? 
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#006110" />
        </View>
      :

        <View>

          <View style={styles.card }>

            <View style={ styles.row }>

              <View style={{ flex: 1 }} >
                <Text style={ styles.label }>Proveedor</Text>
                <TextInput
                  placeholder='Ingrese Proveedor'
                  style={ styles.numDocumento }
                  value={ _Proveedor }
                />
              </View>

              <View style={{ flex: 1 }} >
                <Text style={ styles.label }>Producto</Text>
                <Text style={ styles.label }>Tipo Trozo</Text>
                    <Dropdown
                      style={[styles.dropdown, styles.tipoDocumento, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={_Productos}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      value={ _maderaId.toString() }
                      placeholder={'Seleccione Tipo Recepción'}
                      searchPlaceholder="Buscar..."
                      // onFocus={() => setIsFocus(true)}
                      // onBlur={() => setIsFocus(false)}
                      onChange={(item) => {

                        // asignar tipo recepción a formulario
                        // onChange(item.value, 'tipo_madera_id');

                        // // obtener lista de maderas filtradas por tipo de recepción
                        // if(item.value !== ''){

                        //     getMaderas(parseInt(item.value));
                        // } else {
                        //     console.log("DESHABILITAR MADERA");
                        // }
                      }}
                    />
              </View>

              <View style={{ flex: 1 }} >
                <Text style={ styles.label }>Largo Facturado</Text>
                <TextInput
                  placeholder='Ingrese Largo Facturado'
                  style={ styles.numDocumento }
                  value={ _LargoFactura.toString() }
                />
              </View>

            </View>

            <View style={ styles.row }>
              <View style={{ flex: 1, marginTop: 30 }} ></View>
            </View>

            <View style={ styles.row }>

                  {/* columna 1 */}
                  <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1
                  }}>

                    <View style={[styles.row, { flex: 1}]}>
                      <Text style={{ flex: 1}}>Diá</Text>
                      <Text style={{ flex: 1}}>Cant.</Text>
                      <Text style={{ flex: 1}}></Text>
                      <Text style={{ flex: 1}}>M3</Text>
                      <Text style={{ flex: 1}}>Precio</Text>
                      <Text style={{ flex: 1}}>Total</Text>
                    </View>

                    {/* diametro 12 */}
                    <View style={[styles.row, { flex: 1}]}>
                      <Text style={styles.diametro}>
                        { diametro_12.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad12.toString() }
                        onChangeText={ (value) => setCantidad12(parseInt(value))}
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad12(cantidad12 + 1);
                          setMc12(calcarM3(12, _LargoFactura, cantidad12));
                          setTotal12(mc12 * precio12);
                          await sumaTrozos();
                          setTotalMC(await calcularM3Total());
                          await calcularTotales();
                          }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad12(cantidad12 - 1);
                          setMc12(calcarM3(12, _LargoFactura, cantidad12));
                          setTotal12(mc12 * precio12);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                      }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc12.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio12(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio12.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total12.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 14 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_14.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad14.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad14(cantidad14 + 1);
                          setMc14(calcarM3(14, _LargoFactura, cantidad14));
                          setTotal14(mc14 * precio14);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad14(cantidad14 - 1);
                          setMc14(calcarM3(14, _LargoFactura, cantidad14));
                          setTotal14(mc14 * precio14);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                      }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc14.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio14(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio14.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total14.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 16 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_16.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad16.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad16(cantidad16 + 1);
                          setMc16(calcarM3(16, _LargoFactura, cantidad16));
                          setTotal16(mc16 * precio16);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                      }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad16(cantidad16 - 1);                  
                          setMc16(calcarM3(16, _LargoFactura, cantidad16));
                          setTotal16(mc16 * precio16);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc16.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio16(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio16.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total16.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 18 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_18.diametro}  
                      </Text>


                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad18.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad18(cantidad18 + 1);
                          setMc18(calcarM3(18, _LargoFactura, cantidad18));
                          setTotal18(mc18 * precio18);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                      }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad18(cantidad18 - 1);                          
                          setMc18(calcarM3(18, _LargoFactura, cantidad18));
                          setTotal18(mc18 * precio18);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc18.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio18(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio18.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total18.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 20 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_20.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad20.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad20(cantidad20 + 1);
                          setMc20(calcarM3(20, _LargoFactura, cantidad20));
                          setTotal20(mc20 * precio20);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                      }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad20(cantidad20 - 1);
                          setMc20(calcarM3(20, _LargoFactura, cantidad20));
                          setTotal20(mc20 * precio20);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc20.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio20(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio20.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total20.toFixed(3).toString() }
                      />
                    </View>                                                            

                    {/* diametro 22 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_22.diametro}  
                      </Text>


                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad22.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad22(cantidad22 + 1);
                          setMc22(calcarM3(22, _LargoFactura, cantidad22));
                          setTotal22(mc22 * precio22);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad22(cantidad22 - 1);
                          setMc22(calcarM3(22, _LargoFactura, cantidad22));
                          setTotal22(mc22 * precio22);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc22.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio22(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio22.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total22.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 24 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_24.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad24.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad24(cantidad24 + 1);
                          setMc24(calcarM3(24, _LargoFactura, cantidad24));
                          setTotal24(mc24 * precio24);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad24(cantidad24 - 1);
                          setMc24(calcarM3(24, _LargoFactura, cantidad24));
                          setTotal24(mc24 * precio24);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc24.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio24(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio24.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total24.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 26 */}
                    <View style={[styles.row, { flex: 1}]}>
                      
                      <Text style={styles.diametro}>
                        { diametro_26.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad26.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad26(cantidad26 + 1);
                          setMc26(calcarM3(26, _LargoFactura, cantidad26));
                          setTotal26(mc26 * precio26);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad26(cantidad26 - 1);
                          setMc26(calcarM3(26, _LargoFactura, cantidad26));
                          setTotal26(mc26 * precio26);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc26.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio26(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio26.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total26.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 28 */}
                    <View style={[styles.row, { flex: 1}]}>
                        
                      <Text style={styles.diametro}>
                        { diametro_28.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad28.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad28(cantidad28 + 1);
                          setMc28(calcarM3(28, _LargoFactura, cantidad28));
                          setTotal28(mc28 * precio28);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad28(cantidad28 - 1);
                          setMc28(calcarM3(28, _LargoFactura, cantidad28));
                          setTotal28(mc28 * precio28);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc28.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio28(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio28.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total28.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 30 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_30.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={ styles.cantDiametro}
                        value={ cantidad30.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad30(cantidad30 + 1);
                          setMc30(calcarM3(30, _LargoFactura, cantidad30));
                          setTotal30(mc30 * precio30);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad30(cantidad30 - 1);
                          setMc30(calcarM3(30, _LargoFactura, cantidad30));
                          setTotal30(mc30 * precio30);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc30.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio30(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio30.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total30.toFixed(3).toString() }
                      />
                    </View>                    

                  </View>


                  {/* columna 2 */}
                  <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    borderRightWidth: 1
                  }}>

                    <View style={[styles.row, { flex: 1}]}>
                      <Text style={{ flex: 1}}>Diá</Text>
                      <Text style={{ flex: 1}}>Cant.</Text>
                      <Text style={{ flex: 1}}></Text>
                      <Text style={{ flex: 1}}>M3</Text>
                      <Text style={{ flex: 1}}>Precio</Text>
                      <Text style={{ flex: 1}}>Total</Text>
                    </View>

                    {/* diametro 32 */}
                    <View style={[styles.row, { flex: 1}]}>
                      
                      <Text style={styles.diametro}>
                        { diametro_32.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad32.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad32(cantidad32 + 1);
                          setMc32(calcarM3(32, _LargoFactura, cantidad32));
                          setTotal32(mc32 * precio32);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad32(cantidad32 - 1);
                          setMc32(calcarM3(32, _LargoFactura, cantidad32));
                          setTotal32(mc32 * precio32);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc32.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio32(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio32.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total32.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 34 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_34.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad34.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad34(cantidad34 + 1);
                          setMc34(calcarM3(34, _LargoFactura, cantidad34));
                          setTotal34(mc34 * precio34);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad34(cantidad34 - 1);
                          setMc34(calcarM3(34, _LargoFactura, cantidad34));
                          setTotal34(mc34 * precio34);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc34.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio34(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio34.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total34.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 36 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_36.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad36.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad36(cantidad36 + 1);
                          setMc36(calcarM3(36, _LargoFactura, cantidad36));
                          setTotal36(mc36 * precio36);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad36(cantidad36 - 1);
                          setMc36(calcarM3(36, _LargoFactura, cantidad36));
                          setTotal36(mc36 * precio36);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc36.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio36(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio36.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total36.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 38 */}
                    <View style={[styles.row, { flex: 1}]}>
                      
                      <Text style={styles.diametro}>
                        { diametro_38.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad38.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad38(cantidad38 + 1);
                          setMc38(calcarM3(38, _LargoFactura, cantidad38));
                          setTotal38(mc38 * precio38);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad38(cantidad38 - 1);
                          setMc38(calcarM3(38, _LargoFactura, cantidad38));
                          setTotal38(mc38 * precio38);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc38.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio38(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio38.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total38.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 40 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_40.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad40.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad40(cantidad40 + 1);
                          setMc40(calcarM3(40, _LargoFactura, cantidad40));
                          setTotal40(mc40 * precio40);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad40(cantidad40 - 1);
                          setMc40(calcarM3(40, _LargoFactura, cantidad40));
                          setTotal40(mc40 * precio40);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc40.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio40(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio40.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total40.toFixed(3).toString() }
                      />
                    </View>                                                            

                    {/* diametro 42 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_42.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad42.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad42(cantidad42 + 1);
                          setMc42(calcarM3(42, _LargoFactura, cantidad42));
                          setTotal42(mc42 * precio42);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad42(cantidad42 - 1);
                          setMc42(calcarM3(42, _LargoFactura, cantidad42));
                          setTotal42(mc42 * precio42);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc42.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio42(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio42.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total42.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 44 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_44.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad44.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad44(cantidad44 + 1);
                          setMc44(calcarM3(44, _LargoFactura, cantidad44));
                          setTotal44(mc44 * precio44);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad44(cantidad44 - 1);
                          setMc44(calcarM3(44, _LargoFactura, cantidad44));
                          setTotal44(mc44 * precio44);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc44.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio44(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio44.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total44.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 46 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_46.diametro}  
                      </Text>


                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad46.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad46(cantidad46 + 1);
                          setMc46(calcarM3(46, _LargoFactura, cantidad46));
                          setTotal46(mc46 * precio46);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad46(cantidad46 - 1);
                          setMc46(calcarM3(46, _LargoFactura, cantidad46));
                          setTotal46(mc46 * precio46);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc46.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio46(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio46.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total46.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 48 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_48.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad48.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad48(cantidad48 + 1);
                          setMc48(calcarM3(48, _LargoFactura, cantidad48));
                          setTotal48(mc48 * precio48);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad48(cantidad48 - 1);
                          setMc48(calcarM3(48, _LargoFactura, cantidad48));
                          setTotal48(mc48 * precio48);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc48.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio48(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio48.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total48.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 50 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_50.diametro}  
                      </Text>
                      
                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad50.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad50(cantidad50 + 1);
                          setMc50(calcarM3(50, _LargoFactura, cantidad50));
                          setTotal50(mc50 * precio50);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad50(cantidad50 - 1);
                          setMc50(calcarM3(50, _LargoFactura, cantidad50));
                          setTotal50(mc50 * precio50);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc50.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio50(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio50.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total50.toFixed(3).toString() }
                      />
                    </View>   

                  </View>

                  {/* columna 3 */}
                  <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    borderRightWidth: 1
                  }}>

                    <View style={[styles.row, { flex: 1}]}>
                      <Text style={{ flex: 1}}>Diá</Text>
                      <Text style={{ flex: 1}}>Cant.</Text>
                      <Text style={{ flex: 1}}></Text>
                      <Text style={{ flex: 1}}>M3</Text>
                      <Text style={{ flex: 1}}>Precio</Text>
                      <Text style={{ flex: 1}}>Total</Text>
                    </View>


                    {/* diametro 52 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_52.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad52.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad52(cantidad52 + 1);                          
                          setMc52(calcarM3(52, _LargoFactura, cantidad52));
                          setTotal52(mc52 * precio52);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad52(cantidad52 - 1);                          
                          setMc52(calcarM3(52, _LargoFactura, cantidad52));
                          setTotal52(mc52 * precio52);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc52.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio52(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio52.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total52.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 54 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_54.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad54.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad54(cantidad54 + 1);                          
                          setMc54(calcarM3(54, _LargoFactura, cantidad54));
                          setTotal54(mc54 * precio54);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad54(cantidad54 - 1);                          
                          setMc54(calcarM3(54, _LargoFactura, cantidad54));
                          setTotal54(mc54 * precio54);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc54.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio54(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio54.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total54.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 56 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_56.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad56.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad56(cantidad56 + 1);
                          setMc56(calcarM3(56, _LargoFactura, cantidad56));
                          setTotal56(mc56 * precio56);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad56(cantidad56 - 1);
                          setMc56(calcarM3(56, _LargoFactura, cantidad56));
                          setTotal56(mc56 * precio56);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc56.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio56(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio56.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total56.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 58 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_58.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad58.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad58(cantidad58 + 1);                          
                          setMc58(calcarM3(58, _LargoFactura, cantidad58));
                          setTotal58(mc58 * precio58);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad58(cantidad58 - 1);                          
                          setMc58(calcarM3(58, _LargoFactura, cantidad58));
                          setTotal58(mc58 * precio58);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc58.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio58(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio58.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total58.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 60 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_60.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad60.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad60(cantidad60 + 1);                          
                          setMc60(calcarM3(60, _LargoFactura, cantidad60));
                          setTotal60(mc60 * precio60);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad60(cantidad60 - 1);                          
                          setMc60(calcarM3(60, _LargoFactura, cantidad60));
                          setTotal60(mc60 * precio60);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc60.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio60(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio60.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total60.toFixed(3).toString() }
                      />
                    </View>                                                            

                    {/* diametro 62 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_62.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad62.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad62(cantidad62 + 1);                          
                          setMc62(calcarM3(62, _LargoFactura, cantidad62));
                          setTotal62(mc62 * precio62);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad62(cantidad62 - 1);                          
                          setMc62(calcarM3(62, _LargoFactura, cantidad62));
                          setTotal62(mc62 * precio62);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc62.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio62(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio62.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total62.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 64 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_64.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad64.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad64(cantidad64 + 1);                          
                          setMc64(calcarM3(64, _LargoFactura, cantidad64));
                          setTotal64(mc64 * precio64);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad64(cantidad64 - 1);                          
                          setMc64(calcarM3(64, _LargoFactura, cantidad64));
                          setTotal64(mc64 * precio64);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc64.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio64(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio64.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total64.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 66 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_66.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad66.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad66(cantidad66 + 1);                          
                          setMc66(calcarM3(66, _LargoFactura, cantidad66));
                          setTotal66(mc66 * precio66);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad66(cantidad66 - 1);                          
                          setMc66(calcarM3(66, _LargoFactura, cantidad66));
                          setTotal66(mc66 * precio66);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc66.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio66(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio66.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total66.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 68 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_68.diametro}  
                      </Text>

                      <TextInput
                        placeholder='Ingrese Largo'
                        style={styles.cantDiametro}
                        value={ cantidad68.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad68(cantidad68 + 1);                          
                          setMc68(calcarM3(68, _LargoFactura, cantidad68));
                          setTotal68(mc68 * precio68);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad68(cantidad68 - 1);                          
                          setMc68(calcarM3(68, _LargoFactura, cantidad68));
                          setTotal68(mc68 * precio68);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc68.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio68(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio68.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total68.toFixed(3).toString() }
                      />
                    </View>

                    {/* diametro 70 */}
                    <View style={[styles.row, { flex: 1}]}>

                      <Text style={styles.diametro}>
                        { diametro_70.diametro}  
                      </Text>

                      <TextInput
                        placeholder=''
                        style={styles.cantDiametro}
                        value={ cantidad70.toString() }
                      />

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad70(cantidad70 + 1);                          
                          setMc70(calcarM3(70, _LargoFactura, cantidad70));
                          setTotal70(mc70 * precio70);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#006110',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ padding: 5, justifyContent: 'center', marginTop: 10, marginRight: 2}} onPress={async() => {
                          setCantidad70(cantidad70 - 1);                          
                          setMc70(calcarM3(70, _LargoFactura, cantidad70));
                          setTotal70(mc70 * precio70);
                          await sumaTrozos();
                          await calcularM3Total();
                          await calcularTotales();
                        }}>
                        <Text style={{
                          fontSize: 20,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          borderRadius: 20,
                          width: 30,
                          height: 30,
                          textAlign: 'center'
                        }}>-</Text>
                      </TouchableOpacity>

                      <TextInput
                        placeholder='M3'
                        style={ styles.m3}
                        value={ mc70.toFixed(3).toString() }
                      />

                      <TextInput
                        placeholder='Precio'
                        style={ styles.valorm3}
                        onChangeText={(value) => {
                          setPrecio70(Number.isNaN(parseInt(value)) ? 0 : parseInt(value))
                        }}
                        value={ precio70.toString() }
                      />

                      <TextInput
                        placeholder='Total'
                        style={ styles.totalDetalle}
                        value={ total70.toFixed(3).toString() }
                      />
                    </View>   
                  </View>



            </View>

             {/* Botones guardar y detalle de recepción */}
             <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height'}
                >
                <View style={ styles.row }>

                    <View style={[ styles.row, { display: 'flex', flex: 1, flexDirection: 'column'} ]}>
                        <View style={{flex:1}}>
                        <Text style={ styles.label }>Metros Cúbicos</Text>
                        <TextInput
                          style={[styles.predio, styles.inputDisabled, { fontSize: 20}]}
                          value={totalMC.toFixed(3).toString()}
                          editable={false}
                        />
                      </View>

                      <View style={{flex:1}}>
                        <Text style={ styles.label }>Valor de Flete x M3</Text>
                        <TextInput
                          style={[styles.predio, { fontSize: 20}]}
                          onChangeText={(value) => {
                            setTotalValorFleteMC(Number.isNaN(parseInt(value)) ? 0 : parseInt(value));
                            calularFleteTotal();
                          }}
                          value={totalValorFleteMC.toString()}
                        />
                      </View>

                      <View style={{flex:1}}>                                
                        <Text style={ styles.label }>Valor Flete</Text>
                        <TextInput
                            style={[styles.predio, styles.inputDisabled, { fontSize: 20}]}
                            value={`$ ${Number(totalValorFlete).toLocaleString('de-DE').toString()}`}
                            editable={false}
                        />
                      </View>

                      <View style={{flex:1}}>
                        <Text style={ styles.label }>Total de Trozos</Text>
                        <TextInput
                          style={[styles.predio, styles.inputDisabled, { fontSize: 20}]}
                          value={totalTrozos.toString()}
                          editable={false}
                        />
                      </View>

                    </View>

                    <View style={[ styles.row, { display: 'flex', flex: 1, flexDirection: 'column'} ]}>

                      <View style={{flex:1}}>
                          <Text style={ styles.label }>Neto</Text>
                          <TextInput
                            style={[styles.predio, styles.inputDisabled, { fontSize: 30}]}
                            editable={false}
                            value={`$ ${Number(totalNeto).toLocaleString('de-DE').toString()}`}
                          />
                      </View>

                      <View style={ styles.row }>
                        <View style={{flex:1}}>
                          <Text style={ styles.label }>IVA</Text>
                            <TextInput
                              style={[styles.predio, styles.inputDisabled, { fontSize: 20}]}
                              value={iva.toString()}
                              editable={false}
                            />
                          </View>

                          <View style={{flex:1}}>
                            <Text style={ styles.label }>Valor IVA</Text>
                              <TextInput
                                style={[styles.predio, styles.inputDisabled, { fontSize: 20}]}
                                editable={false}
                                value={`$ ${Number(totalIva).toLocaleString('de-DE').toString()}`}
                              />
                          </View>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={ styles.label }>Total</Text>
                        <TextInput
                          style={[styles.predio, styles.inputDisabled, { fontSize: 30}]}
                          editable={false}
                          value={`$ ${Number(totalRecepcion).toLocaleString('de-DE').toString()}`}
                        />
                      </View>

                    </View>
          
                </View>

                {/* Botón Guardar */}
                <View style={ styles.row }>
                  <View style={{
                      marginTop: 30,
                      marginBottom: 30,
                      flex: 1
                  }}>
                      <TouchableOpacity
                          style={styles.buttonGuardar}
                          onPress={ onSave }
                      >
                          <Text style={styles.buttonGuardarText}>Guardar</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
          </View>
          
        </View>
       
      }
      </ScrollView>
    </View>
  )
}

