import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { t } from '../locales/i18n'
import client from '../utils/client'

import {
  Avatar,
  SentAt,
  Spinner,
  MediaViewer
} from '../components/common'

export default class ConversationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: t('tab.messages'),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 10, paddingLeft: 10 }}
        onPress={() => {
          navigation.navigate('SearchConversations', {
            transition: 'cross_fade'
          })
        }}>
        <Icon
          type="material-community"
          name="magnify"
          color="white"
          size={26}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.openDrawer()}>
        <Icon
          type="material-community"
          name="menu"
          color="white"
          size={26}
        />
      </TouchableOpacity>
    )
  })

  state = { conversations: null }

  componentWillMount() {
    client()
      .then(api => api.get('conversations'))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ conversations: data })
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
      conversationContainerStyle,
      headerContainerStyle,
      containerContentStyle,
      headerInfoStyle,
      headerTitleStyle,
      stageInfoStyle
    } = styles

    if (conversations) {
      if (conversations.length == 0 ){
        return (
          <View style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text>Make some friends!</Text>
          </View>
        )
      }
      return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <ScrollView>
            {conversations &&
              conversations.map(conversation => {
                const { name, avatar_url } = conversation.last_message_from_user
                return (
                  <View
                    key={conversation.id}
                    style={conversationContainerStyle}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Conversation', {
                          conversation_name: conversation.name,
                          conversation_id: conversation.id,
                          other_user_name:
                            conversation.other_users[0].first_name
                        })
                      }>
                      <View style={headerContainerStyle}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 5
                          }}>
                          <Avatar
                            custom={avatarStyle}
                            url={avatar_url}
                          />
                          {conversation.is_stage && (
                            <View
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 5
                              }}>
                              <Text style={stageInfoStyle}>Active</Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: 2
                                }}>
                                <Text
                                  style={[
                                    stageInfoStyle,
                                    {
                                      marginRight: 5,
                                      marginTop: 0,
                                      color: Colors.highlightedColor
                                    }
                                  ]}>
                                  {Math.floor(Math.random() * Math.floor(1000))}
                                </Text>
                                <Icon
                                  name="account-multiple"
                                  type="material-community"
                                  color={Colors.highlightedColor}
                                  style={{
                                    borderWidth: 1,
                                    borderColor: '#c00'
                                  }}
                                  size={14}
                                />
                              </View>
                            </View>
                          )}
                        </View>
                        <View style={containerContentStyle}>
                          <View style={headerInfoStyle}>
                            {conversation.name ? (
                              <View>
                                <Text style={[headerTitleStyle, { color: Colors.themeColor }]}>
                                  {conversation.name}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 5,
                                    marginTop: 5
                                  }}>
                                  <Icon
                                    name="chevron-right"
                                    type="material-community"
                                    color='green'
                                    size={15}
                                  />
                                  <Text style={[stageInfoStyle, { color: 'green'}]}>{name}</Text>
                                </View>
                              </View>
                            ) : (
                              <Text style={headerTitleStyle}>{name}</Text>
                            )}
                            <View style={{ alignSelf: 'flex-start' }}>
                              <SentAt
                                sentAt={conversation.last_message_content.sent_at}
                              />
                            </View>
                          </View>
                          <Text
                            numberOfLines={3}
                            style={{ color: '#696969', fontSize: 13 }}>
                            {conversation.last_message_content.body}
                          </Text>
                        {conversation.is_stage &&
                          conversation.uploads &&
                          <MediaViewer object={conversation} />
                        }
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
          </ScrollView>
        </View>
      )
    } else {
      return <Spinner />
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
  conversationContainerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8
  },
  containerContentStyle: {
    flex: 1,
    padding: 5,
    margin: 5,
    marginLeft: 10
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
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 5
  },
  stageInfoStyle: {
    color: Colors.activeStageColor,
    fontSize: 12
  }
})
