import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'

import { FormInput, Button } from 'react-native-elements'

import Colors from '../constants/Colors'
import { CardSection } from './common'

let SCREEN_WIDTH = Dimensions.get('window').width

export default class CommentForm extends Component {
  state = { body: '' }

  handleCommentBody(body) {
    this.setState({ body })
  }

  handleSubmit = () => {
    this.setState({ body: '' })
    this.props.onSubmit(this.state.body)
  }

  render() {
    return (
      <View>
        <CardSection custom={{ paddingTop: 0, paddingBottom: 0 }}>
          <FormInput
            placeholder="Say something..."
            value={this.state.body}
            containerStyle={{
              marginLeft: 5,
              borderBottomColor: 'transparent',
              width: SCREEN_WIDTH - 35
            }}
            inputStyle={{ fontSize: 16, padding: 0, color: '#000' }}
            onChangeText={e => this.handleCommentBody(e)}
          />
        </CardSection>
        <CardSection custom={{ padding: 0, paddingTop: 10, paddingBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Comment"
              backgroundColor={Colors.buttonColor.toString()}
              onPress={this.handleSubmit}
              iconRight={{
                name: 'comment-outline',
                type: 'material-community'
              }}>
              <Text>Submit</Text>
            </Button>
          </View>
        </CardSection>
      </View>
    )
  }
}
