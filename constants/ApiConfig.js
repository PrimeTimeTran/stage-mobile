import { BACKEND_API_HOST } from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'

if (false) {
  backendHost = `https://${hostname}`
} else {
  backendHost = BACKEND_API_HOST || 'http://localhost:3000'
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
