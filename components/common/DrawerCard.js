import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import { CardSection } from './CardSection'

class DrawerCard extends Component {
  render() {
    const { type, name, content } = this.props
    const { cardBackgroundStyle, cardStyle, textStyle } = styles
    return (
      <View>
        <CardSection styling={[cardBackgroundStyle, this.props.custom]}>
          <View style={cardStyle}>
            <Icon type={type} name={name} color='grey' size={20} />
            <Text style={textStyle}>{content}</Text>
          </View>
        </CardSection>
      </View>
    );
  }
}

export { DrawerCard }

styles = {
  cardBackgroundStyle: {
    backgroundColor: '#333333',
    marginTop: 20,
    borderBottomColor: 'yellow',
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