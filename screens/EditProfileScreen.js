import React, { Component } from 'react';
import { TouchableOpacity, View, Text, } from 'react-native';

import { Icon } from 'react-native-elements'
import Colors from '../constants/Colors'
export default class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate('Conversations')}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })

  handleGoBack = () => {
    this.props.navigation.navigate('Conversations')
  }

  render() {
    console.log('Props', this.props.navigation);
    return (
      <View>
        <TouchableOpacity onPress={this.handleGoBack}><Text>Go Back</Text></TouchableOpacity>

      </View>
    );
  }
}
