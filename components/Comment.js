import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Avatar, CardSection } from './common'

export default class Comment extends Component {
  render() {
    const { comment } = this.props
    const { commentContainerStyle, avatarStyle } = styles
    return (
      <CardSection id={comment.id} custom={commentContainerStyle}>
        <View>
          <Avatar url={comment.user.user_profile_photo} custom={[avatarStyle, {marginTop: 5}]} />
        </View>
        <View style={{padding: 5, marginRight: 10}}>
          <Text style={{color: 'blue'}}>{comment.user.full_name}</Text>
          <View>
            <Text style={{marginRight: 10}}>{comment.body}</Text>
          </View>
        </View>
      </CardSection>
    )
  }
}

const styles = {
  commentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  avatarStyle: {
    padding: 5,
    height: 25,
    width: 25,
    borderRadius: 15
  }
}
