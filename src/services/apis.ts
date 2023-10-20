
import axios from 'axios';

export const currencyApi = axios.create({ 
  baseURL: 'https://api.fxratesapi.com/', 
  params: {
    'api_key': import.meta.env.FX_RATES_API_SECRET
  } 
})