import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native';

let { width, height } = Dimensions.get('window')

export default class Drawer extends Component {
  render() {
    const { drawerStyle } = styles
    return (
      <View style={drawerStyle}>
        <View >
          <Text style={{color: 'red'}}> Drawer Component </Text>
        </View>
      </View>
    );
  }
}

styles = {
  drawerStyle: {
    height: height,
    width: width * .75,
    alignItems: 'center',
    justifyContent: 'center'
  }
}