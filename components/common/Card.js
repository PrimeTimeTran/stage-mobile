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
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#eee',
    borderBottomWidth: 0,
    elevation: 1,
    marginTop: 5,
  }
}

export { Card }
