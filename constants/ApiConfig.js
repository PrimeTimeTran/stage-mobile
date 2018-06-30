import { Platform } from 'react-native'
import { BACKEND_API_HOST } from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'

if (false) {
  backendHost = `https://${hostname}`
} else {

  // Requirement for Loi's local development
  if (Platform.OS == 'ios') {
    backendHost = 'http://192.168.20.104:3000'
    // backendHost = 'http://localhost:3000'
    // backendHost = 'https://staging.getonstageapp.com'
  } else {
    backendHost = BACKEND_API_HOST
  }
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
console.log('Api Root: ', API_ROOT)
