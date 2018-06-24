import React from 'react'

import { Image } from 'react-native'

const FriendCard = ({ url, custom }) => {
  return (
    <Image style={[styles.avatarStyle, custom]} source={{ uri: url}}/>
  )
}

export { FriendCard }

const styles = {
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
}
