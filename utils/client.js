import axios from 'axios'
import { AsyncStorage } from 'react-native'

const client = async () => {
  let hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1NTk1MzQyMzF9.uAAeML_EGXSqcpqedlaOiUjFyCbwzIFY3Jp5uSl6yHA6anfJDmn05__jT8mAcTun5Yqb0auKvKFWjpBL1LPYPg'
  let token = await AsyncStorage.getItem('auth_token')
  if (!token) {
    token = hardToken
  }

  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${hardToken}` : ''
    }
  }

  return {
    get: (url, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options })
  }
}

export default client
