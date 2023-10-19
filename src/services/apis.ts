
import axios from 'axios';

export const currencyApi = axios.create({ baseURL: 'https://api.frankfurter.app/' })