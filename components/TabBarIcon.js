import React from 'react'
import { Icon } from 'react-native-elements'
import Colors from '../constants/Colors'

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        type="material-community"
        name={this.props.name}
        size={24}
        style={{ marginBottom: 0 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    )
  }
}
