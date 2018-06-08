import React from 'react'
import { View } from 'react-native'

const CardSection = ({ custom }) => {
  return (
    <View style={[styles.containerStyle, custom]}>
      {props.children}
    </View>
  )
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
}

export { CardSection }
