
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

export default class StagesScreen extends React.Component {
  state = { posts: [] }

  componentWillMount() {
    const request = client();
    request.then((api) => api.get(`${API_ROOT}posts`)).then(response => {
      return response.data
    }).then(data => {
      this.setState({ posts: data })
    }).catch(error => {
      console.log('Error:', error)
    })
  }

  render() {
    const { posts } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      container,
      thumbnailStyle
     } = styles;

    if (posts) {
      return (
        <ScrollView style={container}>
          { posts && posts.map(post => {
              console.log('post:', post)
              return (
                <View style={container} key={post.id}>
                  <Card>
                    <CardSection>
                      <View style={headerContainerStyle}>
                        <Image
                          style={thumbnailStyle}
                          source={{ uri: post.user.avatar_url }}
                        />
                      </View>
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{post.user.full_name}</Text>
                      </View>
                    </CardSection>

                    <CardSection>
                      <Text>
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
    fontSize: 25,
    fontWeight: '600'
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  }
});