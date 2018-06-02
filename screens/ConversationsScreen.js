import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import axios from 'axios';

import { API_ROOT } from '../constants/ApiConfig';
import { Card, CardSection } from '../components/common';

import client from '../utils/client';

export default class ConversationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  state = { conversations: [] }

  componentWillMount() {
    console.log('Props: ', this.props);

    const request = client();
    request.then(api => api.get(`${API_ROOT}conversations`)).then(response => {
      return response.data
    }).then(data => {
      this.setState({ conversations: data })
    }).catch(error => {
      console.log('Error:', error)
    })
  }

  render() {
    console.log('This: ', this);
    console.log('Conversations: ', this.state.conversations);

    const { conversations } = this.state

    const {
      headerContainerStyle,
      headerTextStyle,
      thumbnailStyle
     } = styles;

    if (conversations) {
      return (
        <ScrollView>
          { conversations && conversations.map(conversation => {
              return (
                <View key={conversation.id}>
                  {/* <Card onPress={() => this.props.navigation.navigate('Conversation') } > */}
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Conversation') } >
                    <CardSection>
                      <View style={headerContainerStyle}>
                        <Image
                        id={conversation.id}
                        style={styles.avatarStyle}
                        source={{ uri: conversation.last_message_from_user.avatar_url }}
                      />
                      </View>
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{conversation.name || conversation.last_message_from_user.name}</Text>
                      </View>
                    </CardSection>

                    <CardSection>
                      {/* { stage.uploads.map(upload => {
                          return <Image style={{ height: 100, width: 100 }} id={upload.id} source={{ uri: upload.url }} />
                        })
                      } */}
                      <Text>
                        {conversation.last_message.body}
                      </Text>
                    </CardSection>
                  </TouchableOpacity>
                </View>
                )
              }
            )
          }
        </ScrollView>
      )
    } else {
      <div>Empty</div>
    }
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#cacdd1'
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});