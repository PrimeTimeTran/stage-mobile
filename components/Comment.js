import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import { Avatar, CardSection } from './common'

export default class Comment extends Component {
  render() {
    const { comment } = this.props
    const { commentContainerStyle, avatarStyle } = styles

    return (
      <CardSection id={comment.id} style={commentContainerStyle}>
        <View>
          <Avatar url={comment.user.user_profile_photo} custom={[avatarStyle, {marginTop: 5}]}/>
        </View>
        <View style={{padding: 5}}>
          <Text>{comment.body}</Text>
        </View>
      </CardSection>
    );
  }
}

const styles = {
  commentContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  avatarStyle: {
    padding: 5,
    height: 25,
    width: 25,
    borderRadius: 10
  },
}
