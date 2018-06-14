import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CardSection } from './CardSection'

class Socials extends Component {
  render() {
    const { reactions_count, comments_count } = this.props
    return (
      <CardSection>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          { reactions_count > 0 &&
              <Text style={{paddingLeft: 10}}>{reactions_count} Likes</Text>
          }
          { comments_count > 0 &&
              <Text style={{paddingRight: 10}}>{comments_count} Comments</Text>
          }
        </View>
      </CardSection>
    )
  }
}

export { Socials }