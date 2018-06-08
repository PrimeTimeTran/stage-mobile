import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import { CardSection } from './CardSection'

const DrawerCard = ({ type, name, content }) => {
  const {
    cardBackgroundStyle,
    cardStyle,
    textStyle
  } = styles

  return (
    <View>
      <CardSection custom={cardBackgroundStyle}>
        <View style={cardStyle}>
          <Icon type={type} name={name} color='grey' size={20} />
          <Text style={textStyle}>{content}</Text>
        </View>
      </CardSection>
    </View>
  )
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