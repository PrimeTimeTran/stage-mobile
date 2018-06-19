import React, { Component } from 'react'
import {
  AsyncStorage,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import Moment from 'moment'

import Color from '../../constants/Colors'
import CurrentUser from '../../utils/CurrentUser'

import { Avatar } from '../../components/common'
import { DrawerCard } from './DrawerCard'

let { width, height } = Dimensions.get('window')
class Drawer extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
  }

  onLogOut() {
    let keys = ['auth_token', 'current_user']

    CurrentUser.remove()
    AsyncStorage.multiRemove(keys, err => {
      let { navigation } = this.props.descriptors.App
      navigation.closeDrawer()
      navigation.navigate('Welcome')
    })
  }

  getCurrentUserFullName() {
    if (this.state.currentUser) {
      return [
        this.state.currentUser.first_name,
        this.state.currentUser.last_name
      ].join(' ')
    }
    return ''
  }

  getCurrentUserJoinedSince() {
    if (this.state.currentUser) {
      return Moment(this.state.currentUser.created_at).format('MMM YYYY')
    }
    return ''
  }

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  render() {
    const {
      drawerStyle,
      drawerHeaderStyle,
      drawerContentStyle,
      headerTextStyle,
      headerSubTextStyle,
      avatarStyle
    } = styles
    const open = this.props.navigation.state.isDrawerOpen
    const style = open ? drawerStyle : ''
    const user = CurrentUser.get()

    return (
      <View style={style}>
        <View style={drawerHeaderStyle}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={avatarStyle}
          />
          {this.state.currentUser && (
            <View>
              <Text style={headerTextStyle}>
                {this.getCurrentUserFullName()}
              </Text>
              <Text style={headerSubTextStyle}>
                Joined since {this.getCurrentUserJoinedSince()}
              </Text>
            </View>
          )}
        </View>
        <View style={drawerContentStyle}>
          <TouchableOpacity onPress={this.handleEditProfile}>
            <DrawerCard type="entypo" name="user" content="Profile" />
          </TouchableOpacity>
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
  headerTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  avatarStyle: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: '#c00'
  },
  headerSubTextStyle: {
    color: '#fff',
    fontSize: 13
  },
  drawerHeaderStyle: {
    backgroundColor: Color.themeColor,
    height: 161,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: 'row'
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
