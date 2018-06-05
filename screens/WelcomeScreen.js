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
    // let token = await AsyncStorage.setItem('auth_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk1Nzk4MTJ9.yQnmTqPo5kTHOFrkbR5f4YXuYJQo3t5WXkYH8zS-Oa-b6OlridEu9McSlwVMN5yVg9OD8L6t0b6MBbWwonAwVg')
    token = await AsyncStorage.getItem('auth_token')
    if (token) {
      this.props.navigation.navigate('Home')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

   onSlidesComplete = () => {
    this.props.navigation.navigate('Conversations')
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
