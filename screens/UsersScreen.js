import React, { Component } from 'react'
import { Platform, View, Text, Button } from 'react-native'

export default class UsersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333', marginTop: Platform.OS === 'android' ? 24 : 0},
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
