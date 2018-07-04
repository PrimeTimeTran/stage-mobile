import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import VideoPlayer from '../components/VideoPlayer'
import SearchHeader from '../components/SearchHeader'

import Colors from '../constants/Colors'
import client from '../utils/client'

import { Avatar, SentAt } from '../components/common'

const { width, height } = Dimensions.get('window')

export default class SearchConversationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: () => {
      return (
        <SearchHeader
          navigation={navigation}
          performSearch={text => navigation.state.params.performSearch(text)}
        />
      )
    },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerMode: 'none',
    headerTitle: false,
    headerLeft: null,
    headerRight: null
  })

  state = { conversations: [], performedSearch: false }

  componentDidMount() {
    this.props.navigation.setParams({
      performSearch: text => this.search(text)
    })
  }

  search(text) {
    this.setState({ performedSearch: true })
    client()
      .then(api =>
        api.get('conversations', { params: { keyword: text } })
      )
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

  showStageUploads(conversation, upload, index) {
    return (
      <Carousel
        currentPage={index}
        autoplay={false}
        style={{
          flex: 1,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT
        }}>
        {conversation.uploads.map(upload => {
          return (
            <View style={{ flex: 1 }} key={upload.id}>
              <VideoPlayer
                isLooping
                video={upload.url}
                fullScreen={true}
                style={{ flex: 1, width, height }}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  fontWeight: 'bold'
                }}>
                {Math.floor(Math.random() * Math.floor(200))} likes
              </Text>
            </View>
          )
        })}
      </Carousel>
    )
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
      return (
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: this.state.performedSearch ? '#fff' : '#000000cc'
            }}>
            {conversations.length == 0 &&
              this.state.performedSearch && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 200
                  }}>
                  <Text>No Messages found</Text>
                </View>
              )}
            {conversations.length > 0 &&
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
                            custom={[avatarStyle, { marginTop: 5 }]}
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
                                <Text style={[headerTitleStyle]}>
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
                                    color={Colors.activeStageColor.toString()}
                                    size={15}
                                  />
                                  <Text style={stageInfoStyle}>{name}</Text>
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
                          {/* <View style={{ flexDirection: 'row' }}>
                          {conversation.is_stage &&
                            conversation.uploads &&
                            conversation.uploads.map((upload, index) => {
                              return (
                                <Lightbox
                                  key={upload.id}
                                  swipeToDismiss={false}
                                  renderContent={() =>
                                    this.showStageUploads(
                                      conversation,
                                      upload,
                                      index
                                    )
                                  }>
                                  <View style={{ flex: 1 }}>
                                    <VideoPlayer
                                      isLooping
                                      video={upload.url}
                                      style={{ height: 50, width: 50 }}
                                    />
                                    <Text
                                      style={{
                                        color: '#fff',
                                        position: 'absolute',
                                        bottom: 2,
                                        right: 2,
                                        fontWeight: 'bold',
                                        fontSize: 10
                                      }}>
                                      {Math.floor(
                                        Math.random() * Math.floor(200)
                                      )}{' '}
                                      likes
                                    </Text>
                                  </View>
                                </Lightbox>
                              )
                            })}
                        </View> */}
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
      return <View>Empty</View>
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
    borderRadius: 25
  },
  stageInfoStyle: {
    color: Colors.activeStageColor,
    fontSize: 12
  }
})
