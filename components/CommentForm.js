import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { FormInput, Button } from 'react-native-elements'

import { CardSection } from './common'

export default class CommentForm extends Component {
  state = { body: '' }

  handleCommentBody(body) {
    this.setState({body})
  }

  handleSubmit = () => {
    this.setState({ body: '' })
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
          <View style={{flex: 1}}>
            <Button
              title='Comment'
              onPress={this.handleSubmit}
              iconRight={{name: 'comment-outline', type: 'material-community'}}
            >
              <Text>Submit</Text>
            </Button>

          </View>
        </CardSection>
      </View>
    )
  }
}
