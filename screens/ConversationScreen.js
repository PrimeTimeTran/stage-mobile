import React, { Component } from 'react';
import {  View, Text, Button, Platform } from 'react-native';

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Conversation',
    headerRight: (
      <Button
        title='Users'
        onPress={() => navigation.navigate('Users')}
        backgroundColor='#54C7FC'
        color='blue'
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  render() {
    console.log('Props: ', this.props);
    return (
      <View>
        <Text> ConversationScreen </Text>
      </View>
    );
  }
}
