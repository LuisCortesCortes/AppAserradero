import axios from "axios";

const baseURL = 'http://10.0.2.2:8000/api'; // cambiar en producción

const sigalcasApi = axios.create({ baseURL, responseType: 'json' }); //baseURL : baseURL pero tienen el mismo nombre

export default sigalcasApi;