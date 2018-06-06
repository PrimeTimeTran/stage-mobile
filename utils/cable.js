import cable from 'react-native-actioncable'
import { AsyncStorage, Platform } from 'react-native'

let consumer
let backendHost
let socketType
let hostname = 'localhost'

// Signup
// http :3000/v1/signup email=loi@gmail.com password=asdfas password_confirmation=asdfas
// Fetch token
// http :3000/v1/auth/login email=christine@gmail.com password=asdfas password_confirmation=asdfas
// Request with Token
// http :3000/v1/posts Accept:"application/vnd.posts.v1+json" Authorization:"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoyMSwiZXhwIjoxNTU5NTI3MTI3fQ.06c2qq-LSx3WekKrOcvuhGLiNTPndu394pTHc53qgTgBJM3dK1LFFgToaXoCxhBK92oESkygzBmhTAzjDDeY1A"

if (Platform.OS == 'ios') {
  backendHost = 'localhost:3000'
} else {
  backendHost = '192.168.1.218:3000'
}

socketType = 'ws'

function createChannel(...args) {
  // Token used to determine who created the message

  // let token = AsyncStorage.getItem('auth_token')
  // if (!consumer) {
  //   consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${token}`)
  // }

  let hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk1Nzk4MTJ9.yQnmTqPo5kTHOFrkbR5f4YXuYJQo3t5WXkYH8zS-Oa-b6OlridEu9McSlwVMN5yVg9OD8L6t0b6MBbWwonAwVg'
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${hardToken}`)
  }

  return consumer.subscriptions.create(...args)
}

export default createChannel