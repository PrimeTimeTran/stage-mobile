import React, { Component } from 'react'
import { View, Text, AsyncStorage, Dimensions, ImageBackground } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { Card, CardSection } from '../components/common'

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

  componentWillMount() {
    console.log('Mounted AuthScreen')
  }

  componentDidMount() {
    // AsyncStorage.removeItem('auth_token'); // Remove to signout
    // this.props.facebookLogIn();
    // this.onAuthComplete(this.props)
  }

  componentWillUnMount() {
    console.log('Unmounted')
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Conversations')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  handleSubmit = () => {
    let { email, password } = this.state

    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    password = password.length >= 6


    if (!emailValid) {
      this.handleInvalidEmail()
      return
    }
    if (!password) {
      this.handleInvalidPassword()
      return
    }
    if (!password && !email) {
      this.handleInvalidEmailAndPassword()
      return
    }

    this.setState({errorMessage: ''})
  }

  handleInvalidEmailAndPassword() {
    this.setState({errorMessage: 'Invalid email & password'})
  }

  handleInvalidEmail() {
    this.setState({errorMessage: 'Invalid email.'})
  }

  handleInvalidPassword() {
    this.setState({errorMessage: 'Invalid Password. Must be 6 characters'})
  }

  handleEmailChange = (email) => {
    this.setState({email})
  }

  handlePasswordChange = (password) => {
    this.setState({password})
  }

  render() {
    const { containerStyle, screenContainer, backgroundColor } = styles

    if (this.props.token) {
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
              <Text>{this.state.errorMessage}</Text>
            </View>
            <Button
              style={{marginBottom: 10}}
              icon={{name: 'sign-in', type: 'font-awesome'}}
              title='Sign Up'
              onPress={this.handleSubmit}
            />
            ></View>

        </View>
      </ImageBackground>
    )
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);

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
