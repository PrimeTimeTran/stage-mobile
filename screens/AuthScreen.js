import React, { Component } from 'react'
import {
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ImageBackground
} from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'
import { t } from '../locales/i18n'
import db from '../utils/PouchDB'

const image = require('../assets/images/2.png')

let { width, height } = Dimensions.get('window')

class AuthScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  handleSubmit = () => {
    let { email, password } = this.state

    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    passwordValid = password.length >= 6

    if (!passwordValid && !emailValid) {
      return this.setState({ errorMessage: t('auth.errors.email_password') })
    }
    if (!emailValid) {
      return this.setState({ errorMessage: t('auth.errors.email') })
    }
    if (!passwordValid) {
      return this.setState({ errorMessage: t('auth.errors.password') })
    }
    this.setState({ errorMessage: '' })
    this.onSignUpOrIn()
  }

  handleEmailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  onSignUpOrIn = () => {
    const request = client()
    const { email, password } = this.state
    request
      .then(api => api.post(`${API_ROOT}signup`, { email, password }))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setUserData(data)
        return data
      })
      .catch(error => {
        this.setState({ errorMessage: t('auth.errors.password_incorrect') })
      })
  }

  async setUserData(data) {
    console.log('TODO: Rerender Drawer component after user creation/login. Will show no value in the avatar area')

    const keys = [
      ['auth_token', JSON.stringify(data.token)],
      ['current_user', JSON.stringify(data.user)]
    ]
    await AsyncStorage.multiSet(keys, key => {
      db.put({
        _id: 'current_user',
        data: data.user
      })
    })
    this.props.navigation.navigate('Conversations')
  }

  render() {
    const { containerStyle, screenContainer } = styles

    if (!!this.props.token) {
      return (
        <View>
          <Button
            title="Sign Out"
            onPress={() => this.props.facebookLogOut()}
          />
        </View>
      )
    }
    return (
      <ImageBackground
        source={image}
        style={{
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View style={screenContainer}>
          <View style={containerStyle}>
            <FormLabel labelStyle={{color: Colors.themeColor}}>Email</FormLabel>
            <FormInput
              name="Email"
              placeholder="johndoe@gmail.com"
              value={this.state.email}
              onChangeText={this.handleEmailChange}
            />

            <FormLabel labelStyle={{color: Colors.themeColor}}>{t('auth.password')}</FormLabel>
            <FormInput
              placeholder="**********"
              secureTextEntry
              onSubmit={this.handlePasswordChange}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
            />

            <View
              style={{
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            </View>
            <Button
              title={t('auth.sign_in_up')}
              outline
              style={{ marginBottom: 10 }}
              icon={{ name: 'sign-in', type: 'font-awesome' }}
              color={Colors.themeColor.toString()}
              onPress={this.handleSubmit}>
              <Text>{t('auth.sign_in_up')}</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default AuthScreen

const styles = {
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'blue'
  },
  containerStyle: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderWidth: 5,
    borderBottomWidth: 5,
    borderColor: Colors.themeColor,
  }
}
