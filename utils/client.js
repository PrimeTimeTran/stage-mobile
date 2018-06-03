import axios from 'axios';
import { AsyncStorage } from 'react-native';

const client = async () => {
  // let token = await AsyncStorage.getItem('auth_token');
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTk0ODkxMjl9.0M5XmIK1fOh2LH9Q9ZCtJT49EW6-ILBSqqEi90f2taRy7zL-yrPqJIjkG6bWkUo4egxJsx70roH-QehzpHWj0A"

  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${token}` : '',
    },
  };

  return {
    get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};

export default client;
