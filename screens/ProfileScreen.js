import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Profile',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('Settings')}
        backgroundColor='#0076FF'
        color='blue'
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  render() {
    return (
      <View>
        <Text>
          Profile
        </Text>
      </View>
    );
  }
}
