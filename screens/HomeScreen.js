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

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import { Video } from 'expo'

import VideoPlayer from '../components/VideoPlayer'
import { Card, CardSection } from '../components/common'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };
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
                style={{flex: 1, resizeMode: 'cover'}}
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

    if (posts) {
      return (
        <ScrollView>
          { posts && posts.map(post => {
              return (
                <View key={post.id}>
                  <Card>
                    <CardSection>
                      <View style={headerContainerStyle}>
                        <Image
                          style={avatarStyle}
                          source={{uri: post.user.avatar_url}}
                        />
                      </View>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={headerTextStyle}>{post.user.full_name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                          <Icon name='clock' type='material-community' color='black' size={10}/>
                          <Text style={{fontSize: 10, paddingLeft: 5}}>{post.created_at}</Text>
                        </View>
                      </View>
                    </CardSection>
                    <CardSection styling={{borderBottomWidth: 0}}>
                      <Text numberOfLines={5}>
                          {post.body}
                      </Text>
                    </CardSection>
                      { post.uploads.map((upload, index) => {
                        { if (upload.media_type == 'video') {
                            return (
                              <CardSection>
                                <Lightbox
                                  key={upload.id}
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
                        <Button title='Like' onPress={() => {}} />
                        <Button title='Comment' onPress={() => {}} />
                      </CardSection>
                  </Card>
                </View>
                )
              }
            )
          }
        </ScrollView>
      )
    } else {
      return <div>Empty</div>
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
    color: '#333333',
    paddingLeft: 5
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});
