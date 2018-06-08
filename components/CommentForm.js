import React, { Component } from 'react'
import { FormInput, Button } from 'react-native-elements'
import { CardSection } from './common'

export default class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
  }

  handleCommentBody = (body) => {
    this.setState({body})
  }

  handleSubmit = () => {
    this.setState({body: ''})
    this.props.onSubmit(this.state.body)
  }

  render() {
    return (
      <CardSection>
        <FormInput
          onSubmit={this.handle}
          value={this.state.body}
          onChangeText={e => this.handleCommentBody(e)}
          placeholder='Say something...'
        />
        <Button
          icon={{name: 'cached'}}
          title='Comment'
          onPress={this.handleSubmit}
        />
      </CardSection>
    )
  }
}
