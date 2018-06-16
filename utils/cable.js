import cable from 'react-native-actioncable'
import { Platform } from 'react-native'

let consumer
let backendHost
let socketType
let hardToken

// Signup
// http :3000/v1/signup email=loi@gmail.com password=asdfas password_confirmation=asdfas
// Fetch token
// http :3000/v1/auth/login email=datloiboi@gmail.com password=asdfas password_confirmation=asdfas
// Request with Token
// http :3000/v1/posts Accept:"application/vnd.posts.v1+json" Authorization:"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoyMSwiZXhwIjoxNTU5NTI3MTI3fQ.06c2qq-LSx3WekKrOcvuhGLiNTPndu394pTHc53qgTgBJM3dK1LFFgToaXoCxhBK92oESkygzBmhTAzjDDeY1A"

if (Platform.OS == 'ios') {
  backendHost = 'localhost:3000'
  // Christine's Token
  hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk4ODI2NjR9.-3gL9QuAuM0UGbanEr8RtruvLK-WGHYq7PeyQMLwrR8OiDYH4QBzJiNvdCvePRSKJF1HXeLd5Fl-CycFP1FjFw'
} else {
  backendHost = '192.168.1.6:3000'
  // Loi's token
  hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjA3MDg4MTl9.fLoOpqCnWH0UPp-sjXak33ktOESkJo_vZU6fsRcKal5J4HgoI4YtiBwy8qt1lsAebonRj_zXd8TXBBhVYxsEsw'
}

socketType = 'ws'

function createChannel(...args) {
  // let token = AsyncStorage.getItem('auth_token')
  if (!consumer) {
    consumer = cable.createConsumer(`${socketType}://${backendHost}/cable?token=${hardToken}`)
  }
  return consumer.subscriptions.create(...args)
}

export default createChannel