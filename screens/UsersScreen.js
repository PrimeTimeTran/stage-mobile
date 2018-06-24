import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import { Avatar, Spinner } from '../components/common'

export default class UsersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerTitle:
      typeof navigation.state.params === 'undefined' ||
      typeof navigation.state.params.title === 'undefined'
        ? 'Members'
        : navigation.state.params.title
  })

  state = { users: null, conversation: {} }

  componentWillMount() {
    conversationId = this.props.navigation.state.params.conversation_id
    const request = client()
    request
      .then(api => api.get(`${API_ROOT}conversations/${conversationId}/users`))
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        console.log('Error: ', error)
      })

    request
      .then(api => api.get(`${API_ROOT}conversations/${conversationId}`))
      .then(response => {
        this.setState({ conversation: response.data }, () => {
          this.props.navigation.setParams({
            title: `${this.state.conversation.user_count} Members`
          })
        })
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  onAvatarPress = (user, name) => {
    this.props.navigation.navigate('Profile', {
      user_id: user,
      name: name
    })
  }

  render() {
    const { users, conversation } = this.state
    const { avatarStyle } = styles

    if (users) {
      return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
        <Text>Go</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            {users &&
              users.map(user => {
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={{ alignItems: 'center' }}
                    onPress={() => this.onAvatarPress(user.id, user.first_name)}
                  >
                    <Avatar
                      url={user.avatar_url}
                      custom={[avatarStyle, { marginTop: 5 }]}
                    />
                    <Text>{user.first_name}</Text>
                    <Text>{user.age}</Text>
                  </TouchableOpacity>
                )
              })}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <Spinner />
      )
    }
  }
}

const styles = {
  avatarStyle: {
    padding: 5,
    height: 90,
    width: 90,
    borderRadius: 50
  }
}
