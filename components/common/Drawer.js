import React, { Component } from 'react'
import { AsyncStorage, View, Dimensions, TouchableOpacity } from 'react-native'
import { Avatar } from '../../components/common'
import CurrentUser from '../../utils/CurrentUser'

import { DrawerCard } from './DrawerCard'
import Color from '../../constants/Colors'

let { width, height } = Dimensions.get('window')
class Drawer extends Component {
  onLogOut() {
    let keys = ['auth_token', 'current_user']
    AsyncStorage.multiRemove(keys, err => {
      let { navigation } = this.props.descriptors.App
      navigation.closeDrawer()
      navigation.navigate('Welcome')
    })
  }

  render() {
    const { drawerStyle, drawerHeaderStyle, drawerContentStyle } = styles
    const open = this.props.navigation.state.isDrawerOpen
    const style = open ? drawerStyle : ''
    const user = CurrentUser()

    return (
      <View style={style}>
        <View style={drawerHeaderStyle}>
          <Avatar url={CurrentUser().avatar_url} />
        </View>
        <View style={drawerContentStyle}>
          <DrawerCard type="entypo" name="user" content="Profile" />
          <DrawerCard type="entypo" name="users" content="Friends" />
          <DrawerCard
            type="material-icon"
            name="photo-library"
            content="Photos"
          />
          <DrawerCard type="font-awesome" name="map" content="Map" />
          <DrawerCard type="font-awesome" name="gift" content="Gifting" />
          <DrawerCard type="material-icon" name="payment" content="Billing" />
        </View>
        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => this.onLogOut()}>
            <DrawerCard
              type="material-community"
              name="logout"
              content="Log Out"
              custom={{ borderBottomWidth: 0 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export { Drawer }

const styles = {
  drawerHeaderStyle: {
    backgroundColor: Color.themeColor,
    height: 161
  },
  drawerContentStyle: {
    flex: 1,
    marginTop: 10
  },
  drawerStyle: {
    backgroundColor: '#fff',
    height: height,
    width: width * 0.8,
    justifyContent: 'space-between'
  }
}
