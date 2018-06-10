import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import { CardSection } from './CardSection'

export default class DrawerCard extends Component {
  render() {
    const {
      cardBackgroundStyle,
      cardStyle,
      textStyle
    } = styles

    const {
      type,
      name,
      content
    } = this.props

    return (
      <CardSection custom={cardBackgroundStyle}>
        <View style={cardStyle}>
          <Icon type={type} name={name} color='grey' size={20} />
          <Text style={textStyle}>{content}</Text>
        </View>
      </CardSection>
    )
  }
}

export { DrawerCard }

const styles = {
  cardBackgroundStyle: {
    backgroundColor: '#333333',
    marginTop: 20,
    borderBottomColor: 'white',
  },
  cardStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 15
  }
}