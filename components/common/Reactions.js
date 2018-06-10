import React, { Component } from 'react'
import { Text, } from 'react-native'
import { CardSection } from './CardSection'

class Reactions extends Component {
  render() {
    const { count } = this.props
    return (
      <CardSection>
        <Text style={{paddingLeft: 20}}>{count} Likes</Text>
      </CardSection>
    )
  }
}

export { Reactions }