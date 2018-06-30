import { Platform } from 'react-native'
import {
  BACKEND_API_HOST,
  BACKEND_HOST_IOS
} from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'

// Requirement for Loi's local development
// TODO: Add conditional for staging & production
// STAGING API 'https://staging.getonstageapp.com'

if (Platform.OS == 'ios') {
  backendHost = BACKEND_HOST_IOS
} else {
  backendHost = BACKEND_API_HOST
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
console.log('Api Root: ', API_ROOT)
