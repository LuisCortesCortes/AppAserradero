
import React, { useEffect, useState } from 'react'
import { styles } from '../theme/recepcionTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import { db } from '../utils/db';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { };

export const ListaDetalleRecepcionScreen = ({ navigation, route }: Props) => {

  // fuentes de datos
  const [isLoading, setIsLoading] = useState(true)
  const [_FirstLoad, setFirstLoad] = useState(true)
  const [_recordsNotFounds, setRecordsNotFounds] = useState(false)
  const [_params, setParams] = useState([])
  const [_Id, setId] = useState(0)
  const [_Proveedor, setProveedor] = useState('')
  const [_Producto, setProducto] = useState('')
  const [_Detalles, setDetalles] = useState([])
  const [_ValorNeto, setValorNeto] = useState(0)
  const [_ValorIVA, setValorIVA] = useState(0)
  const [_ValorTotal, setValorTotal] = useState(0)

  const getDetalle = async () => {

    const tasks: any = [];
    setIsLoading(true);
    setRecordsNotFounds(false);

    let _id = route.params?.id === null ? 0 : route.params?.id;
    
    let neto: number = 0;
    let valorIVA: number = 0;
    let valorTotal: number = 0;

    (await db).transaction(txn => {

      const query = `select 
          d.id,
          d.recepcion_id,
          d.producto_id,
          p.nombre as nombre_producto,
          d.espesor,
          d.ancho,
          d.largo,
          d.mc_recepcion,
          d.mruma_recepcion,
          d.precio,
          d.total
        from recepcion_detalles d
            inner join productos p on p.id = d.producto_id
        where d.recepcion_id = ${_id}    
        order by p.id asc;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {

                res.rows.length > 0 ? setRecordsNotFounds(true) : setRecordsNotFounds(false);

                for (let index = 0; index < res.rows.length; index++) {
                  tasks.push({
                    id: res.rows.item(index).id,
                    recepcionId: res.rows.item(index).recepcion_id,
                    productoId: res.rows.item(index).producto_id,
                    nombreProducto: res.rows.item(index).nombre_producto,
                    alto: res.rows.item(index).espesor,
                    ancho: res.rows.item(index).ancho,
                    largo: res.rows.item(index).largo,
                    mcRecepcion: res.rows.item(index).mc_recepcion,
                    mrumaRecepcion: res.rows.item(index).mruma_recepcion,
                    precio: res.rows.item(index).precio,
                    total: res.rows.item(index).total
                  });

                  neto = neto + parseInt(res.rows.item(index).total);
                }

                // realizar cálculos
                valorIVA = neto * 0.19;
                valorTotal = neto + valorIVA;

                // asignar valores
                setDetalles(tasks);
                setValorNeto(neto);
                setValorIVA(valorIVA);
                setValorTotal(valorTotal);
                setIsLoading(false);

                console.log("Detalle de recepción obtenidos correctamente");
            },
            error => {
                console.log("Error al obtener Detalle de recepción");
                setIsLoading(false);
                Alert.alert('Error', "Error al obtener Detalle de recepción", [{
                  text: 'Aceptar',
                  //onPress: () => console.log('Cancelando'),
                  style: 'default'
                }])
            });
    });

    return tasks;
  }

  const getProveedor = async () => {

    let proveedorId = route.params?.proveedorId === null ? 0 : route.params?.proveedorId;
    console.log("PROVEEDOR: " + route.params?.proveedorId);

    (await db).transaction(txn => {

      if (proveedorId > 0) {

        const query =
        `select * from empresas where proveedor = 1 and id = ${proveedorId};`;

        txn.executeSql(query,
          [],
          (sqlTxn: Transaction, res: ResultSet) => {
  
            for (let index = 0; index < res.rows.length; index++) {
  
              setProveedor(res.rows.item(0).razon_social);
            }
  
            console.log("Proveedor obtenido");

  
          },
          error => {

            Alert.alert('Error', 'Error al obtener Proveedor', [{
              text: 'Aceptar',
              //onPress: () => console.log('Cancelando'),
              style: 'default'
            }])
          });

      }

    });

  }

  const getTipoTrozos = async () => {

    let tipoMaderaId = route.params?.tipoMaderaId === null ? 0 : route.params?.tipoMaderaId;
    let maderaId = route.params?.maderaId === null ? 0 : route.params?.maderaId;

    (await db).transaction(txn => {

        const query =
        `select tm.id as tm_id, m.id as id, m.nombre as nombre
            from tipo_maderas tm 
                inner join maderas m on tm.id = m.tipo_madera_id
                where tm.id= ${tipoMaderaId} and m.id = ${maderaId}
            order by tm.id, m.nombre asc;`;

        txn.executeSql(query,
          [],
          (sqlTxn: Transaction, res: ResultSet) => {
  
            for (let index = 0; index < res.rows.length; index++) {
  
              setProducto(res.rows.item(index).nombre);
            }
  
            console.log("Tipo de Trozo obtenido");

  
          },
          error => {

            Alert.alert('Error', 'Error al obtener Tipo de Trozo', [{
              text: 'Aceptar',
              //onPress: () => console.log('Cancelando'),
              style: 'default'
            }])
          });

    });
  }

  useEffect(() => {

    if (_FirstLoad) {
      setIsLoading(true);
      getProveedor();
      getTipoTrozos();
      setIsLoading(false);
      setFirstLoad(false)
    }

    const refresh = navigation.addListener('focus', () => {
      if (_FirstLoad) {
        console.log("Refrescando");
        getDetalle();
      }

    });
  }, [
    _FirstLoad
  ])

  const onAdd = () => {

    navigation.navigate("AgregarDetalleRecepcionOtrosScreen",
      {
        mode: 'insert',
        id: 0,
        recepcionId: route.params?.id === null ? 0 : route.params?.id,
        proveedorId: route.params?.id === null ? 0 : route.params?.provedor_id,
        nombreProveedor: _Proveedor,
        tipoMaderaId: route.params?.id === null ? 0 : route.params?.tipo_madera_id,
        maderaId: route.params?.id === null ? 0 : route.params?.madera_id
      });
  }

  const onEdit = (row: any) => {

    navigation.navigate("AgregarDetalleRecepcionOtrosScreen",
      {
        mode: 'edit',
        id: row.id,
        recepcionId: row.recepcionId,
        proveedorId: route.params?.id === null ? 0 : route.params?.provedor_id,
        nombreProveedor: _Proveedor,
        tipoMaderaId: route.params?.id === null ? 0 : route.params?.tipo_madera_id,
        maderaId: route.params?.id === null ? 0 : route.params?.madera_id,
        productoId: row.productoId,
        alto: row.alto,
        ancho: row.ancho,
        largo: row.largo,
        mcRecepcion: row.mcRecepcion,
        mrumaRecepcion: row.mrumaRecepcion,
        precio: row.precio,
        total: row.total
      });
  }

  const onDelete = (row: any): any => {

    Alert.alert(
      'Aviso',
      `Desea eliminar el producto ${row.nombreProducto}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {

              (await db).transaction(txn => {

                const query =
                  `delete from recepcion_detalles 
                      where
                        id = ${row.id} and
                        recepcion_id = ${row.recepcionId};`
          
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Detalle de recepción eliminado correctamente");
                    },
                    error => {
                        console.log("Error al borrar Detalle de recepción");
                    });
                });


              // actualizar lista
              getDetalle();

          }
        }
      ]
    )

    
  }

  const Item = ({ title }: any) => (

    <TouchableOpacity
      onPress={() => onEdit(title)}
      style={[styles.row, { flex: 1 }]}
    >
      <View style={[styles.row, { flex: 1 }]}>
        <Text style={[styles.rowHeader, { width: '15%' }]}>{title.productoId}</Text>
        <Text style={[styles.rowHeader, { width: '25%' }]}>{title.nombreProducto}</Text>
        <Text style={[styles.rowHeader, { width: '10%', textAlign: 'center' }]}>{title.mcRecepcion}</Text>
        <Text style={[styles.rowHeader, { width: '20%', textAlign: 'right' }]}>{`$ ${parseInt(title.precio.toFixed(0)).toLocaleString('de-DE')}`}</Text>
        <Text style={[styles.rowHeader, { width: '20%', textAlign: 'right' }]}>{`$ ${parseInt(title.total.toFixed(0)).toLocaleString('de-DE')}`}</Text>
        <Text style={[styles.rowHeader, { width: '10%', textAlign: 'center' }]}>
          <TouchableOpacity
            style={[styles.buttonEliminarItem, styles.row, { justifyContent: 'center', alignItems: 'center' }]}
            onPress={() => onDelete(title)}
          >
            <Icon
              name="trash-outline"
              color="white"
              size={26}
              style={{}}
            />
          </TouchableOpacity>
        </Text>
      </View>
    </TouchableOpacity>

  );



  const renderItem = ({ item }: any) => <Item title={item} />;

  return (
    <View style={styles.container}>


      {/* Card lista */}
      <View style={[styles.card, { height: '90%' }]}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Detalle de recepción N° {route.params?.id === null ? 0 : route.params?.id}</Text>
            <View style={styles.BarMenuTitle}></View>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={[styles.buttonAgregar, styles.row]}
              onPress={onAdd}
            >
              <Icon
                name="add-outline"
                color="white"
                size={30}
                style={{}}
              />
              <Text style={styles.buttonAgregarText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[{ fontSize: 18, color: 'black' }]}>Proveedor: {_Proveedor}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[{ fontSize: 18, color: 'black' }]}>Tipo Trozo: {_Producto}</Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <Text style={[styles.listaHeader, { width: '15%' }]}>Cód. Producto</Text>
          <Text style={[styles.listaHeader, { width: '25%' }]}>Producto</Text>
          <Text style={[styles.listaHeader, { width: '10%', textAlign: 'center' }]}>M3</Text>
          <Text style={[styles.listaHeader, { width: '20%', textAlign: 'right' }]}>Precio</Text>
          <Text style={[styles.listaHeader, { width: '20%', textAlign: 'right' }]}>Total</Text>
          <Text style={[styles.listaHeader, { width: '10%', textAlign: 'center' }]}>Acción</Text>
        </View>

        {_recordsNotFounds === false ?

          <View style={[styles.row, { marginTop: 10, flex: 1 }]}>
            <Text style={styles.sinRegistro}>Sin Registros</Text>
          </View>
          :
          <View style={[styles.row, { flex: 1 }]}>
            <FlatList
              data={_Detalles}
              renderItem={renderItem}
              keyExtractor={(item: any, index) => item.id}
            />
          </View>
        }
      </View>

      {/* Card totales */}
      <View style={[styles.card, styles.row, { justifyContent: 'flex-end' }]}>
        <View style={[styles.row, { flex: 1, justifyContent: 'space-between' }]}>
          <View style={[{ flex: 1 }]}>
            <Text style={[styles.subtitle, { textAlign: 'left' }]}>{`NETO $ ${parseInt(_ValorNeto.toFixed(0)).toLocaleString('de-DE')}`}</Text>
          </View>
          <View style={[{ flex: 1 }]}>
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>{`IVA (19%) $ ${parseInt(_ValorIVA.toFixed(0)).toLocaleString('de-DE')}`}</Text>
          </View>
          <View style={[{ flex: 1, }]}>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>{`TOTAL $ ${parseInt(_ValorTotal.toFixed(0)).toLocaleString('de-DE')}`}</Text>
          </View>
        </View>

      </View>
    </View>
  )
}
