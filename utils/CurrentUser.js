import { AsyncStorage } from 'react-native'
import db from '../utils/PouchDB'

const get = () => {
  return db.get('current_user').then((doc) => {
    return doc.data
  })
}

const put = currentUser => {
  console.log('Putting!', currentUser);
  return db.put('current_user', currentUser).then((doc) => {
    return doc.data
  })
}

export default { get: get, put: put }
