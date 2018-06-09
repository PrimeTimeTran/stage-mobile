import React, { Component } from 'react'
import { View, Text, AsyncStorage, Dimensions, ImageBackground } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

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
      return this.setState({errorMessage: 'Invalid email & password'})
    }
    if (!emailValid) {
      return this.setState({errorMessage: 'Invalid email'})
    }
    if (!passwordValid) {
      return this.setState({errorMessage: 'Invalid Password. Must be 6 characters'})
    }
    this.setState({errorMessage: ''})
    this.onSignUpOrIn()
  }

  handleEmailChange = (email) => {
    this.setState({email})
  }

  handlePasswordChange = (password) => {
    this.setState({password})
  }

  onSignUpOrIn = () => {
    const request = client()
    const { email, password } = this.state
    request
      .then(api =>
        api.post(`${API_ROOT}signup`, { email, password }))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setUserData(data)
        return data
      })
      .catch(error => {
        this.setState({errorMessage: `Password incorrect for \n${email}. \nPlease try again.`})
      })
  }

  async setUserData(data) {
    const keys = [['auth_token', JSON.stringify(data.token)], ['current_user', JSON.stringify(data.user.id)]]
    await AsyncStorage.multiSet(keys, (key) => {console.log('Key', key)})
    this.props.navigation.navigate('Conversations')
  }

  render() {
    const { containerStyle, screenContainer } = styles

    if (!!this.props.token) {
      return (
        <View>
          <Button
            title='Sign Out'
            onPress={() => this.props.facebookLogOut()}
          />
        </View>
      );
    }
    return (

      <ImageBackground source={image} style={{ height, width, justifyContent: 'center', alignItems: 'center' }}>
        <View style={screenContainer}>

          <View style={containerStyle}>
            <FormLabel>Email</FormLabel>
              <FormInput
                name="Email"
                placeholder="loi@gmail.com"
                value={this.state.email}
                onChangeText={this.handleEmailChange}
              />

            <FormLabel>Password</FormLabel>
              <FormInput
                placeholder="**********"
                secureTextEntry
                onSubmit={this.handlePasswordChange}
                value={this.state.password}
                onChangeText={this.handlePasswordChange}
              />

            <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            </View>
            <Button
              style={{marginBottom: 10}}
              icon={{name: 'sign-in', type: 'font-awesome'}}
              title='Sign In/Up'
              onPress={this.handleSubmit}
            >
              <Text>Sign Up/In</Text>
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
    width: width * .8,
    backgroundColor: 'white',
    borderWidth: 5,
    borderBottomWidth: 5,
  }
}
