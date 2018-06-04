import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'

import { Icon } from 'react-native-elements'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

export default class ConversationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  state = {conversations: []}

  componentWillMount() {
    const request = client();
    request.then(api => api.get(`${API_ROOT}conversations`)).then(response => {
      return response.data
    }).then(data => {
      this.setState({conversations: data})
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
      thumbnailStyle,
      stageInfoStyle
     } = styles

    if (conversations) {
      return (
        <ScrollView>
          { conversations && conversations.map(conversation => {
            const { last_message_from_user } = conversation
              return (
                <View key={conversation.id}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Conversation', {conversation_name: conversation.name, conversation_id: conversation.id})}
                    >
                      <View style={containerStyle}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                          <Image
                            id={conversation.id}
                            style={styles.avatarStyle}
                            source={{uri: last_message_from_user.avatar_url}}
                          />
                          { (conversation.is_stage) &&
                              <View style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={stageInfoStyle}>Active</Text>
                                <Icon name='users' type='font-awesome' color='green' size={10} />
                                <Text style={stageInfoStyle}>{Math.floor(Math.random() * Math.floor(1000))}</Text>
                              </View>
                          }
                        </View>
                        <View style={containerContentStyle}>
                          <View style={headerInfoStyle}>
                            { conversation.name ?
                              <View>
                                <Text style={[headerTitleStyle, {textDecorationLine: 'underline'}]}>{conversation.name}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                  <Icon name='chevron-right' color='#7EA172' size={15} />
                                  <Text style={stageInfoStyle}>{last_message_from_user.name}</Text>
                                </View>
                              </View>
                            :
                              <Text style={headerTitleStyle}>{last_message_from_user.name}</Text>
                            }
                            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                              <Icon name='clock' type='material-community' color='black' size={10}/>
                              <Text style={{fontSize: 10, paddingLeft: 5}}>{conversation.last_message.sent_at}</Text>
                            </View>
                          </View>
                          <Text numberOfLines={3} style={{color: '#696969', fontSize: 13}}>{conversation.last_message.body}</Text>
                        </View>
                      </View>
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
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  containerContentStyle: {
    padding: 5,
    margin: 5,
    flex: 1
  },
  headerTitleStyle: {
    fontSize: 20,
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
    borderRadius: 25
  },
  stageInfoStyle: {
    color: 'green',
    fontSize: 10
  }
});