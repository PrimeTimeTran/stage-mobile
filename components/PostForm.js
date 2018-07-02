import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Button, FormInput } from 'react-native-elements'
import { CardSection } from './common'
import Colors from '../constants/Colors'

export default class PostForm extends Component {
  state = { body: '' }

  onAddBody(body) {
    this.setState({ body })
  }

  onSubmit = () => {
    this.setState({ body: '' })
    this.props.onSubmit(this.state.body)
  }

  render() {
    const callToAction = `What's on your mind ${this.props.name}?`

    return (
      <View style={{ paddingTop: 10, backgroundColor: 'white' }}>
        <FormInput
          value={this.state.body}
          inputStyle={{ fontSize: 16 }}
          onChangeText={e => this.onAddBody(e)}
          placeholder={callToAction}
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
          onPress={this.onSubmit}
          containerStyle={{ marginLeft: 0 }}
          buttonStyle={{ marginLeft: 0, width: '100%' }}
          containerViewStyle={{
            marginLeft: 10,
            marginRight: 10
          }}
          iconRight={{ name: 'share', type: 'material-community' }}>
          <Text>Create Post</Text>
        </Button>
        <CardSection
          custom={{ justifyContent: 'space-around', padding: 0, marginBottom: 10 }}>
          <Button
            title="Photo"
            color={Colors.buttonColor.toString()}
            fontSize={14}
            icon={{
              name: 'camera',
              type: 'material-community',
              color: Colors.buttonColor.toString()
            }}
            buttonStyle={{
              backgroundColor: 'transparent'
            }}
            onPress={() => console.log('Photo')}
          ><Text>Photo</Text></Button>
          <Button
            title="Video"
            color={Colors.buttonColor.toString()}
            fontSize={14}
            icon={{
              name: 'video',
              type: 'feather',
              color: Colors.buttonColor.toString()
            }}
            buttonStyle={{
              backgroundColor: 'transparent'
            }}
            onPress={() => console.log('Video')}
            ><Text>Video</Text></Button>
          <Button
            title="Comment"
            color={Colors.buttonColor.toString()}
            fontSize={14}
            icon={{
              name: 'comment',
              color: Colors.buttonColor.toString()
            }}
            buttonStyle={{
              backgroundColor: 'transparent'
            }}
            onPress={() => console.log('Comment')}
            ><Text>Comment</Text></Button>
        </CardSection>
      </View>
    )
  }
}
