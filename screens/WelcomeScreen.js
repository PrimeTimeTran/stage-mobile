import _ from 'lodash'
import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'

import { t } from '../locales/i18n'

import Slides from '../components/Slides'

const SLIDE_DATA = () => {
  return [
    {
      text: t('welcome.first'),
      path: '../assets/images/0.png'
    },
    {
      text: t('welcome.second'),
      path: '../assets/images/1.png'
    },
    {
      text: t('welcome.third'),
      path: '../assets/images/2.png'
    }
  ]
}

class Welcome extends Component {
  state = {
    token: null
  }

  async componentWillMount() {
    let token
    let current_user

    token = await AsyncStorage.getItem('auth_token')
    if (token) {
      this.props.navigation.navigate('Conversations')
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
    return <Slides data={SLIDE_DATA()} onComplete={this.onSlidesComplete} />
  }
}

export default Welcome
