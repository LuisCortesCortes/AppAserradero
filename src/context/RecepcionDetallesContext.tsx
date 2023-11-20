import { createContext, useState } from "react";
import { RecepcionDetalle } from "../interfaces/appInterfaces";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { getDbConnection } from "../utils/db";
import { Alert } from "react-native";

type RecepcionDetallesContextProps = {

    detalle: RecepcionDetalle[];

}

export const RecepcionDetallesContext = createContext({});

export const RecepcionDetallesProvider = ({ children }: any) => {

    const [_Detalle, setDetalle] = useState<RecepcionDetalle[]>([]);


    const grabarDetalle = async( id: number = 0, recepcion_id: number, producto_id: number, diametro: number, cant_despacho: number, mc_despacho: number, precio: number, total: number, tipo: String ) => {
        try{

            const db :SQLiteDatabase = await getDbConnection();
            console.log(tipo)
            if (tipo === 'trozos') {

                console.log("INSERT GRABANDO TROZOS")

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
                    console.log("OK RECEPCIONES");
                    // Alert.alert('Aviso', 'Detalle de recepción guardada correctamente' , [{
                    //     text: 'Aceptar',
        
                    //     //onPress: () => console.log('Cancelando'),
                    //     style: 'default'
                    // }])
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


    return(
        <RecepcionDetallesContext.Provider value={{
            _Detalle,
            grabarDetalle
        }}>
            { children }
        </RecepcionDetallesContext.Provider>
    )
    
}