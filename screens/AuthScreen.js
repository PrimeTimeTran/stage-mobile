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
      password: ''
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

  }

  handleEmailChange = (email) => {
    console.log('Email Changed', email);
    this.setState({email})
  }

  handlePasswordChange = (password) => {
    console.log('Password Changed', password)
    this.setState({password})
  }

  render() {
    const { formContainer } = styles

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
        <View style={formContainer}>

          <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="loi@gmail.com"
              containerStyle={styles.containerStyle}
              value={this.state.email}
              onChangeText={e => this.handleEmailChange(e)}
            />

          <FormLabel>Password</FormLabel>
            <FormInput
              placeholder="**********"
              secureTextEntry
              containerStyle={styles.containerStyle}
              onSubmit={this.handlePasswordChange}
              value={this.state.password}
              onChangeText={e => this.handlePasswordChange(e)}
            />
            <Button
              icon={{name: 'cached'}}
              title='Comment'
              onPress={this.handleSubmit}
            />

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
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    width: width * .8,
    backgroundColor: 'white',
    borderWidth: 5,
    borderBottomWidth: 5,
  }
}
