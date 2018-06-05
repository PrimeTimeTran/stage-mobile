import React from 'react'

import {
  Image
} from 'react-native'

const Avatar = ({ url, custom }) => {
  return (
    <Image style={[styles.avatarStyle, custom]} source={{ uri: url}}/>
  )
}

export { Avatar }

const styles = {
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
}