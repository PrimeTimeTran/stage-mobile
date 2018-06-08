import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import { CardSection } from './CardSection'

class UserDescription extends Component {
  render() {
    const { user } = this.props
    const { descriptionStyle } = styles
    return (
      <View>
      <CardSection>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={descriptionStyle}>
            <Icon name='users' type='font-awesome' color='green' size={10}/>
            <Icon name='place' color='black' size={15}/>
            <Icon name='mobile' type='font-awesome' color='black' size={17}/>
          </View>
          <View style={descriptionStyle}>
            <Text>{user.full_name}</Text>
            <Text>{user.location}</Text>
            <Text>{user.occupation}</Text>
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
  }
})

