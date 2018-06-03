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
      avatarStyle,
      timeStyle
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
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={headerTextStyle}>{post.user.full_name}</Text>
                        <Text style={timeStyle}>{post.created_at}</Text>
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
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    paddingLeft: 5,
  },
  timeStyle: {
    fontSize: 10,
    color: '#cacdd1',
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5
  }
});