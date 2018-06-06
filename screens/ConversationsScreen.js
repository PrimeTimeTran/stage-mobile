import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native'

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import VideoPlayer from '../components/VideoPlayer'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection, Avatar, SentAt } from '../components/common'

import client from '../utils/client'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class ConversationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    headerStyle: {backgroundColor: '#333333'},
    headerTitleStyle: {color: 'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white'
  };

  state = {conversations: []}

  componentWillMount() {
    const request = client()
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

  showStageUploads(conversation, upload, index) {
    return (
      <Carousel
        delay={10000}
        currentPage={index}
        autoplay={true}
        style={{ flex: 1 }}
        >
        {conversation.uploads.map(upload => {
          return (
            <View key={upload.id} style={{flex: 1}}>
              <VideoPlayer
                key={upload.id}
                source={{uri: upload.url}}
                carousel={'Go'}
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
                        <Avatar url={avatar_url} />
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
                            <SentAt sentAt={conversation.last_message.sent_at} />
                          </View>
                        </View>
                        <Text numberOfLines={3} style={{color: '#696969', fontSize: 13}}>{conversation.last_message.body}</Text>
                        <View style={{flexDirection: 'row'}}>
                          {conversation.is_stage && conversation.uploads && conversation.uploads.map((upload, index) => {
                            return (
                              <Lightbox
                                key={upload.id}
                                swipeToDismiss={false}
                                renderContent={() =>
                                  this.showStageUploads(conversation, upload, index)
                                }>
                                <View style={{flex: 1, height: 100, width: 100}}>
                                  <VideoPlayer video={upload.url}/>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      position: 'absolute',
                                      bottom: 2,
                                      right: 2,
                                      fontWeight: 'bold',
                                      fontSize: 10
                                    }}>
                                    {Math.floor(Math.random() * Math.floor(200))} likes
                                  </Text>
                                </View>
                              </Lightbox>
                          )})}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
          )})}
        </ScrollView>
      )
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
  stageInfoStyle: {
    color: 'green',
    fontSize: 12
  }
});