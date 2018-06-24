import React from 'react'

import { Image, Text, View, TouchableOpacity } from 'react-native'

import { CardSection } from './index'

const FriendCard = ({ friend, navigation }) => {
  const {
    id,
    first_name,
    full_name,
    location,
    avatar_url
  } = friend

  const {
    avatarStyle
  } = styles

  onAvatarPress = (id, name) => {
    navigation.navigate('Profile', {
      user_id: id,
      name: name
    })
  }
  return (
    <TouchableOpacity onPress={() => onAvatarPress(id, first_name)}>
      <CardSection style={{ flexDirection: 'row', backgroundColor: 'red' }}>
        <Image style={avatarStyle} source={{ uri: avatar_url}}/>
        <View>
          <Text style={{ fontWeight: '900' }}>{full_name}</Text>
          <Text>{location}</Text>
        </View>
      </CardSection>
    </TouchableOpacity>
  )
}

export { FriendCard }

const styles = {
  avatarStyle: {
    height: 50,
    width: 50,
    marginRight: 10
  }
}
