import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import { FriendCard, Spinner } from '../components/common'

export default class FriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Friends',
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          navigation.navigate('App')
          navigation.openDrawer()
        }}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })

  state = {
    friends: null
  }

  async componentWillMount() {
    const request = client()
      request
        .then(api => api.get(`${API_ROOT}friendships`))
        .then(response => {
          this.setState({ friends: response.data }, () => { console.log('Friends', this.state.friends)})
          return response.data
        })
        .catch(error => {
          console.log('Error:', error)
        })
  }


  render() {
    const {
      friends
    } = this.state

    if (friends) {
      return (
        <ScrollView>
          {friends.map(friend => {
            console.log('Friend', friend);
            return (
              <FriendCard url={friend.avatar_url} />
            )
          })
          }
        </ScrollView>
      )
    } else {
      return <Spinner />
    }
  }
}
