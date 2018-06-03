let backendHost;
const apiVersion = 'v1';
import { BACKEND_API_HOST } from 'react-native-dotenv'

const hostname = window && window.location && window.location.hostname;

if(hostname === 'www.stage.io') {
  backendHost = `https://${hostname}/${apiVersion}/`;
} else {
  backendHost = BACKEND_API_HOST || 'http://localhost:3001' || process.env.REACT_APP_BACKEND_HOST
}

export const API_ROOT = `${backendHost}/${apiVersion}/`;
