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

import { API_ROOT } from '../constants/API-CONFIG';
import { Card, CardSection } from '../components/common'


export default class VenuesScreen extends React.Component {
  state = { posts: [] }

  componentWillMount() {
    axios.get(`${API_ROOT}lists`).then(response => {
      return response
    }).then(data => {
      this.setState({ posts: data.data }, () => { console.log('Posts: ', this.state.posts)})

      return data.data
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
      headerTextStyle
     } = styles;

    return (
      <ScrollView style={styles.container}>
        { this.state.posts && this.state.posts.map(post => {
            return (
              <View>
                {/* <CardSection>{post.body}</CardSection> */}
                <Card>
                  <CardSection>
                    <View style={headerContainerStyle}>
                      <Text style={headerTextStyle}>{post.title}</Text>
                    </View>
                  </CardSection>

                  <CardSection>
                    <Text>
                      {post.excerpt}
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