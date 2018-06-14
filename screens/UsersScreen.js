import React, { Component } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'

import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import { Avatar, CardSection } from '../components/common'

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

  state = { users: [], conversation: {} }

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

  render() {
    const { users, conversation } = this.state
    const { userContainerStyle, avatarStyle } = styles
    return (
      <ScrollView>
        {users &&
          users.map(user => {
            return (
              <CardSection key={user.id} custom={userContainerStyle}>
                <View style={{ marginRight: 15 }}>
                  <Avatar
                    url={user.avatar_url}
                    custom={[avatarStyle, { marginTop: 5 }]}
                  />
                </View>
                <View style={{ padding: 5, marginRight: 10 }}>
                  <Text style={{ color: Colors.themeColor, fontSize: 20 }}>
                    {[user.full_name, user.age].filter(n => n).join(', ')}
                  </Text>
                  {/* <Icon type="evilicon" name='like' /> */}
                  <Text
                    style={{
                      marginRight: 15,
                      marginBottom: 10,
                      marginTop: 2,
                      color: '#999'
                    }}>
                    {user.occupation}
                  </Text>
                  <View>
                    <Text numberOfLines={2} style={{ marginRight: 70 }}>
                      {user.description}
                    </Text>
                  </View>
                </View>
              </CardSection>
            )
          })}
      </ScrollView>
    )
  }
}

const styles = {
  userContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  avatarStyle: {
    padding: 5,
    height: 50,
    width: 50,
    borderRadius: 25
  }
}
