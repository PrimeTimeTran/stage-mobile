import React, { Component } from 'react';
import { TouchableOpacity, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'

export default class MediaScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Media',
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          navigation.navigate('App')
          navigation.openDrawer()
        }}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })
  render() {
    return (
      <View>
        <Text> MediaScreen </Text>
      </View>
    );
  }
}
