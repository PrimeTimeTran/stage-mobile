import React, { Component } from 'react'
import {
  View,
  Dimensions
} from 'react-native'

import { DrawerCard } from './DrawerCard'

let { width, height } = Dimensions.get('window')

class Drawer extends Component {
  render() {
    const { drawerStyle } = styles
    const open = this.props.navigation.state.isDrawerOpen
    const style = open ? drawerStyle : ''
    return (
      <View style={style}>
        <View>
          <DrawerCard type="entypo" name="user" content="Profile" />
          <DrawerCard type="entypo" name="users" content="Friends" />
          <DrawerCard type="material-icon" name="photo-library" content="Photos" />
          <DrawerCard type="font-awesome" name="map" content="Map" />
          <DrawerCard type="font-awesome" name="gift" content="Gifting" />
          <DrawerCard type="material-icon" name="payment" content="Billing" />
        </View>
        <View style={{borderBottomWidth: 0, paddingBottom: 20}}>
          <DrawerCard type="material-community" name="logout" content="Log Out" />
        </View>
      </View>
    )
  }
}

export { Drawer }

const styles = {
  drawerStyle: {
    backgroundColor: '#333333',
    height: height,
    width: width * .80,
    paddingTop: 40,
    paddingLeft: 30,
    justifyContent: 'space-between',
  }
}