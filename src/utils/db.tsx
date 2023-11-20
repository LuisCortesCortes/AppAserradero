import { ResultSet, SQLiteDatabase, Transaction, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sigalcasApi from '../api/sigalcasApi';
import useEffect from 'react';

enablePromise(true);

const DATABASE_NAME = 'sigalcas.db';

export const db = openDatabase({ name: DATABASE_NAME, location: 'default' });

// funciones TIPO DOCUMENTOS
export const createTableTipoDocumentos = async () => {

    (await db).transaction(txn => {

        const query =
            `create table if not exists tipo_documentos(
            id integer primary key not null,
            codigo varchar(3) not null,
            nombre varchar(50) not null,
            codigo_sii varchar(5),
            correlativo integer not null,
            tipo integer not null,
            vigente integer not null,
            created_id integer,
            updated_id integer,
            delete_id integer,
            created_at text,
            update_at text,
            delete_at text
        )`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla tipo documentos creada");
            },
            error => {
                console.log("Error al crear la tabla tipo documentos");
            });
    });

}

export const deleteTipoDocumentos = async () => {

    (await db).transaction(txn => {
        const query = `delete from tipo_documentos;`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla tipo documentos borrada");
            },
            error => {
                console.log("Error al borrar la tabla tipo documentos");
            });
    });
}

export const insertTipoDocumentos = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = Promise.all([
        sigalcasApi.get('/mobil/tdocumentos/all', config)
    ]);

    const data = (await res).map((res: any) => res.data.data.tipoDocumentos);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into tipo_documentos 
                (id, codigo, nombre, codigo_sii, correlativo, tipo, vigente, created_id) values 
                (${col.id}, '${col.codigo}', '${col.nombre}', '${col.codigo_sii}', ${col.correlativo}, ${col.tipo}, ${col.vigente}, ${col.created_id});)`;


                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla tipo documentos sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla tipo documentos");
                        return false;
                    });

            });

        });
    });

    return true;
}

export const selectTipoDocumentos = async () => {

    const tasks: any[] = [];

    (await db).transaction(txn => {

        const query = `select * from tipo_documentos`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {

                for (let index = 0; index < res.rows.length; index++) {
                    tasks.push(res.rows.item(index));
                }

                console.log("Tipos de documentos obtenidos correctamente");
            },
            error => {
                console.log("Error al crear la tabla tipo documentos");
            });
    });

    return tasks;
}

// funciones EMPRESAS
export const createTableEmpresas = async () => {

    (await db).transaction(txn => {

        const query =
            `create table if not exists empresas (
            id integer primary key NOT NULL,
            rut_dv varchar(11) NOT NULL,
            razon_social varchar(100) NOT NULL,
            cliente integer NOT NULL DEFAULT '1',
            proveedor integer NOT NULL DEFAULT '1',
            transportista integer NOT NULL DEFAULT '1',
            giro varchar(100) DEFAULT NULL,
            direccion varchar(100) NOT NULL,
            ciudad_id integer NOT NULL,
            comuna_id integer DEFAULT NULL,
            telefono varchar(20) DEFAULT NULL,
            email varchar(50) DEFAULT NULL,
            contacto varchar(100) DEFAULT NULL,
            observacion varchar(255) DEFAULT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
        )`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla empresas creada");
            },
            error => {
                console.log("Error al crear la tabla empresas");
            });
    });
}

export const deleteEmpresas = async () => {

    (await db).transaction(txn => {

        const query = `delete from empresas;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla empresas borrada");
            },
            error => {
                console.log("Error al borrar la tabla empresas");
            });
    });

}

export const insertEmpresas = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/empresas/all', config)
    ]);


    const data = res.map((res) => res.data.data?.empresas);


    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {
                const query =
                    `insert into empresas 
                        (
                            id,
                            rut_dv, 
                            razon_social, 
                            cliente, 
                            proveedor, 
                            transportista, 
                            giro,
                            direccion,
                            ciudad_id,
                            comuna_id,
                            telefono,
                            email,
                            contacto,
                            observacion,
                            vigente,
                            created_id,
                            updated_id,
                            deleted_id,
                            created_at,
                            updated_at,
                            deleted_at
                        ) values 
                        (
                            ${col.id},
                            '${col.rut_dv}', 
                            '${col.razon_social}', 
                            ${col.cliente}, 
                            ${col.proveedor}, 
                            ${col.transportista},
                            '${col.giro}',
                            '${col.direccion}',
                            ${col.ciudad_id},
                            ${col.comuna_id},
                            '${col.telefono}',
                            '${col.email}',
                            '${col.contacto}',
                            '${col.observacion}',
                            ${col.vigente},
                            ${col.created_id},
                            ${col.updated_id},
                            ${col.deleted_id === undefined ? null : col.deleted_id },
                            '${col.created_at}',
                            '${col.updated_at}',
                            '${col.deleted_at}'
                        );`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla empresas sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla empresas");
                        return false;
                    });
            });

        });

    });

    return true;

}

// funciones FSC
export const createTableFSC = async () => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists fsc (
            id integer primary key NOT NULL,
            nombre varchar(200)  NOT NULL,
            nombre2 varchar(200)  NOT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL
          );`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla tipo FSC creada");
            },
            error => {
                console.log("Error al crear la tabla FSC");
            });
    });
}

export const deleteFSC = async () => {

    (await db).transaction(txn => {

        const query = `delete from fsc;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla FSC borrada");
            },
            error => {
                console.log("Error al borrar la tabla FSC");
            });
    });

}

export const insertFSC = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/fsc/all', config)
    ]);

    const data = res.map((res) => res.data.data.fscs);


    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                `insert into fsc 
                (id, nombre, nombre2, created_at, updated_at) values 
                (${col.id}, '${col.nombre}', '${col.nombre2}', '${col.created_at}', '${col.updated_at}');`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla FSC sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla FSC");
                        return false;
                    });
            });

        });

    });

    return true;

}


// funciones FSC EMPRESAS
export const createTableFSCEmpresas = async () => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists fsc_empresas (
            id integer  NOT NULL,
            fsc_id integer  NOT NULL,
            empresa_id integer NOT NULL,
            codigo varchar(200) DEFAULT NULL,
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla tipo FSC Empresa creada");
            },
            error => {
                console.log("Error al crear la tabla FSC Empresa");
            });
    });
}

export const deleteFSCEmpresas = async () => {

    (await db).transaction(txn => {

        const query = `delete from fsc_empresas;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla FSC Empresa borrada");
            },
            error => {
                console.log("Error al borrar la tabla FSC Empresa");
            });
    });

}

export const insertFSCEmpresas = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/fscempresas/all', config)
    ]);

    const data = res.map((res) => res.data.data.fscsEmpresas);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into fsc_empresas 
                    (id, fsc_id, empresa_id, codigo, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, ${col.fsc_id}, ${col.empresa_id}, '${col.codigo}', ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla FSC Empresa sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla FSC Empresa");
                        return false;
                    });
            });

        });

    });

    return true;

}


// funciones ORIGEN DESTINO
export const createTableOrigenDestino = async () => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists origen_destinos (
            id integer NOT NULL,
            descripcion varchar(200) NOT NULL,
            flete int  NOT NULL DEFAULT '0',
            observacion varchar(255) DEFAULT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer  DEFAULT NULL,
            updated_id integer  DEFAULT NULL,
            deleted_id integer  DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;


        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla tipo Orígenes y Destinos creada");
            },
            error => {
                console.log("Error al crear la tabla Orígenes y Destinos");
            });
    });
}

export const deleteOrigenDestino = async () => {

    (await db).transaction(txn => {

        const query = `delete from origen_destinos;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Origen Destino borrada");
            },
            error => {
                console.log("Error al borrar la tabla Origen Destino");
            });
    });

}

export const insertOrigenDestino = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/odestinos/all', config)
    ]);

    const data = res.map((res) => res.data.data.origenDestinos);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into origen_destinos 
                    (id, descripcion, flete, observacion, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, '${col.descripcion}', ${col.flete}, '${col.observacion}', '${col.vigente}', ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Origen Destino sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Origen Destino");
                        return false;
                    });
            });

        });

    });

    return true;
}


// funciones TIPO MADERAS
export const createTableTipoMaderas = async () => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists tipo_maderas (
            id integer NOT NULL,
            nombre varchar(50) NOT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer  DEFAULT NULL,
            updated_id integer  DEFAULT NULL,
            deleted_id integer  DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
        );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Tipos de Madera creada");
            },
            error => {
                console.log("Error al crear la tabla Tipos de Madera");
            });
    });
}

export const deleteTipoMaderas = async () => {

    (await db).transaction(txn => {

        const query = `delete from tipo_maderas;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Tipo Maderas borrada");
            },
            error => {
                console.log("Error al borrar la tabla Tipo Maderas");
            });
    });

}

export const insertTipoMaderas = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/tmaderas/all', config)
    ]);


    const data = res.map((res) => res.data.data.tipoMaderas);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                `insert into tipo_maderas 
                (id, nombre, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                (${col.id}, '${col.nombre}', ${col.vigente}, ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Tipo Maderas sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Tipo Maderas");
                        return false;
                    });
            });

        });

    });

    return true;

}


// funciones MADERAS
export const createTableMaderas = async () => {
    
    (await db).transaction(txn => {

        const query =
        `create table if not exists maderas (
            id integer NOT NULL,
            tipo_madera_id integer  DEFAULT NULL,
            nombre varchar(50)  NOT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer  DEFAULT NULL,
            updated_id integer  DEFAULT NULL,
            deleted_id integer  DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Maderas creada");
            },
            error => {
                console.log("Error al crear la tabla Maderas");
            });
    });
}

export const deleteMaderas = async () => {

    (await db).transaction(txn => {

        const query = `delete from maderas;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Maderas borrada");
            },
            error => {
                console.log("Error al borrar la tabla Maderas");
            });
    });

}

export const insertMaderas = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/maderas/all', config)
    ]);

    const data = res.map((res) => res.data.data.maderas);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into maderas 
                    (id, tipo_madera_id, nombre, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, ${col.tipo_madera_id}, '${col.nombre}', ${col.vigente}, ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Maderas sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Maderas");
                        return false;
                    });
            });

        });

    });

    return true;

}


// funciones DESPACHADORES
export const createTableDespachadores = async () => {
    
    (await db).transaction(txn => {

        const query =
        `create table if not exists despachadores (
            id integer NOT NULL,
            rut_dv varchar(11) NOT NULL,
            nombre varchar(100) NOT NULL,
            telefono varchar(11) DEFAULT NULL,
            email varchar(50)  DEFAULT NULL,
            observacion varchar(255)  DEFAULT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Despachadores creada");
            },
            error => {
                console.log("Error al crear la tabla Despachadores");
            });
    });
}

export const deleteDespachadores = async () => {

    (await db).transaction(txn => {

        const query = `delete from despachadores;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Despachadores borrada");
            },
            error => {
                console.log("Error al borrar la tabla Despachadores");
            });
    });

}

export const insertDespachadores = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/despachadores/all', config)
    ]);


    const data = res.map((res) => res.data.data.despachadores);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into despachadores 
                    (id, rut_dv, nombre, telefono, email, observacion, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, '${col.rut_dv}', '${col.nombre}', '${col.telefono}', '${col.email}', '${col.observacion}', ${col.vigente}, ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Despachadores sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Despachadores");
                        return false;
                    });
            });

        });

    });

    return true;

}


// funciones CHOFERES
export const createTableChoferes = async () => {
    
    (await db).transaction(txn => {

        const query =
        `create table if not exists choferes (
            id integer NOT NULL,
            rut_dv varchar(11)  NOT NULL,
            nombre varchar(100)  NOT NULL,
            telefono varchar(11)  DEFAULT NULL,
            email varchar(50)  DEFAULT NULL,
            observacion varchar(255)  DEFAULT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer  DEFAULT NULL,
            updated_id integer  DEFAULT NULL,
            deleted_id integer  DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Choferes creada");
            },
            error => {
                console.log("Error al crear la tabla Choferes");
            });
    });
}

export const deleteChoferes = async () => {

    (await db).transaction(txn => {

        const query = `delete from choferes;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Choferes borrada");
            },
            error => {
                console.log("Error al borrar la tabla Choferes");
            });
    });

}

export const insertChoferes = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/choferes/all', config)
    ]);


    const data = res.map((res) => res.data.data.choferes);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into choferes 
                    (id, rut_dv, nombre, telefono, email, observacion, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, ${col.rut_dv}, '${col.nombre}', '${col.telefono}', '${col.email}', '${col.observacion}', '${col.vigente}', ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Choferes sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Choferes");
                        return false;
                    });
            });

        });

    });

    return true;
}


// funciones PRODUCTOS
export const createTableProductos = async () => {
    
    (await db).transaction(txn => {

        const query =
        `create table if not exists productos (
            id integer NOT NULL,
            nombre varchar(50) NOT NULL,
            pulgada integer NOT NULL DEFAULT '1',
            metro3 integer NOT NULL DEFAULT '1',
            unidad integer NOT NULL DEFAULT '1',
            mm integer NOT NULL DEFAULT '1',
            mruma integer NOT NULL DEFAULT '1',
            nulo integer NOT NULL DEFAULT '1',
            observacion varchar(255) DEFAULT NULL,
            vigente integer NOT NULL DEFAULT '1',
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Productos creada");
            },
            error => {
                console.log("Error al crear la tabla Productos");
            });
    });
}

export const deleteProductos = async () => {

    (await db).transaction(txn => {

        const query = `delete from productos;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Productos borrada");
            },
            error => {
                console.log("Error al borrar la tabla Productos");
            });
    });

}

export const insertProductos = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/productos/all', config)
    ]);


    const data = res.map((res) => res.data.data?.productos);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                `insert into productos 
                (id, nombre, pulgada, metro3, unidad, mm, mruma, nulo, observacion, vigente, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                (${col.id}, '${col.nombre}', ${col.pulgada}, ${col.metro3}, ${col.unidad}, ${col.mm}, ${col.mruma}, ${col.nulo}, '${col.observacion}', ${col.vigente}, ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Productos sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Productos");
                        return false;
                    });
            });

        });

    });

    return true;
}


// funciones PROVEEDOR PRECIOS
export const createTableProveedorPrecios = async () => {
    
    (await db).transaction(txn => {

        const query =
        `create table if not exists proveedor_precios (
            id integer NOT NULL,
            tipo_madera_id integer NOT NULL,
            madera_id integer DEFAULT NULL,
            proveedor_id integer NOT NULL,
            origen_id integer NOT NULL,
            observacion varchar(255) DEFAULT NULL,
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
        );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Proveedor Precios creada");
            },
            error => {
                console.log("Error al crear la tabla Proveedor Precios");
            });
    });
}

export const deleteProveedorPrecios = async () => {

    (await db).transaction(txn => {

        const query = `delete from proveedor_precios;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Proveedor Precios borrada");
            },
            error => {
                console.log("Error al borrar la tabla Proveedor Precios");
            });
    });

}

export const insertPreciosProveedores = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/pprecios/all', config)
    ]);


    const data = res.map((res) => res.data.data?.pprecio);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into proveedor_precios 
                    (id, tipo_madera_id, madera_id, proveedor_id, origen_id, observacion, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, ${col.tipo_madera_id}, ${col.madera_id}, ${col.proveedor_id}, ${col.origen_id}, '${col.observacion}', ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Proveedor Precios sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Proveedor Precios");
                        return false;
                    });
            });

        });

    });

    return true;
}


// funciones PRECIO DIAMETROS
export const createTablePrecioDiametros = async () => {

    (await db).transaction(txn => {

        const query =
            `create table if not exists precio_diametros (
            id integer NOT NULL,
            pprecio_id integer NOT NULL,
            diametro integer NOT NULL,
            valor_m3 numeric(10,2) NOT NULL,
            created_id integer unsigned DEFAULT NULL,
            updated_id integer unsigned DEFAULT NULL,
            deleted_id integer unsigned DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
        );`;  

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Precios Diámetros creada");
            },
            error => {
                console.log("Error al crear la tabla Precios Diámetros");
            });
    });
}

export const deletePrecioDiametros = async () => {

    (await db).transaction(txn => {

        const query = `delete from precio_diametros;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Precios Diámetros borrada");
            },
            error => {
                console.log("Error al borrar la tabla Precios Diámetros");
            });
    });

}

export const insertPreciosDiametros = async () => {

    const token: any = await AsyncStorage.getItem('token');

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token).token}`
        }
    };

    const res = await Promise.all([
        sigalcasApi.get('/mobil/pdiametros/all', config)
    ]);


    const data = res.map((res) => res.data.data?.precios_diametros);

    data.map((item) => {

        item.map(async (col: any) => {

            (await db).transaction(async txn => {

                const query =
                    `insert into precio_diametros 
                    (id, pprecio_id, diametro, valor_m3, created_id, updated_id, deleted_id, created_at, updated_at, deleted_at) values 
                    (${col.id}, ${col.pprecio_id}, ${col.diametro}, ${col.valor_m3}, ${col.created_id}, ${col.updated_id}, ${col.deleted_id}, '${col.created_at}', '${col.updated_at}', '${col.deleted_at}');)`;
                        
                txn.executeSql(query,
                    [],
                    (sqlTxn: Transaction, res: ResultSet) => {
                        console.log("Tabla Precios Diámetros sincronizada");
                    },
                    error => {
                        console.log("Error al sincronizar la tabla Precios Diámetros");
                        return false;
                    });
            });

        });

    });

    return true;
}



// funciones RECEPCIONES
export const createTableRecepciones = async () => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists recepciones (
            id integer primary key AUTOINCREMENT NOT NULL,
            tipo_madera_id integer  NOT NULL,
            madera_id integer  DEFAULT NULL,
            tipo_doc_recep_id integer  DEFAULT NULL,
            proveedor_id integer  NOT NULL,
            origen_id integer  NOT NULL,
            destino_id integer  NOT NULL,
            transportista_id integer  NOT NULL,
            chofer_id integer  NOT NULL,
            recepcionista_id integer  NOT NULL,
            fsc_id integer  DEFAULT NULL,
            fsc_codigo varchar(200)  DEFAULT NULL,
            patente_camion varchar(6)  DEFAULT NULL,
            patente_carro varchar(6)  DEFAULT NULL,
            flete numeric(10,2) NOT NULL DEFAULT '0.00',
            poriva numeric(10,2) NOT NULL DEFAULT '19.00',
            neto numeric(10,2) NOT NULL DEFAULT '0.00',
            iva numeric(10,2) NOT NULL DEFAULT '0.00',
            total numeric(10,2) NOT NULL DEFAULT '0.00',
            folio_doc_recep integer DEFAULT NULL,
            fecha_doc_recep text DEFAULT NULL,
            predio varchar(80)  DEFAULT NULL,
            rol varchar(30) DEFAULT NULL,
            observacion varchar(255) DEFAULT NULL ,
            created_id integer DEFAULT NULL,
            updated_id integer DEFAULT NULL,
            deleted_id integer DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL
          );`; 

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Recepciones creada");
            },
            error => {
                console.log("Error al crear la tabla Recepciones");
            });
    });
}
// funciones RECEPCIONES DETALLES
export const createTableRecepcionDetalles = async (db: SQLiteDatabase) => {

    (await db).transaction(txn => {

        const query =
        `create table if not exists recepcion_detalles (
            id integer primary key AUTOINCREMENT NOT NULL,
            recepcion_id integer  NOT NULL,
            producto_id integer  NOT NULL,
            diametro integer  NOT NULL DEFAULT '0',
            volumen numeric(10,2) NOT NULL DEFAULT '0.00',
            espesor numeric(10,2) NOT NULL DEFAULT '0.00',
            ancho numeric(10,2) NOT NULL DEFAULT '0.00',
            largo numeric(10,3) NOT NULL DEFAULT '0.000',
            cant_despacho numeric NOT NULL DEFAULT '0',
            mc_despacho numeric(10,3) NOT NULL DEFAULT '1.000',
            pulg_despacho numeric(10,2) NOT NULL DEFAULT '0.00',
            mruma_despacho numeric(10,2) NOT NULL DEFAULT '0.00',
            cant_recepcion numeric NOT NULL DEFAULT '0',
            mc_recepcion numeric(10,3) NOT NULL DEFAULT '1.000',
            pulg_recepcion numeric(10,2) NOT NULL DEFAULT '0.00',
            mruma_recepcion numeric(10,2) NOT NULL DEFAULT '0.00',
            precio numeric NOT NULL DEFAULT '1',
            total numeric(10,3) NOT NULL DEFAULT '1.000',
            created_id integer  DEFAULT NULL,
            updated_id integer  DEFAULT NULL,
            deleted_id integer  DEFAULT NULL,
            created_at text NULL DEFAULT NULL,
            updated_at text NULL DEFAULT NULL,
            deleted_at text NULL DEFAULT NULL,
            FOREIGN KEY(recepcion_id) REFERENCES recepciones(id)
          );`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("tabla Detalles de Recepciones creada");
            },
            error => {
                console.log("Error al crear la tabla Detalles de Recepciones");
            });
    });
}



// funciones SELECT

export const selectRecepciones = async (db: SQLiteDatabase) => {

    const tasks: any[] = [];
    const query = `select * from recepciones`;

    console.log("Obteniendo recepciones");
    const result = await db.executeSql(query);
    result.forEach(function (resultSet) {
        for (let index = 0; index < resultSet.rows.length; index++) {
            tasks.push(resultSet.rows.item(index));
        }
    });
    console.log(tasks);
    return tasks;

}


export const deleteRecepciones = async (db: SQLiteDatabase) => {

    const query = `delete from recepcion_detalles;`;

    console.log("delete recepcion_detalles");
    return db.executeSql(query);

    (await db).transaction(txn => {

        const query = `delete from origen_destinos;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Origen Destino borrada");
            },
            error => {
                console.log("Error al borrar la tabla Origen Destino");
            });
    });

}

export const deleteRecepcionesDetalles = async (db: SQLiteDatabase) => {

    const query = `delete from recepcion_detalles;`;

    console.log("delete recepcion_detalles");
    return db.executeSql(query);

    (await db).transaction(txn => {

        const query = `delete from origen_destinos;`;

        txn.executeSql(query,
            [],
            (sqlTxn: Transaction, res: ResultSet) => {
                console.log("Tabla Origen Destino borrada");
            },
            error => {
                console.log("Error al borrar la tabla Origen Destino");
            });
    });

}

export const dropRecepcionesDetalles = (db: SQLiteDatabase) => {

    const query = `drop table if exists recepcion_detalles;`;

    console.log("delete recepcion_detalles");
    return db.executeSql(query);

}

export const uploadRecepciones = async (db: SQLiteDatabase) => {

    try {

        // obtener datos de recepcion en dispositivo local

        const queryRecepciones = `select * from recepciones;`

        const resultRecepciones = await db.executeSql(queryRecepciones);

        resultRecepciones.forEach(async function (resultSet) {

            for (let index = 0; index < resultSet.rows.length; index++) {

                const tasksRecepciones: any[] = [];
                const tasksDetalles: any[] = [];
                //tasks.push(resultSet.rows.item(index));
                let id = resultSet.rows.item(index).id;
                //console.log(`Recepción ID: ${id}`)
                const queryDetalles = `select * from recepcion_detalles where recepcion_id = ${id};`;
                const resultDetalles = await db.executeSql(queryDetalles);

                // apilar detalles
                resultDetalles.forEach(function (detalles) {
                    //console.log(`Contador detalle para id: ${detalles.rows.length}`);
                    for (let j = 0; j < detalles.rows.length; j++) {

                        console.log(`Producto detalle ${detalles.rows.item(j).producto_id}, díametro: ${detalles.rows.item(j).diametro}`);

                        tasksDetalles.push({
                            producto_id: detalles.rows.item(j).producto_id,
                            diametro: detalles.rows.item(j).diametro,
                            volumen: detalles.rows.item(j).volumen,
                            espesor: detalles.rows.item(j).espesor,
                            ancho: detalles.rows.item(j).ancho,
                            largo: detalles.rows.item(j).largo,
                            cant_despacho: detalles.rows.item(j).cant_despacho,
                            mc_despacho: detalles.rows.item(j).mc_despacho,
                            pulg_despacho: detalles.rows.item(j).pulg_despacho,
                            mruma_despacho: detalles.rows.item(j).mruma_despacho,
                            cant_recepcion: detalles.rows.item(j).cant_recepcion,
                            mc_recepcion: detalles.rows.item(j).mc_recepcion,
                            pulg_recepcion: detalles.rows.item(j).pulg_recepcion,
                            mruma_recepcion: detalles.rows.item(j).mruma_recepcion,
                            precio: detalles.rows.item(j).precio,
                            total: detalles.rows.item(j).total
                        })
                    }
                });

                // apilar recepciones y adjuntar recepciones
                //console.log(`Contador recepcion para id: ${resultSet.rows.length}`);
                //console.log(`Recepción Proveedor: ${resultSet.rows.item(index).proveedor_id}`);

                tasksRecepciones.push({
                    // solo para asociar el detalle, pero no para la bd final
                    tipo_madera_id: resultSet.rows.item(index).tipo_madera_id,
                    madera_id: resultSet.rows.item(index).madera_id,
                    tipo_doc_recep_id: resultSet.rows.item(index).tipo_doc_recep_id,
                    proveedor_id: resultSet.rows.item(index).proveedor_id,
                    origen_id: resultSet.rows.item(index).origen_id,
                    destino_id: resultSet.rows.item(index).destino_id,
                    transportista_id: resultSet.rows.item(index).transportista_id,
                    chofer_id: resultSet.rows.item(index).chofer_id,
                    recepcionista_id: resultSet.rows.item(index).recepcionista_id,
                    fsc_id: resultSet.rows.item(index).fsc_id,
                    fsc_codigo: resultSet.rows.item(index).fsc_codigo,
                    patente_camion: resultSet.rows.item(index).patente_camion,
                    patente_carro: resultSet.rows.item(index).patente_carro,
                    flete: resultSet.rows.item(index).flete,
                    poriva: resultSet.rows.item(index).poriva,
                    neto: resultSet.rows.item(index).neto,
                    iva: resultSet.rows.item(index).iva,
                    total: resultSet.rows.item(index).total,
                    folio_doc_recep: resultSet.rows.item(index).folio_doc_recep,
                    fecha_doc_recep: resultSet.rows.item(index).fecha_doc_recep,
                    predio: resultSet.rows.item(index).predio,
                    rol: resultSet.rows.item(index).rol,
                    observacion: resultSet.rows.item(index).observacion,
                    tasksDetalles
                });

                console.log(tasksRecepciones);

                // cargar en API
                const token = await AsyncStorage.getItem('token');

                const config = {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                const res = await Promise.all([
                    sigalcasApi.post('/mobil/recepciones/store',
                        { data: tasksRecepciones },
                        config)
                ]);


                const data = res.map((res) => res.data.data);


                console.log(data);

            }





        });




        // cerrar BD

        // generar estado de carga exitosa para despues eliminar registros

        // mostrar a usuario carga exitosa
    }
    catch (ex: any) {
        // mostrar a usuario problema en carga
    }
}

export const uploadRecepcionesDetalles = () => {

    try {

        // obtener datos de detalles de recepcion en dispositivo local

        // cargar en API

        // generar estado de carga exitosa para despues eliminar registros

        // mostrar a usuario carga exitosa
    }
    catch (ex: any) {
        // mostrar a usuario problema en carga
    }
}


export async function initDatabase() {


    // creación de tablas
    await createTableTipoDocumentos();
    await createTableEmpresas();
    await createTableFSC();
    await createTableFSCEmpresas();
    await createTableOrigenDestino();
    await createTableTipoMaderas();
    await createTableMaderas();
    await createTableDespachadores();
    await createTableChoferes();
    await createTableProductos();
    await createTableRecepciones();
    await createTableProveedorPrecios();
    await createTablePrecioDiametros();
    // //await dropRecepcionesDetalles(db);
    // await createTableRecepcionDetalles(db);
    //await deleteRecepcionesDetalles(db);

}