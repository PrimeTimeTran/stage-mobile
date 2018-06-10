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
  a   </CardSection>
    )
  }
}

export { DrawerCard }

const styles = {
  cardBackgroundStyle: {
    marginTop: 20,
    borderBottomWidth: 0,
    paddingLeft: 30
  },
  cardStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    color: '#333',
    fontSize: 20,
    paddingLeft: 15
  }
}
