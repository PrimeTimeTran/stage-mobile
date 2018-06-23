import db from '../utils/PouchDB'

const get = () => {
  return db.get('current_user').then((doc) => {
    return doc.data
  })
}

const put = currentUser => {
  db.get('current_user').then(doc => {
    return db.put({
      _id: currentUser._id,
      _rev: doc._rev,
      data: currentUser.data
    })
  })
}

const remove = () => {
  db.get('current_user').then(doc => {
    return db.remove(doc)
  })
}

export default {
  get: get,
  put: put,
  remove: remove
}
