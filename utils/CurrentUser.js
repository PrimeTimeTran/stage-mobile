import { AsyncStorage } from 'react-native'

const CurrentUser = () => {
  const currentUser = AsyncStorage.getItem('current_user')
  return currentUser
}

export default CurrentUser