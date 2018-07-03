import React from 'react'
import { Icon } from 'react-native-elements'

const SocialIcon = ({ type, name, color, size }) => (
  <Icon
    type={type}
    name={name}
    iconStyle={{ backgroundColor: color }}
    size={size}
  />
)

export { SocialIcon }
