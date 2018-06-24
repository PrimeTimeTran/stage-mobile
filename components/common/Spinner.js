import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import Colors from '../../constants/Colors'

const Spinner = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 200,
      backgroundColor: 'white'
    }}>
    <ActivityIndicator size="large" color={Colors.themeColor.toString()} />
  </View>
)

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
export { Spinner }
