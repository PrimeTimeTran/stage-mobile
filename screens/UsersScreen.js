import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class UsersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerTitle: 'Users',
    headerRight: (
      <Button
        title="Users"
        onPress={() => navigation.navigate('Users')}
        color="white"
      />
    )
  })

  render() {
    return (
      <View>
        <Text> UsersScreen </Text>
      </View>
    );
  }
}
