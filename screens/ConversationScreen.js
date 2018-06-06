import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { StackActions } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { sendMessage, setCallback } from '../utils/chat'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerTitle: (navigation.state.params.conversation_name || navigation.state.params.other_user_name ),
    headerRight: (
      <Button
        title="Users"
        onPress={() => navigation.navigate('Users')}
        color="white"
      />
    )
  })

  state = {messages: []}

  componentWillMount() {
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

  onReceive = (data) => {
    const message = JSON.parse(data).gifted_chat
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message)
    }))
  }

  onSend(messages = []) {
    const conversation_id = this.props.navigation.state.params.conversation_id

    sendMessage({
      conversation_id: conversation_id,
      body: messages[0].text
    })

    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }))
  }

  renderBubble = props => {
    let username = props.currentMessage.user.name
    let color = this.getColor(username)

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}
      />
    )
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

    const colors = [
      'rgb(225, 255, 163)', // carrot
      'rgb(181, 226, 255)', // emerald
      'rgb(252, 156, 206)', // peter river
      'rgb(107, 183, 234)', // wisteria
      'rgb(252, 212, 189)', // alizarin
      'rgb(252, 255, 178)', // turquoise
      'rgb(122, 153, 226)' // midnight blue
    ]
    return colors[sumChars % colors.length]
  }

  handleAvatarClick = props => {
    this.props.navigation.navigate('Profile', {user_id: props._id, name: props.name})
  }

  render() {
    const user_id = Platform.OS == 'ios' ? 3 : 1
    return (
      <GiftedChat
        onPressAvatar={props => this.handleAvatarClick(props)}
        messages={this.state.messages}
        renderBubble={props => this.renderBubble(props)}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: user_id
        }}
      />
    )
  }
}
