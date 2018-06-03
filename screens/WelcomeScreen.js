import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/slides'

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
]

 class Welcome extends Component {
  state = {
    token: null
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('auth_token');
    if (token) {
      this.props.navigation.navigate('Conversations');
      this.setState({ token })
    } else {
      this.setState({ token: false });
    }
  }

   onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
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
