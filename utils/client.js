import axios from 'axios';
import { AsyncStorage } from 'react-native';

const client = async () => {
  // await AsyncStorage.setItem('auth_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoyMSwiZXhwIjoxNTU5NTI3MzY3fQ.o5oK4ICHerM5LFxDPhC9Yn1cDiohcNoMRMGCU4V0qvTGKMYOMoZEHbvIENXu48t0SXwPU-dTiXOplvECCaNO8Q')
  // await AsyncStorage.setItem('auth_token', '')
  await AsyncStorage.setItem('token', '')
  let token = await AsyncStorage.getItem('auth_token');
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
