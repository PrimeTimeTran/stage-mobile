import React, { Component } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
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

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}



