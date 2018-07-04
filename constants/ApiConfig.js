import { Platform } from 'react-native'
import {
  DEV_API_HOST_ANDROID,
  DEV_API_HOST_IOS,
  STAGING_HOST_API
} from 'react-native-dotenv'

let backendHost
const apiVersion = 'v1'
const hostname = window && window.location && window.location.hostname

if (hostname === 'staging.getonstageapp.com') {
  backendHost = STAGING_HOST_API
} else {
  // Requirement for Loi's local development
  if (Platform.OS == 'ios') {
    backendHost = DEV_API_HOST_IOS
    // backendHost = 'http://192.168.1.132:3000'
  } else {
    backendHost = DEV_API_HOST_ANDROID
  }
}

export const API_ROOT = `${backendHost}/${apiVersion}/`
console.log('Api Root: ', API_ROOT)
