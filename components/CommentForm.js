import React, { Component, View, Text } from 'react'
import { FormInput, Button } from 'react-native-elements'
import { CardSection } from './common'

export default class CommentForm extends Component {
  state = { body: '' }

  handleCommentBody(body) {
    this.setState({body})
  }

  handleSubmit() {
    this.setState({body: ''})
    this.props.onSubmit(this.state.body)
  }

  render() {
    return (
      <View>
        <CardSection>
          <FormInput
            onSubmit={this.handle}
            value={this.state.body}
            onChangeText={e => this.handleCommentBody(e)}
            placeholder='Say something...'
          />
        </CardSection>
        <CardSection>
          <Button
            onPress={this.handleSubmit}
          >
            <Text>Go</Text>
          </Button>
        </CardSection>
      </View>
    )
  }
}
