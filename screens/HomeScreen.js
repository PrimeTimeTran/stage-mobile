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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  state = { posts: [] }

  componentWillMount() {
    const request = client();
    request.then(api => api.get(`${API_ROOT}posts`)).then(response => {
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
      avatarStyle
     } = styles;

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
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{post.user.full_name}</Text>
                      </View>
                    </CardSection>

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
    fontSize: 25,
    fontWeight: '600'
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});