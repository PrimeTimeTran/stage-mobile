import React, { Component } from 'react'
import {
  View,
  Dimensions
} from 'react-native'

import { DrawerCard } from './components/common'

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
        <View>
          <DrawerCard type="material-community" name="logout" content="Log Out" custom={{borderBottomWidth: 0, paddingBottom: 20}} />
        </View>
      </View>
    )
  }
}

export { Drawer }

styles = {
  drawerStyle: {
    backgroundColor: '#333333',
    height: height,
    width: width * .80,
    paddingTop: 40,
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  cardBackgroundStyle: {
    backgroundColor: '#333333',
    marginTop: 20,
    borderBottomColor: 'yellow',
  },
  cardStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 15
  }
}