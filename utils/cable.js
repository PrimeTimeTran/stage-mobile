import cable from 'react-native-actioncable';
import { AsyncStorage } from 'react-native';

let consumer;
let backendHost;
let socketType;
let hostname = 'localhost'

if (hostname === 'localhost') {
  backendHost = 'localhost:3001';
  socketType = 'ws';
} else {
  backendHost = 'lit-brushlands-65490.herokuapp.com';
  socketType = 'wss';
}

function createChannel(...args) {
  // let token = AsyncStorage.getItem('auth_token');
  // if (!consumer) {
  //   consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${token}`);
  // }

  let hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk0NDU3NjF9.lM2DRgEh5YmM1Fm68R0lz3Im2sdAzN0sQHhawea8aHcZTutA60HiL5Gbvg7-mXQ29PA9Xy7wbCX2xcKr9n8Hfg'
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${hardToken}`);
  }

  return consumer.subscriptions.create(...args);
}

export default createChannel;