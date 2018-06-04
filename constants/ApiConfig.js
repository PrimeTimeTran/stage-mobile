import { BACKEND_API_HOST } from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'

if (false) {
  backendHost = `https://${hostname}/${apiVersion}/`
} else {
  backendHost = BACKEND_API_HOST
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
