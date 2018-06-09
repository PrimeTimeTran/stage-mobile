import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Button, FormInput } from 'react-native-elements'

export default class PostForm extends Component {
  state = { body: '' }

  handlePostBody(body) {
    this.setState({body})
  }

  handleSubmit = () => {
    this.setState({body: ''})
    this.props.onSubmit(this.state.body)
  }

  render() {
    return (
      <View style={{paddingTop: 5}}>
        <FormInput
          value={this.state.body}
          onChangeText={e => this.handlePostBody(e)}
          placeholder='Say something...'
          containerStyle={{backgroundColor: 'blue', borderBottomWidth: 0, paddingLeft: 10}}
          inputStyle={{color: 'white'}}
        />
          <Button
            title='Create Post'
            onPress={this.handleSubmit}
            iconRight={{name: 'share', type: 'material-community'}}
          >
            <Text>Submit</Text>
          </Button>
      </View>
    )
  }
}
