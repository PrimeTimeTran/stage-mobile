
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

import { API_ROOT } from '../constants/ApiConfig';
import { Card, CardSection } from '../components/common'

import { AsyncStorage } from 'react-native';

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


  static navigationOptions = {
    title: 'Venues'
  };

  render() {
    const { lists } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      container
     } = styles;

    return (
      <ScrollView style={container}>
        { this.state.posts && this.state.posts.map(post => {
            return (
              <View style={container} key={post.id}>
                {/* <CardSection>{post.body}</CardSection> */}
                <Card>
                  <CardSection>
                    <View style={headerContainerStyle}>
                      <Text style={headerTextStyle}>{post.user.email}</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: '600'
  }
});