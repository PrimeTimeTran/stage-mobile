import React, { Component } from 'react'
import { View, Text, AsyncStorage, Button } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../actions'

class AuthScreen extends Component {
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

  render() {
    if (!this.props.token) {
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
      <View>
        <Button
          title='Login With Facebook'
          onPress={() => this.props.facebookLogIn()}
        />
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);