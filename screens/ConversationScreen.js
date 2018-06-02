import React, { Component } from 'react';
import { View, Text, Button, Platform } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
// import Bubble from '../components/common/Bubble';

import { sendMessage, setCallback } from "../utils/chat";

import { API_ROOT } from '../constants/ApiConfig';
import client from '../utils/client';
export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Conversation',
    headerRight: (
      <Button
        title='Users'
        onPress={() => navigation.navigate('Users')}
        backgroundColor='#54C7FC'
        color='blue'
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });
  state = {
    messages: [],
  }

  updateMessages(message) {
    let newMessage = message[0];
    this.setState({ messages: [newMessage, ...this.state.messages]})
  }

  componentWillMount() {
    const conversation_id = this.props.navigation.state.params.conversation_id

    const request = client();
    request.then(api => api.get(`${API_ROOT}conversations/${conversation_id}/messages`))
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
  }

  onSend(messages = []) {
    const conversation_id = this.props.navigation.state.params.conversation_id
    sendMessage({
      conversation_id: conversation_id,
      body: messages[0].text
    })

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        // renderBubble={this.renderBubble}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}



