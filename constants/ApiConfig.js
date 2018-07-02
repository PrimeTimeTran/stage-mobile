import { Platform } from 'react-native'
import {
  DEV_API_HOST_ANDROID,
  DEV_API_HOST_IOS
} from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'
const hostname = window && window.location && window.location.hostname

if (hostname === 'staging.getonstageapp.com') {
  backendHost = 'https://staging.getonstageapp.com'
} else {
  // Requirement for Loi's local development
  if (Platform.OS == 'ios') {
    backendHost = DEV_API_HOST_IOS
  } else {
    backendHost = DEV_API_HOST_ANDROID
  }
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
console.log('Api Root: ', API_ROOT)
