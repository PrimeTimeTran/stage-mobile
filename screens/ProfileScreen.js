import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native'

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Profile',
    headerStyle: {
      backgroundColor: '#333333',
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('Settings')}
        backgroundColor='#0076FF'
        color='blue'
      />
    ),

  });

  render() {
    console.log('Props: ', this.props)
    return (
      <View>
        <Text>
          Profile
        </Text>
      </View>
    );
  }
}
