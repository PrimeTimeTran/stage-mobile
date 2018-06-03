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
  // Token used to determine who created the message

  // let token = AsyncStorage.getItem('auth_token');
  // if (!consumer) {
  //   consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${token}`);
  // }

  let hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1NTk1MzQyMzF9.uAAeML_EGXSqcpqedlaOiUjFyCbwzIFY3Jp5uSl6yHA6anfJDmn05__jT8mAcTun5Yqb0auKvKFWjpBL1LPYPg'
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${hardToken}`);
  }

  return consumer.subscriptions.create(...args);
}

export default createChannel;