import _ from 'lodash'
import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
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
    let current_user

    // token = await AsyncStorage.setItem('auth_token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1NTk4Nzk4OTB9._COA3vWtEtInLfq7fiZTfHWaogmjAC2QgtfZ4FZ1vkD8ogYpRc-53XfLhBqQTLCFz4Gucam2xtYHRMEnyuxGAw')

    // current_user = await AsyncStorage.removeItem('current_user')
    // token = await AsyncStorage.removeItem('auth_token')

    // current_user = await AsyncStorage.getItem('current_user')
    token = await AsyncStorage.getItem('auth_token')

    // console.log('AuthToken in Welcome', token)
    // console.log('UserId', current_user)

    if (token) {
      this.props.navigation.navigate('Home')
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
