import axios from 'axios'
import config from '@/config.js';

const api_fetch = async (url, method = "GET", data = undefined) => {
  const o = {
    baseURL: config.baseURL,
    url,
    method,
  }
  if( data !== undefined) o.data = data;
  let resp;
  try {
    resp = await axios(o);
    return resp?.data || {};
  } catch ( e ) {
    if( e.response ) {      
      return { 
        error: e.response?.data?.error || e 
      }
    } else {
      return {
        error: e
      }
    }
  }
}

export default api_fetch