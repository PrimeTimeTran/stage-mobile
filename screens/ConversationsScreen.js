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

import { API_ROOT } from '../constants/ApiConfig';
import { Card, CardSection } from '../components/common';

import client from '../utils/client';

export default class ConversationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Conversations',
  };

  state = { conversations: [] }

  componentWillMount() {
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
    const { conversations } = this.state
    const { navigation } = this.props
    const {
      containerStyle,
      containerContentStyle,
      headerInfoStyle,
      headerTitleStyle,
      thumbnailStyle
     } = styles;

    if (conversations) {
      return (
        <ScrollView>
          { conversations && conversations.map(conversation => {
              return (
                <View key={conversation.id}>
                  <Card>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Conversation', { conversation_id: conversation.id})  }
                    >
                      <CardSection>

                        <View style={containerStyle}>
                          <Image
                            id={conversation.id}
                            style={styles.avatarStyle}
                            source={{ uri: conversation.last_message_from_user.avatar_url }}
                          />
                          <View style={containerContentStyle}>

                            <View style={headerInfoStyle}>
                              <Text style={headerTitleStyle}>
                                {conversation.name || conversation.last_message_from_user.name}
                              </Text>
                              <Text style={{ fontSize: 10 }}>
                                {conversation.last_message.sent_at}
                              </Text>
                            </View>

                            <Text numberOfLines={3} style={{ color: '#cacdd1'}} >
                              {conversation.last_message.body}
                            </Text>
                          </View>
                        </View>

                      </CardSection>

                      {/* <CardSection>
                        { stage.uploads.map(upload => {
                            return <Image style={{ height: 100, width: 100 }} id={upload.id} source={{ uri: upload.url }} />
                          })
                        }
                      </CardSection> */}

                    </TouchableOpacity>
                  </Card>
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
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  containerContentStyle: {
    padding: 5,
    margin: 5,
    flex: 1
  },
  headerTitleStyle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333'
  },
  headerInfoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});