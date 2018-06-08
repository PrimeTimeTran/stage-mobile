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
              <Icon type='font-awesome' name='user' color='red' size={15}/>
              <Icon type='font-awesome' name='map-marker' color='red' size={15}/>
              <Icon type='font-awesome' name='briefcase' color='red' size={17}/>
            </View>
            <View style={descriptionStyle}>
              <Text>{user.full_name}</Text>
              <Text>{user.location}</Text>
              <Text>{user.occupation}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', padding: 10, justifyContent: 'center'}}>
              <Icon type='font-awesome' name='send-o' color='red' />
              <Icon type='font-awesome' name='gift' color='red' />
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

