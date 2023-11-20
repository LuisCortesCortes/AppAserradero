import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/recepcionTheme';
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { db } from '../utils/db'
import { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage'
import { Dropdown } from 'react-native-element-dropdown'
import { StackScreenProps } from '@react-navigation/stack'
import { useForm } from '../hooks/useForm';


interface Props extends StackScreenProps<any, any> { };

export const AgregarDetalleRecepcionOtrosScreen = ({ navigation, route }: Props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [_FirstLoad, setFirstLoad] = useState(true)

  // fuentes de datos
  const [_Id, setId] = useState([]);
  const [_Productos, setProductos] = useState<any[]>([]);
  const [_ProductosLista, setProductosLista] = useState<any[]>([]);
  const [_tipoProducto, setTipoProducto] = useState('');
  const [_alto, setAlto] = useState('');
  const [_ancho, setAncho] = useState('');
  const [_largo, setLargo] = useState('');
  const [_totalMC, setTotalMC] = useState('');
  const [_totalMRuma, setTotalMRuma] = useState('');
  const [_valorUnitario, setValorUnitario] = useState('');
  const [_valorTotal, setValorTotal] = useState('');

  const [pulgada, setPulgada] = useState(0);
  const [metro3, setMetro3] = useState(0);
  const [unidad, setUnidad] = useState(0);
  const [mm, setMm] = useState(0);
  const [mruma, setMRuma] = useState(0);

  const [isFocus, setIsFocus] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  // selected states
  const [_SelectedProducto, setSelectedProducto] = useState<any[]>([]);

  useEffect(() => {
    console.log(_tipoProducto);
    if (_FirstLoad) {
      setIdRecepcion();

      const habilitaCampos = async () => {

        await getProductos();
     

        return true;
      }

      habilitaCampos();

      setFirstLoad(false);

    }

    // renderizado
    calcular();


  }, [
    _FirstLoad,
    _tipoProducto,
    _alto,
    _ancho,
    _largo,
    _valorUnitario,
    _valorTotal
  ])

  const onSave = async () => {

    // ocultar teclado
    Keyboard.dismiss();

    // asignar valores a formulario
    form.alto = _alto
    form.ancho = _ancho
    form.largo = _largo
    form.mc = _totalMC.toString()
    form.metros_ruma = _totalMRuma.toString()
    form.valor_unitario = _valorUnitario.toString()
    form.total_neto = _valorTotal

    // validar
    if (form.producto_id === '' || form.producto_id === '0') {
      Alert.alert('Validación', 'Por favor seleccione un Producto', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if ((pulgada === 1 || metro3 === 1 || unidad === 1) && (form.alto === '' || form.alto === '0')) {
      Alert.alert('Validación', 'Por favor ingrese Alto', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if ((pulgada === 1 || metro3 === 1 || unidad === 1) && (form.ancho === '' || form.ancho === '0')) {
      Alert.alert('Validación', 'Por favor ingrese Ancho', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if ((pulgada === 1 || metro3 === 1 || unidad === 1) && (form.largo === '' || form.largo === '0')) {
      Alert.alert('Validación', 'Por favor ingrese Largo', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if ((metro3 === 1) && (form.mc === '' || form.mc === '0')) {
      Alert.alert('Validación', 'Por favor ingrese M3', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if ((mruma === 1) && (form.metros_ruma === '' || form.metros_ruma === '0')) {
      Alert.alert('Validación', 'Por favor ingrese Mto. Ruma', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if (form.valor_unitario === '' || form.valor_unitario === '0') {
      Alert.alert('Validación', 'Por favor ingrese Valor Unitario', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    if (form.total_neto === '' || form.total_neto === '0') {
      Alert.alert('Validación', 'Por favor ingrese Total Neto', [{
        text: 'Aceptar',
        style: 'default'
      }])

      return;
    }

    route.params?.mode === 'edit' ? actualizarDetalle() : grabarDetalle();

  }

  const grabarDetalle = async () => {

    (await db).transaction(async txn => {

      const query =
        `insert into recepcion_detalles 
          (
            recepcion_id, 
            producto_id, 
            diametro,
            volumen,
            espesor, 
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
            total
          ) values 
          (
            ${form.recepcion_id}, 
            ${form.producto_id}, 
            0,
            0,
            ${form.alto}, 
            ${form.ancho}, 
            ${form.largo}, 
            0,
            ${form.mc}, 
            0,
            ${form.metros_ruma},
            0,
            ${form.mc},
            0,
            ${form.metros_ruma},
            ${form.valor_unitario},
            ${form.total_neto}
          );`;


      txn.executeSql(query,
        [],
        (sqlTxn: Transaction, res: ResultSet) => {
          console.log("Recepción guardada exitosamente");

          Alert.alert(
            'Aviso',
            'Recepción guardada exitosamente',
            [
              {
                text: 'Aceptar', onPress: () => {
                  navigation.goBack(); // retornar
                },
                style: 'default'
              }],
            { cancelable: false }
          )

        },
        error => {
          console.log("Error al guardar Recepción");
          Alert.alert('Error', "Error al guardar Recepción", [{
            text: 'Aceptar',
            style: 'default'
          }])

        });

    });
  }

  const actualizarDetalle = async () => {

    (await db).transaction(async txn => {

      const query =
        `update recepcion_detalles
        set 
          espesor = ${form.alto}, 
          ancho = ${form.ancho}, 
          largo = ${form.largo},
          mc_despacho = ${form.mc},
          mruma_despacho = ${form.metros_ruma},
          mc_recepcion = ${form.mc},
          mruma_recepcion = ${form.metros_ruma},
          precio = ${form.valor_unitario},
          total = ${form.total_neto}
        where 
          id = ${route.params?.id} and
          recepcion_id = ${form.recepcion_id} and 
          producto_id = ${form.producto_id};`;


      txn.executeSql(query,
        [],
        (sqlTxn: Transaction, res: ResultSet) => {
          console.log("Recepción guardada correctamente");

          Alert.alert(
            'Aviso',
            'Recepción guardada correctamente',
            [
              {
                text: 'Aceptar', onPress: () => {
                  navigation.goBack();
                },
                style: 'default'
              }],
            { cancelable: false }
          )
        },
        error => {
          console.log("Error al guardar la recepción");
          Alert.alert('Error', "Error al guardar la recepción", [{
            text: 'Aceptar',
            style: 'default'
          }])
        });

    });
  }

  const {
    recepcion_id,
    producto_id,
    alto,
    ancho,
    largo,
    mc,
    metros_ruma,
    valor_unitario,
    total_neto,
    form,
    onChange
  } = useForm({
    recepcion_id: '0',
    producto_id: '0',
    alto: '0',
    ancho: '0',
    largo: '0',
    mc: '0',
    metros_ruma: '0',
    valor_unitario: '0',
    total_neto: '0'
  })

  const setIdRecepcion = async () => {

    let id = route.params?.recepcionId === null ? 0 : route.params?.recepcionId;
    setId(id);
    console.log("FORM TYPE " + route.params?.mode);
    form.recepcion_id = id;

    if (route.params?.mode === 'edit') {

      // arreglos
      const tasksProducto: any = [];
      console.log(route.params);
      form.producto_id = route.params?.productoId.toString();
      setAlto(route.params?.alto.toString());
      setAncho(route.params?.ancho.toString());
      setLargo(route.params?.largo.toString());
      setMetro3(route.params?.mcRecepcion.toString());
      setMRuma(route.params?.mrumaRecepcion.toString());
      setValorUnitario(route.params?.precio.toString());
      setValorTotal(route.params?.total.toString());

      // llenar listas
      tasksProducto.push({ value: route.params?.productoId });

      setSelectedProducto(tasksProducto);
      return true;
    }
  }

  const getProductos = async () => {


    setIsLoading(true);

    const taskLista: any = []; 

    (await db).transaction(async txn => {

      const query = `select * 
        from productos 
        where
          nombre in ('Lampazo', 'Metro Ruma') 
        order by nombre asc`;


      txn.executeSql(query,
          [],
          (sqlTxn: Transaction, res: ResultSet) => {

              for (let index = 0; index < res.rows.length; index++) {
                
                taskLista.push({
                  id: res.rows.item(index).id,
                  nombre: res.rows.item(index).nombre,
                  pulgada: res.rows.item(index).pulgada,
                  metro3: res.rows.item(index).metro3,
                  unidad: res.rows.item(index).unidad,
                  mm: res.rows.item(index).mm,
                  mruma: res.rows.item(index).mruma
                });
              }   

              console.log("Productos obtenidos correctamente");
              setProductosLista(taskLista);
              llenarProductosList(taskLista);
              
              if (route.params?.mode === 'edit') {

                getAtrProductoSelected(route.params?.productoId, taskLista);
              }
              setIsLoading(false);
              
              
          },
          error => {
              console.log("Error al al obtener Productos");
              setIsLoading(false);
              Alert.alert('Error', "Error al al obtener Productos", [{
                text: 'Aceptar',
                //onPress: () => console.log('Cancelando'),
                style: 'default'
              }])
              return false;
          });

    
          console.log(taskLista);
          return taskLista;
    });
    
    

  }

  const llenarProductosList = async (list: any) => {

    console.log("Llenar productos list");
    console.log(list);
    const tasks: any = [];

    for (let index = 0; index < list.length; index++) {

      tasks.push({
        value: list[index].id,
        label: `[${list[index].id}] - ${list[index].nombre}`,
      });

    }

    setProductos(tasks);

    return tasks;
  }

  const getAtrProductoSelected = async (idx: number, lista: any) => {

    console.log("LISTA SELECTED");
    console.log(lista);
    for (let index = 0; index < lista.length; index++) {

      if (lista[index].id === idx) {
        setTipoProducto(lista[index].nombre);
        setPulgada(lista[index].pulgada);
        setMetro3(lista[index].metro3);
        setUnidad(lista[index].unidad);
        setMm(lista[index].mm);
        setMRuma(lista[index].mruma);
      }

    }
  }

  const calcular = async () => {

    if (_tipoProducto === 'Lampazo') {
      let mcubico: number = parseFloat(_alto === '' ? '0' : _alto) * parseFloat(_ancho === '' ? '0' : _ancho) * parseFloat(_largo === '' ? '0' : _largo);
      let total: number = parseFloat(_totalMC === '' ? '0' : _totalMC) * parseFloat(_valorUnitario === '' ? '0' : _valorUnitario);

      setTotalMRuma('0');
      setTotalMC(mcubico.toFixed(3).toString());
      setValorTotal(total.toFixed(0).toString());
    }

    if (_tipoProducto === 'Metro Ruma') {
      let mruma: number = (parseFloat(_alto === '' ? '0' : _alto) * parseFloat(_ancho === '' ? '0' : _ancho) * parseFloat(_largo === '' ? '0' : _largo)) / 2.44;
      let total: number = parseFloat(_totalMRuma === '' ? '0' : _totalMRuma) * parseFloat(_valorUnitario === '' ? '0' : _valorUnitario);

      setTotalMC('0');
      setTotalMRuma(mruma.toFixed(3).toString());
      setValorTotal(total.toFixed(0).toString());
    }
  }

  return (
    <View style={[styles.globalMargin, styles.container, { flex: 1 }]}>

      <Text style={styles.title} >Detalle de recepciones N° {_Id}</Text>
      <View style={styles.BarMenuTitle}></View>

      <ScrollView style={styles.globalMargin}>
        {isLoading ?
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#006110" />
          </View>
          :
          <View>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
              <View style={styles.card}>

                <View style={[styles.row, { marginTop: 20 }]}>

                  <View style={{ flex: 1 }}>
                    <Text style={[{ fontSize: 18, color: 'black', marginLeft: 15 }]}>Proveedor: {route.params?.nombreProveedor === null ? '' : route.params?.nombreProveedor}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={[{ fontSize: 18, color: 'black', marginLeft: 15 }]}>Tipo Trozo: {route.params?.nombreProveedor === null ? '' : route.params?.nombreProveedor}</Text>
                  </View>

                </View>

                <View style={[styles.row, { marginTop: 20 }]}>

                  <View style={{ flex: 1 }} >

                    <Text style={styles.label}>Producto</Text>
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
                      value={route.params?.mode === 'edit' ? _SelectedProducto[0].value : ''}
                      placeholder={'Seleccione Producto'}
                      searchPlaceholder="Buscar..."
                      disable={route.params?.mode === 'edit' ? true : false}
                      // onFocus={() => setIsFocus(true)}
                      // onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        onChange(item.value, 'producto_id');
                        getAtrProductoSelected(item.value, _ProductosLista);
                        console.log(_tipoProducto);
                      }}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>{_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? 'Alto' : 'Espesor'}</Text>
                    <TextInput
                      placeholder='Ingrese Alto'
                      style={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? styles.predio : styles.inputDisabled}
                      value={_alto}
                      editable={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? true : false}
                      onChangeText={(value) => setAlto(value)}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>Ancho</Text>
                    <TextInput
                      placeholder='Ingrese Ancho'
                      style={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? styles.predio : styles.inputDisabled}
                      value={_ancho}
                      editable={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? true : false}
                      onChangeText={(value) => setAncho(value)}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>Largo</Text>
                    <TextInput
                      placeholder='Ingrese Largo'
                      style={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? styles.predio : styles.inputDisabled}
                      value={_largo}
                      editable={_tipoProducto === 'Lampazo' || _tipoProducto === 'Metro Ruma' ? true : false}
                      onChangeText={(value) => setLargo(value)}
                    />
                  </View>

                </View>

                <View style={styles.row}>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>M3</Text>
                    <TextInput
                      placeholder='Ingrese M3'
                      style={metro3 === 1 ? [styles.predio, {
                        fontSize: 20,
                        fontWeight: 'bold'
                      }] : styles.inputDisabled}
                      value={_totalMC}
                      editable={false}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>Mtro. Ruma</Text>
                    <TextInput
                      placeholder='Ingrese Mtro. Ruma'
                      style={mruma === 1 ? [styles.predio, {
                        fontSize: 20,
                        fontWeight: 'bold'
                      }] : styles.inputDisabled}
                      value={_totalMRuma}
                      editable={false}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>Valor Unitario</Text>
                    <TextInput
                      placeholder='Ingrese Valor Unitario'
                      style={styles.predio}
                      value={_valorUnitario.toString()}
                      onChangeText={(value) => setValorUnitario(value)}
                    />
                  </View>

                  <View style={{ flex: 1 }} >
                    <Text style={styles.label}>Total Neto</Text>
                    <TextInput
                      placeholder='Ingrese Total Neto'
                      style={[styles.predio, {
                        fontSize: 20,
                        fontWeight: 'bold'
                      }]}
                      value={`$ ${Number(_valorTotal).toLocaleString('de-DE').toString()}`}
                      editable={false}
                    />
                  </View>

                </View>

                <View style={styles.row}>
                  <View style={{ flex: 1, marginTop: 30 }} ></View>
                </View>


                {/* Botones guardar y detalle de recepción */}
                <View style={[styles.row, { justifyContent: 'space-between' }]}>

                  <View>
                    <TouchableOpacity
                      style={styles.buttonCancelar}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Text style={styles.buttonCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.buttonGuardar}
                      onPress={() => { onSave() }}>
                      <Text style={styles.buttonGuardarText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </KeyboardAvoidingView>
          </View>
        }
      </ScrollView>
    </View>
  )
}
