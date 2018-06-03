import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';

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
    // let token = await AsyncStorage.setItem('auth_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1NTk1MzM5OTd9.r_RBJEcXMXU5XXktMLCC8Gvc8KR8NKSxFME4oEe8BTzirBuM0Suj6AKvBPr18P29UR4bkLe_dvX8U3dNYxXAQA')
    token = await AsyncStorage.getItem('auth_token');
    if (token) {
      this.props.navigation.navigate('Home');
      this.setState({ token })
    } else {
      this.setState({ token: false });
    }
  }

   onSlidesComplete = () => {
    this.props.navigation.navigate('Conversations')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default Welcome;
