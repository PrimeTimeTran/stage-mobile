import _ from 'lodash'
import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage, ImageBackground } from 'react-native'
import { AppLoading } from 'expo'

import Slides from '../components/slides'

const SLIDE_DATA = [
  { text: 'Welcome', color: '#03A9F4', path: '../assets/images/0.png' },
  { text: "Meet amazing people!", color: '#009688', path: '../assets/images/1.png' },
  { text: 'Get on Stage!', color: '#03A9F4', path: '../assets/images/2.png' }
]

 class Welcome extends Component {
  state = {
    token: null
  }

  async componentWillMount() {
    let token
    // token = await AsyncStorage.setItem('auth_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk4MjM5NTJ9.1OrZIlYiSPl2bt15NJp_IKXeIN-FGG1VhBTBh-r9ftMzAWa3_l2I8jnJOylwMDiBs44VspBa7aOYwsVSlTjJ3Q')
    // token = await AsyncStorage.removeItem('auth_token')
    token = await AsyncStorage.getItem('auth_token')

    console.log('Token is ', token)
    if (token) {
      this.props.navigation.navigate('Conversations')
      // this.props.navigation.navigate('Test')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

   onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default Welcome
