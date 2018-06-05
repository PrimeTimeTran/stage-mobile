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
    request
      .then(api =>
        api.get(`${API_ROOT}conversations`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({conversations: data})
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  render() {
    const { conversations } = this.state
    const { navigation } = this.props
    const {
      avatarStyle,
      headerContainerStyle,
      containerContentStyle,
      headerInfoStyle,
      headerTitleStyle,
      headerRightStyle,
      stageInfoStyle
     } = styles

    if (conversations) {
      return (
        <ScrollView>
          { conversations && conversations.map(conversation => {
            const { name, avatar_url } = conversation.last_message_from_user
              return (
                <View key={conversation.id}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Conversation', {
                                    conversation_name: conversation.name,
                                    conversation_id: conversation.id,
                                    other_user_name: conversation.other_users[0].first_name
                                  })}
                  >
                    <View style={headerContainerStyle}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                        <Image
                          id={conversation.id}
                          style={[avatarStyle, {marginTop: 5}]}
                          source={{uri: avatar_url}}
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
                                <Text style={stageInfoStyle}>{name}</Text>
                              </View>
                            </View>
                          :
                            <Text style={headerTitleStyle}>{name}</Text>
                          }
                          <View style={headerRightStyle}>
                            <Icon name='clock' type='material-community' color='black' size={10} />
                            <Text style={{fontSize: 10, paddingLeft: 5}}>{conversation.last_message.sent_at}</Text>
                          </View>
                        </View>
                        <Text numberOfLines={3} style={{color: '#696969', fontSize: 15}}>{conversation.last_message.body}</Text>
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
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  containerContentStyle: {
    flex: 1,
    padding: 5,
    margin: 5
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333'
  },
  headerInfoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerRightStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  stageInfoStyle: {
    color: 'green',
    fontSize: 12
  }
});