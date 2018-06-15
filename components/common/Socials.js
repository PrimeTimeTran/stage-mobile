import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CardSection } from './CardSection'
import Colors from '../../constants/Colors'

class Socials extends Component {
  render() {
    const { reactions_count, comments_count } = this.props
    return (
      <CardSection>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
          }}>
          {reactions_count > 0 && (
            <Text
              style={{ paddingLeft: 10, color: Colors.lightTextColor }}>
              {reactions_count} Likes
            </Text>
          )}
          {comments_count > 0 && (
            <Text
              style={{
                paddingRight: 10,
                color: Colors.lightTextColor
              }}>
              {comments_count} Comments
            </Text>
          )}
        </View>
      </CardSection>
    )
  }
}

export { Socials }
