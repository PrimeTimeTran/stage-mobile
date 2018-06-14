import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors'

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.custom]}>
      {props.children}
    </View>
  )
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#dddddd99',
    position: 'relative'
  }
}

export { CardSection }
