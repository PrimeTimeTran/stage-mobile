import { SQLite } from 'expo'
import PouchDB from 'pouchdb-react-native'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
PouchDB.plugin(SQLiteAdapter)
const db = new PouchDB('stages.db', { adapter: 'react-native-sqlite' })

export default db
