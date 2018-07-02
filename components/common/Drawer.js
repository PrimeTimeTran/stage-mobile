import React, { Component } from 'react'
import {
  AsyncStorage,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import Moment from 'moment'

import Color from '../../constants/Colors'
import CurrentUser from '../../utils/CurrentUser'
import client from '../../utils/client'
import { t } from '../../locales/i18n'

import {
  Avatar,
  DrawerCard,
  Spinner
} from './index'

let { width, height } = Dimensions.get('window')
class Drawer extends Component {
  state = {
    currentUser: null,
    mostRecentPhotoUrl: null
  }

  componentDidMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
  }

  componentWillReceiveProps() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })

    const request = client()
    request
      .then(api =>
        api.get('uploads/1')
      )
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ mostRecentPhotoUrl: data.most_recent_profile_photo_url })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }


  onLogOut = () => {
    let keys = ['auth_token', 'current_user']

    CurrentUser.remove()
    AsyncStorage.multiRemove(keys, err => {
      let { navigation } = this.props.descriptors.App
      navigation.closeDrawer()
      navigation.navigate('Welcome')
    })
  }

  getCurrentUserFullName() {
    const { currentUser } = this.state
    if (currentUser) {
      return [
        currentUser.first_name,
        currentUser.last_name
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

  onEditProfile = () => {
    this.props.navigation.navigate('EditProfile', { profile_screen: 'Drawer' })
  }

  onFriends = () => {
    this.props.navigation.navigate('Friends')
  }

  onMedia = () => {
    this.props.navigation.navigate('Media')
  }

  render() {
    const {
      currentUser,
      mostRecentPhotoUrl
    } = this.state

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

    if (currentUser && mostRecentPhotoUrl) {
      return (
        <View style={style}>
          <View style={drawerHeaderStyle}>
            <Avatar
                url={mostRecentPhotoUrl}
                custom={avatarStyle}
              />
            {currentUser && (
              <View>
                <Text style={headerTextStyle}>
                  {this.getCurrentUserFullName()}
                </Text>
                <Text style={headerSubTextStyle}>
                  {t('drawer.joined')} {this.getCurrentUserJoinedSince()}
                </Text>
              </View>
            )}
          </View>
          <View style={drawerContentStyle}>

            <TouchableOpacity onPress={this.onEditProfile}>
              <DrawerCard
                type="entypo"
                name="user"
                content={ t('drawer.profile.title') }
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onFriends}>
              <DrawerCard
                type="entypo"
                name="users"
                content={ t('drawer.friends.title') }
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onMedia}>
              <DrawerCard
                type="material-icon"
                name="photo-library"
                content={ t('drawer.media.title') }
              />
            </TouchableOpacity>

            <DrawerCard
              type="font-awesome"
              name="map"
              content={ t('drawer.map') }
            />
            <DrawerCard
              type="font-awesome"
              name="gift"
              content={ t('drawer.gifting') }
            />
            <DrawerCard
              type="material-icon"
              name="payment"
              content={ t('drawer.billing') }
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity onPress={this.onLogOut}>
              <DrawerCard
                type="material-community"
                name="logout"
                content={ t('drawer.logout') }
                custom={{ borderBottomWidth: 0 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return <Spinner />
    }
  }
}

export { Drawer }

const styles = StyleSheet.create({
  headerTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  avatarStyle: {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee'
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
})
