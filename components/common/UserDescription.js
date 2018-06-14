import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import Colors from '../../constants/Colors'
import { CardSection } from './CardSection'

class UserDescription extends Component {
  render() {
    const { user } = this.props
    const { descriptionStyle, titleStyle } = styles
    return (
      <View>
        <CardSection>
          <View style={{ flex: 1 }}>
            <View style={descriptionStyle}>
              <Icon
                type="material-community"
                name="account"
                color="grey"
                size={18}
              />
              <Text style={titleStyle}>
                {[user.full_name, user.age].filter(n => n).join(', ')}
              </Text>
            </View>
            <View style={descriptionStyle}>
              <Icon
                type="material-community"
                name="map-marker"
                color="grey"
                size={18}
              />

              <Text style={titleStyle}>{user.location}</Text>
            </View>
            <View style={[descriptionStyle, { marginBottom: 0 }]}>
              <Icon
                type="material-community"
                name="briefcase"
                color="grey"
                size={17}
              />
              <Text style={titleStyle}>{user.occupation}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: 5,
                bottom: 5,
                justifyContent: 'space-between'
              }}>
              <Icon type="font-awesome" name="send-o" color="grey" size={20} />
              <Icon type="font-awesome" name="gift" color="grey" size={20} />
            </View>
          </View>
        </CardSection>
        <CardSection>
          <View style={{ padding: 5 }}>
            <Text style={{ color: '#333' }}>{user.description}</Text>
          </View>
        </CardSection>
      </View>
    )
  }
}

export { UserDescription }

const styles = StyleSheet.create({
  descriptionStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 5,
    marginBottom: 5,
    flexDirection: 'row'
  },
  titleStyle: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.themeColor.darken(0.2)
  }
})
