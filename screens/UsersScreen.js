import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
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

  state = { users: null, stage: null }

  componentWillMount() {
    conversationId = this.props.navigation.state.params.conversation_id
    const request = client()
    request
      .then(api => api.get(`conversations/${conversationId}/users`))
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        console.log('Error: ', error)
      })

    request
      .then(api => api.get(`conversations/${conversationId}`))
      .then(response => {
        this.setState({ stage: response.data }, () => {
          this.props.navigation.setParams({
            title: `${this.state.stage.user_count} Members`
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
      name: name,
      navigation: this.props.navigation
    })
  }

  render() {
    const { users, stage } = this.state
    const { avatarStyle } = styles

    if (users) {
      return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
          {/* <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>{stage.stage_name}</Text>
          </View> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10
            }}>
            {users &&
              users.map(user => {
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={{
                      alignItems: 'center',
                      padding: 10
                    }}
                    onPress={() =>
                      this.onAvatarPress(user.id, user.first_name)
                    }>
                    <Avatar
                      url={user.avatar_url}
                      custom={[avatarStyle, { marginTop: 5 }]}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 5,
                        fontWeight: 'bold',
                        color: '#666'
                      }}>
                      {user.first_name}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#999' }}>
                      {user.age}
                    </Text>
                  </TouchableOpacity>
                )
              })}
          </View>
        </ScrollView>
      )
    } else {
      return <Spinner />
    }
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    elevation: 3,
    height: 73,
    width: 73,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#eee'
  }
})
