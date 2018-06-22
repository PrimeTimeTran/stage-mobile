import cable from 'react-native-actioncable'
import { AsyncStorage, Platform } from 'react-native'

let consumer
let backendHost
let socketType

if (Platform.OS == 'ios') {
  backendHost = 'localhost:3000'
} else {
  backendHost = '192.168.1.218:3000'
}

socketType = 'ws'

const createChannel = async (...args) => {
  let token = await AsyncStorage.getItem('auth_token')
  token = token.slice(1, -1)
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${token}`)
  }
  return consumer.subscriptions.create(...args)
}

export default createChannel
