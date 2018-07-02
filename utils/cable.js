import cable from 'react-native-actioncable'
import { AsyncStorage, Platform } from 'react-native'
import {
  DEV_CABLE_ANDROID,
  DEV_CABLE_IOS,
  STAGING_CABLE_API
} from 'react-native-dotenv'
let consumer
let backendHost
let socketType
const hostname = window && window.location && window.location.hostname

if (hostname === 'staging.getonstageapp.com') {
  socketType = 'wss'
  backendHost = STAGING_CABLE_API
} else {
  socketType = 'ws'
  if (Platform.OS == 'ios') {
    backendHost = DEV_CABLE_IOS
  } else {
    backendHost = DEV_CABLE_ANDROID
  }
}

const createChannel = async (...args) => {
  let token = await AsyncStorage.getItem('auth_token')
  token = token.slice(1, -1)
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${token}`)
  }
  return consumer.subscriptions.create(...args)
}

export default createChannel
