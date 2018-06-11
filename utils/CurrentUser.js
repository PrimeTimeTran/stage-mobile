import { AsyncStorage } from 'react-native'
import db from '../utils/PouchDB'

const get = () => {
  return db.get('current_user').then((doc) => {
    return doc.data
  })
}

export default { get: get }
