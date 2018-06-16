import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Button, FormInput } from 'react-native-elements'
import Colors from '../constants/Colors'
export default class PostForm extends Component {
  state = { body: '' }

  handlePostBody(body) {
    this.setState({ body })
  }

  handleSubmit = () => {
    this.setState({ body: '' })
    this.props.onSubmit(this.state.body)
  }

  render() {
    return (
      <View style={{ paddingTop: 10, backgroundColor: 'white' }}>
        <FormInput
          value={this.state.body}
          inputStyle={{ fontSize: 16 }}
          onChangeText={e => this.handlePostBody(e)}
          placeholder="What's on your mind?"
          containerStyle={{
            borderBottomWidth: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            paddingLeft: 10,
            backgroundColor: 'white'
          }}
          inputStyle={{ color: Colors.buttonColor.toString() }}
        />
        <Button
          title="Create Post"
          backgroundColor={Colors.buttonColor.toString()}
          onPress={this.handleSubmit}
          containerStyle={{ marginLeft: 0 }}
          buttonStyle={{ marginLeft: 0, width: '100%' }}
          containerViewStyle={{
            marginLeft: 10,
            marginRight: 10
          }}
          iconRight={{ name: 'share', type: 'material-community' }}>
          <Text>Submit</Text>
        </Button>
      </View>
    )
  }
}
