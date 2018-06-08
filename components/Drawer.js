import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'

let { width, height } = Dimensions.get('window')

export default class Drawer extends Component {
  render() {
    const { drawerStyle } = styles
    const open = this.props.navigation.state.isDrawerOpen
    const style = open ? drawerStyle : ''
    return (
      <View style={style}>
        <View >
          <Text style={{color: 'red'}}> Drawer Component </Text>
        </View>
      </View>
    )
  }
}

styles = {
  drawerStyle: {
    backgroundColor: '#333333',
    height: height,
    width: width * .80,
    alignItems: 'center',
    justifyContent: 'center'
  }
}