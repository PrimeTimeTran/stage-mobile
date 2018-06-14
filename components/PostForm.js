import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Button, FormInput } from 'react-native-elements'
import Colors from '../constants/Colors'
import { CardSection } from './common'
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
      <View>
        <CardSection custom={{borderBottomWidth: 0}}>
          <FormInput
            value={this.state.body}
            onChangeText={e => this.handlePostBody(e)}
            placeholder="What's on your mind?"
            containerStyle={{flex: 1, paddingLeft: 5}}
          />
        </CardSection>
        <CardSection>
          <View style={{flex: 1}}>
            <Button
                title="Create Post"
                outline
                onPress={this.handleSubmit}
                color={Colors.themeColor.toString()}>
              <Text>Submit</Text>
            </Button>
          </View>
        </CardSection>
      </View>
    )
  }
}
