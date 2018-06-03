import { BACKEND_API_HOST } from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'

if (false) {
  backendHost = `https://${hostname}/${apiVersion}/`
} else {
  backendHost = BACKEND_API_HOST || 'https://localhost:3000' || process.env.REACT_APP_BACKEND_HOST
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
