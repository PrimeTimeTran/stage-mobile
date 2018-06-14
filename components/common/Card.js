import React from 'react'
import { View } from 'react-native'

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
}

const styles = {
  containerStyle: {
    borderRadius: 2,
    borderBottomWidth: 0,
    elevation: 1,
    marginBottom: 5,
  }
}

export { Card }
