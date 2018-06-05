import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import { CardSection } from './common'

export default class Comment extends Component {
  render() {
    const { comment } = this.props
    const { commentsStyle, avatarStyle } = styles
    console.log(comment)
    return (
      <CardSection style={commentsStyle}>
        <View>
          <Image
            id={comment.id}
            style={[avatarStyle, {marginTop: 5}]}
            source={{uri: comment.user.user_profile_photo}}
          />
        </View>
        <View style={{padding: 5}}>
          <Text>{comment.body}</Text>
        </View>
      </CardSection>
    );
  }
}

const styles = {
  commentsStyle: {
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
