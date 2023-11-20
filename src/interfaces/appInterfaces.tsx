
export interface LoginData {
    rut_dv:     string;
    password:  string;
}

export interface LoginResponse {
    usuario: Usuario;
    token: string;
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    rut_dv: string;
    uid:    string;
    img?:   string;
}

export interface MenuItem {
    name: string;
    icon: string;
    component: string;
}

export interface Proveedor {
    id:             number;
    rut_dv:         string;
    razon_social:   string;
    cliente:        number;
    proveedor:      number;
    transportista:  number;
    giro:           string;
    direccion:      string;
    ciudad_id:      number;
    comuna_id:      number;
    telefono:       string;
    email:          string;
    contacto:       string;
    observacion:    string;
    vigente:        number;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface TipoDocumento {
    id:             number;
    codigo:         string;
    nombre:         string;
    codigo_sii:     string;
    correlativo:    number;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface OrigenDestino {
    id:             number;
    descripcion:    string;
    flete:          number;
    observacion:    string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface TipoMadera {
    id:             number;
    nombre:         string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Madera {
    id:             number;
    tipo_madera_id: number;
    nombre:         string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Despachador {
    id:             number;
    rut_dv:         string;
    nombre:         string;
    telefono:       string;
    email:          string;
    observacion:    string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Chofer {
    id:             number;
    rut_dv:         string;
    nombre:         string;
    telefono:       string;
    email:          string;
    observacion:    string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Ciudad {
    id:             number;
    nombre:         string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;    
}

export interface Comuna {
    id:             number;
    nombre:         string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;    
}

export interface Fsc {
    id:             number;
    nombre:         string;
    nombre2:        string;
    empresa_id:     number;
    created_at?:    string;
    updated_at?:    string;
}

export interface Empresa {
    id:             number;
    rut_dv:         string;
    razon_social:   string;
    cliente:        number;
    proveedor:      number;
    transportista:  number;
    giro:           null,
    direccion:      string;
    ciudad:         Ciudad[];
    comuna:         Comuna[],
    fscs:           Fsc;
    telefono:       string;
    email:          string;
    contacto:       string;
    observacion:    string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Transporte {
    id:             number;
    rut_dv:         string;
    razon_social:   string;
    cliente:        number;
    proveedor:      number;
    transportista:  number;
    giro:           null,
    direccion:      string;
    ciudad_id:      number;
    comuna_id:      number;
    telefono:       string;
    email:          string;
    contacto:       string;
    observacion:    string;
    vigente:        boolean;
    created_id:     number;
    updated_id:     number;
    deleted_id:     number;
    created_at:     string;
    updated_at:     string;
    deleted_at:     string;
}

export interface Recepcion {
    id:                 number | null;
    folio_doc_recep:    number | null;
    tipo_doc_recep_id:  number | null;
    tipo_madera_id:     number | null;
    madera_id:          number | null;
    proveedor_id:       number | null;
    origen_id:          number | null;
    destino_id:         number | null;
    transportista_id:   number | null;				
    chofer_id:          number | null;					
    recepcionista_id:   number | null;		
    fecha_doc_recep:    string | null;												
    fsc_id:             string | null;								
    fsc_codigo:         string | null;
    patente_camion:     string | null;
    patente_carro:      string | null;
    predio:             string | null;
    rol:                string | null;
    flete:              number | null;
    poriva:             number | null;
    neto:               number | null;
    iva:                number | null;
    total:              number | null;
    observacion:        string | null;
}


// Recepciones
export interface RecepcionData {
    folio_doc_recep:     string;
}

// Detalle de recepción
export interface RecepcionDetalle {
    id:                 number | null;
    recepcion_id:       number | null;
    producto_id:        number | null;
    diametro:           number | null;
    volumen:            number | null;
    espesor:            number | null;
    ancho:              number | null;
    largo:              number | null;
    cant_despacho:      number | null;
    mc_despacho:        number | null;
    pulg_despacho:      number | null;
    mruma_despacho:     number | null;
    cant_recepcion:     number | null;
    mc_recepcion:       number | null;
    pulg_recepcion:     number | null;
    mruma_recepcion:    number | null;
    precio:             number | null;
    total:              number | null;
    created_id:         number | null;
    updated_id:         number | null;
    deleted_id:         number | null;
    created_at:         string | null;
    updated_at:         string | null;
    deleted_at:         string | null;
}
