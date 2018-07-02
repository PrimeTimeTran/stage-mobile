import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native'

import Colors from '../../constants/Colors'

class Spinner extends React.Component {
  state = { timeOut: null }

  componentWillMount() {
    setInterval(() => this.setState({ timeOut: true }), 5000)
  }

  render() {
    const { timeOut } = this.state
    const { spinnerStyle } = styles
    if (timeOut) {
      return (
        <View style={spinnerStyle}>
          <Text>Timed out =(</Text>
        </View>
      )
    } else {
      return (
        <View style={spinnerStyle}>
          <ActivityIndicator size="large" color={Colors.themeColor.toString()} />
        </View>
      )
    }

  }
}

export { Spinner }

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'white'
  }
})

