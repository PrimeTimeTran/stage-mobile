import db from '../utils/PouchDB'

const get = () => {
  return db.get('current_user').then((doc) => {
    return doc.data
  })
}

const put = currentUser => {
  return db.put('current_user', currentUser).then((doc) => {
    return doc.data
  })
}

const remove = () => {
  console.log('DB', db);
  return db.remove('current_user')
}

export default { get: get, put: put, remove: remove }
