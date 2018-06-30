import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { API_ROOT } from '../constants/ApiConfig'

const client = async () => {
  // let hardToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk1Nzk4MTJ9.yQnmTqPo5kTHOFrkbR5f4YXuYJQo3t5WXkYH8zS-Oa-b6OlridEu9McSlwVMN5yVg9OD8L6t0b6MBbWwonAwVg'
  let token = await AsyncStorage.getItem('auth_token')

  if (token) {
    token = token.slice(1, -1)
  }

  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${token}` : ''
    }
  }

  return {
    get: (url, options = {}) =>
      axios.get(API_ROOT + url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(API_ROOT + url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axios.put(API_ROOT + url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(API_ROOT + url, { ...defaultOptions, ...options })
  }
}

export default client
