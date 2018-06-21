import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'

import { sendMessage, setCallback } from '../utils/chat'
import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'
import CurrentUser from '../utils/CurrentUser'

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerTitle:
      navigation.state.params.conversation_name ||
      navigation.state.params.other_user_name,
    headerRight: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() =>
          navigation.navigate('Users', {
            conversation_id: navigation.state.params.conversation_id
          })
        }>
        <Icon
          name="account-multiple"
          type="material-community"
          color="white"
          size={28}
        />
      </TouchableOpacity>
    )
  })

  state = { messages: [], currentUser: null }

  async componentWillMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
    const conversation_id = this.props.navigation.state.params.conversation_id

    const request = client()
    request
      .then(api =>
        api.get(`${API_ROOT}conversations/${conversation_id}/messages`)
      )
      .then(response => {
        return response.data
      })
      .then(data => {
        let messages = data.map(chat => chat.gifted_chat)
        this.setState({ messages })
      })
      .catch(error => {
        console.log('Error:', error)
      })

    setCallback(this.onReceive)
  }

  onReceive = data => {
    const conversationId = this.props.navigation.state.params.conversation_id
    const message = JSON.parse(data).gifted_chat
    const isSameConversation = JSON.parse(data).conversation_id == conversationId

    if (message.user._id != this.state.currentUser.id && isSameConversation) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    }
  }

  onSend(messages = []) {
    const conversation_id = this.props.navigation.state.params.conversation_id
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
    sendMessage({
      conversation_id: conversation_id,
      body: messages[0].text
    })
  }

  onLongPress = (context, message) => {
    console.log('Long Pressed context:', context)
    console.log('Long Pressed message:', message)
  }

  renderBubble = props => {
    let username = props.currentMessage.user.name
    const [color, textColor] = this.getColor(username)

    if (this.state.currentUser.id == props.currentMessage.user._id) {
      return (
        <Bubble
          {...props}
          position="right"
          textStyle={{
            right: {
              color: 'white'
            },
            left: {
              color: textColor
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: color,
              padding: 5
            }
          }}
        />
      )
    } else {
      return (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'white'
            },
            left: {
              color: textColor
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: color,
              padding: 5
            }
          }}
        />
      )
    }
  }

  getColor(username) {
    // TODO
    // Username is undefined the first time this renders after a new message is sent.
    if (!username) {
      username = 'Hello'
    }
    let sumChars = 0
    for (let i = 0; i < username.length; i++) {
      sumChars += username.charCodeAt(i)
    }

    let colors = [
      '#d5c0ab',
      '#e8e8e8',
      '#e9aaa8',
      '#e3efda',
      '#5596d6',
      '#f7eccf',
      '#a68cd6'
    ]
    let textColor = ['#444', '#444', '#444', '#444', '#fff', '#444', '#fff']
    let index = sumChars % colors.length
    return [colors[index], textColor[index]]
  }

  handleAvatarClick = props => {
    this.props.navigation.navigate('Profile', {
      user_id: props._id,
      name: props.name
    })
  }

  render() {
    const { currentUser } = this.state

    if (currentUser) {
      return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <GiftedChat
            style={{ backgroundColor: '#fff' }}
            onPressAvatar={props => this.handleAvatarClick(props)}
            messages={this.state.messages}
            onLongPress={this.onLongPress}
            renderBubble={props => this.renderBubble(props)}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.currentUser.id
            }}
          />
        </View>
      )
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200
          }}>
          <Text>Loading</Text>
        </View>
      )
    }
  }
}
