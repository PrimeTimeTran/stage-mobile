import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { CardSection, Card } from './common'

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
      <Card>
        <CardSection style={{flex: 1}}>
          <FormInput
            onSubmit={this.handle}
            value={this.state.body}
            onChangeText={e => this.handleCommentBody(e)}
          />
          <Button
            icon={{name: 'cached'}}
            title='Comment'
            onPress={this.handleSubmit}
          />
        </CardSection>
      </Card>
    );
  }
}
