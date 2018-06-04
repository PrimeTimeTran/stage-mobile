import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'

import VideoPlayer from '../components/VideoPlayer'
import { Card, CardSection } from '../components/common'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

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
        this.setState({ posts: data })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  render() {

    const { posts } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      avatarStyle,
      timeStyle
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
                          source={{ uri: post.user.avatar_url }}
                        />
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={headerTextStyle}>{post.user.full_name}</Text>
                        <Text style={timeStyle}>{post.created_at}</Text>
                      </View>
                    </CardSection>
                      { post.uploads.map(upload => {
                        { if (upload.media_type == 'video') {
                            console.log('Post has video upload: ', upload);
                            console.log('Post has video upload. Upload URL: ', upload.url);
                            <CardSection style={{ flex: 1, height: 100, width: 100}}>
                              <VideoPlayer video={upload.url} />
                            </CardSection>
                        }}})
                      }

                    <CardSection>
                    <Text numberOfLines={5}>
                        {post.body}
                      </Text>
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
    color: '#333333',
    paddingLeft: 5
  },
  timeStyle: {
    fontSize: 10,
    color: '#cacdd1'
  },
  avatarStyle: {
    height: 30,
    width: 30,
    paddingLeft: 10,
    marginLeft: 10,
    borderRadius: 15,
    borderWidth: 0.5
  }
});