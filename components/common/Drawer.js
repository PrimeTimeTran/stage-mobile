import React, { Component } from 'react'
import {
  AsyncStorage,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import { DrawerCard } from './DrawerCard'

let { width, height } = Dimensions.get('window')

class Drawer extends Component {
  async onLogOut() {
    console.log('TODO: Figure out how to navigate to the Welcome screen after logging out. Navigation props is undefined')
    console.log('This props', this.props)

    let keys = ['auth_token', 'current_user']
    AsyncStorage.multiRemove(keys, (err) => { console.log('Logged Out')})
  }


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
          <TouchableOpacity onPress={this.onLogOut}>
            <DrawerCard type="material-community" name="logout" content="Log Out" />
          </TouchableOpacity>
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