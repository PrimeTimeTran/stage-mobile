import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Button
} from 'react-native'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import { Video } from 'expo'

import { Avatar, Card, CardSection, SentAt } from '../components/common'
import VideoPlayer from '../components/VideoPlayer'
import CommentContainer from '../containers/CommentContainer'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
  }
  state = { posts: [] }

  componentWillMount() {
    const request = client();
    request
      .then(api => api.get(`${API_ROOT}posts`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({posts: data})
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  showUploads(post, upload, index) {
    return (
      <Carousel
        currentPage={index}
        autoplay={false}
        style={{
          flex: 1,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT
        }}>
        {post.uploads.map(upload => {
          return (
            <View style={{flex: 1}} key={upload.id}>
              <Video
                key={upload.id}
                source={{uri: upload.url}}
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
    const { posts } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      avatarStyle
    } = styles

    return (
      <ScrollView scrollEventThrottle={5}>
        { posts && posts.map(post => {
            const { user } = post
            return (
              <View key={post.id}>
                <Card>
                  <CardSection style={{borderBottomWidth: 0}}>
                    <View style={headerContainerStyle}>
                      <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('Profile', {
                              user_id: user.id,
                              first_name: user.first_name
                          })}
                      >
                        <Avatar custom={avatarStyle} url={user.avatar_url} />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={headerTextStyle}>{user.full_name}</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                        <SentAt sentAt={post.created_at} />
                      </View>
                    </View>
                  </CardSection>
                  <CardSection styling={{borderWidth: 0}}>
                    <Text numberOfLines={5}>{post.body}</Text>
                  </CardSection>
                    { post.uploads.map((upload, index) => {
                      { if (upload.media_type == 'vid') {
                            return (
                              <CardSection key={upload.id}>
                                <Lightbox
                                  swipeToDismiss={false}
                                  renderContent={() =>
                                    this.showUploads(post, upload, index)
                                  }>
                                  <VideoPlayer video={upload.url} />
                                </Lightbox>
                              </CardSection>
                            )
                      }}})
                    }
                    <CardSection styling={{justifyContent: 'space-around'}}>
                      <Button title='Like' onPress={() => console.log('Liked')}>
                        <Text>Like</Text>
                      </Button>
                      <Button title='Comment' onPress={() => console.log('Comment')}>
                        <Text>Comment</Text>
                      </Button>
                    </CardSection>
                    <CommentContainer comments={post.comments} />
                </Card>
              </View>
              )
            }
          )
        }
      </ScrollView>
    )
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
    color: '#333333',
    paddingLeft: 5
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});