import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native'

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

const { width } = Dimensions.get('window');

export default class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height: 300 },
      user: {}
    };
  }

  componentWillMount() {
    const user_id = 1
    const request = client();
    request
      .then(api =>
        api.get(`${API_ROOT}users/${user_id}`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({user: data}, console.log('User: ', this.state.user))
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  }

  render() {
    const { descriptionStyle } = styles
    const { size, user } = this.state

    if (user && user.uploads && user.uploads.length > 0) {
      return (
        <ScrollView>
            <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
              <Carousel
                autoplay={false}
                style={size}
                onAnimateNextPage={(p) => console.log(p)}
              >
                { user.uploads.map(upload => {
                  return (
                    <View style={this.state.size} key={upload.id}>
                      <Image
                        style={this.state.size}
                        source={{uri: upload.url}}
                      />
                    </View>
                  )})
                }
              </Carousel>
            </View>
            <View>
                <CardSection>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={descriptionStyle}>
                      <Icon name='users' type='font-awesome' color='green' size={10}/>
                      <Icon name='place' color='black' size={15}/>
                      <Icon name='mobile' type='font-awesome' color='black' size={17}/>
                    </View>
                    <View style={descriptionStyle}>
                      <Text>{user.full_name}</Text>
                      <Text>{user.location}</Text>
                      <Text>{user.occupation}</Text>
                    </View>
                  </View>
                </CardSection>
            </View>
        </ScrollView>
        )
    } else {
      return <Text>Loading</Text>
    }
  }
}
const styles = StyleSheet.create({
  descriptionStyle: {
    justifyContent: 'space-between',
    paddingLeft: 5
  }
})