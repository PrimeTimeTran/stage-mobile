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

  onSubmit = () => {
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

  onEmailChange = email => {
    this.setState({ email })
  }

  onPasswordChange = password => {
    this.setState({ password })
  }

  onSignUpOrIn = () => {
    const { email, password } = this.state
    const request = client()
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
              placeholder="loi@gmail.com"
              value={this.state.email}
              onChangeText={this.onEmailChange}
            />

            <FormLabel labelStyle={{color: Colors.themeColor}}>{t('auth.password')}</FormLabel>
            <FormInput
              placeholder="**********"
              secureTextEntry
              value={this.state.password}
              onChangeText={this.onPasswordChange}
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
              onPress={this.onSubmit}>
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
