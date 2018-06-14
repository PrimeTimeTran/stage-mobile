import React, { Component } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'

import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import { Avatar, CardSection } from '../components/common'

export default class UsersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerTitle: 'Users',
    headerRight: (
      <Button
        title="Users"
        onPress={() => navigation.navigate('Users')}
        color="white">
        <Text>Go</Text>
      </Button>
    )
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
        this.setState({ conversation: response.data}, () => console.log('State', this.state))
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
        <CardSection custom={{ paddingLeft: 15 }}>
          <View style={{ flex: 1 }}>
            <Text>{conversation.stage_name}</Text>
          </View>
          <View>
            <Text>{conversation.user_count}</Text>
          </View>
        </CardSection>
        { users &&
            users.map(user => {
              return (
                <CardSection key={user.id} custom={userContainerStyle}>
                  <View>
                    <Avatar url={user.avatar_url} custom={[avatarStyle, { marginTop: 5 }]} />
                  </View>
                  <View style={{ padding: 5, marginRight: 10 }}>
                    <Text style={{ color: Colors.themeColor, fontSize: 20 }}>{user.full_name}, {user.age}</Text>
                    {/* <Icon type="evilicon" name='like' /> */}
                    <Text style={{ marginRight: 15 }}>{user.occupation}</Text>
                    <View>
                      <Text numberOfLines={2} style={{ marginRight: 50 }}>{user.description}</Text>
                    </View>
                  </View>
                </CardSection>
              )})}
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