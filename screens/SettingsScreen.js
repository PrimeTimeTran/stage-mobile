import React, { Component } from 'react';
import {  View, Text, } from 'react-native';

export default class SettingsScreen extends Component {
  static navigation = {
    tabBarVisible: false
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
