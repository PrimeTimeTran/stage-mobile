import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import { CardSection } from './CardSection'

class UserDescription extends Component {
  render() {
    const { user } = this.props
    const { descriptionStyle, titleStyle} = styles
    return (
      <View>
      <CardSection>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={descriptionStyle}>
              <Icon type='font-awesome' name='user' color='grey' size={15} />
              <Icon type='font-awesome' name='map-marker' color='grey' size={15} />
              <Icon type='font-awesome' name='briefcase' color='grey' size={17} />
            </View>
            <View style={descriptionStyle}>
              <Text style={titleStyle}>{user.full_name}</Text>
              <Text style={titleStyle}>{user.location}</Text>
              <Text style={titleStyle}>{user.occupation}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10, justifyContent: 'space-between' }}>
              <Icon type='font-awesome' name='send-o' color='grey' size={20} />
              <Icon type='font-awesome' name='gift' color='grey' size={20} />
            </View>
        </View>
      </CardSection>
      <CardSection>
        <View style={{padding: 10}}>
          <Text>
            {user.description}
          </Text>
        </View>
      </CardSection>
    </View>
    );
  }
}

export { UserDescription }

const styles = StyleSheet.create({
  descriptionStyle: {
    justifyContent: 'space-between',
    paddingLeft: 5
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 5
  }
})

