import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'

import { Icon } from 'react-native-elements'
import { CardSection } from '../components/common'

let { width, height } = Dimensions.get('window')

export default class Drawer extends Component {
  render() {
    const { drawerStyle, cardStyle, cardBackgroundStyle, textStyle } = styles
    const open = this.props.navigation.state.isDrawerOpen
    const style = open ? drawerStyle : ''
    return (
      <View style={style}>
        <View>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='font-awesome' name='user' color='grey' size={20} />
              <Text style={textStyle}>Profile</Text>
            </View>
          </CardSection>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='entypo' name='users' color='grey' size={20} />
              <Text style={textStyle}>Friends</Text>
            </View>
          </CardSection>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='material-icon' name='photo-library' color='grey' size={20}/>
              <Text style={textStyle}>Photos</Text>
            </View>
          </CardSection>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='font-awesome' name='map' color='grey' size={20}/>
              <Text style={textStyle}>Maps</Text>
            </View>
          </CardSection>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='font-awesome' name='gift' color='grey' size={20}/>
              <Text style={textStyle}>Gifting</Text>
            </View>
          </CardSection>
          <CardSection styling={cardBackgroundStyle}>
            <View style={cardStyle}>
              <Icon type='material-icon' name='payment' color='grey' size={20}/>
              <Text style={textStyle}>Billing</Text>
            </View>
          </CardSection>
        </View>
        <View>
          <CardSection styling={[cardBackgroundStyle, {borderBottomWidth: 0, paddingBottom: 20}]}>
            <View style={cardStyle}>
              <Icon type='material-community' name='logout' color='grey' size={20}/>
              <Text style={textStyle}>Log out</Text>
            </View>
          </CardSection>
        </View>
      </View>
    )
  }
}

styles = {
  drawerStyle: {
    backgroundColor: '#333333',
    height: height,
    width: width * .80,
    paddingTop: 40,
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  cardBackgroundStyle: {
    backgroundColor: '#333333',
    marginTop: 20,
    borderBottomColor: 'yellow',
  },
  cardStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 15
  }
}