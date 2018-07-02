import React, { Component } from 'react'
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import client from '../utils/client'
import { t } from '../locales/i18n'

import { FriendCard, Spinner } from '../components/common'

export default class FriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: t('drawer.friends.title'),
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

  state = {
    friends: null
  }

  async componentWillMount() {
    const request = client()
      request
        .then(api => api.get('friendships'))
        .then(response => {
          this.setState({ friends: response.data })
          return response.data
        })
        .catch(error => {
          console.log('Error:', error)
        })
  }


  render() {
    const {
      friends
    } = this.state

    if (friends) {
      if (friends.length == 0) {
        return (
          <View style={styles.noFriendsStyle}>
            <Text>Get on Stage and make some friends!</Text>
          </View>
        )
      } else {
        return (
          <ScrollView>
            {friends.map(friend => {
              return <FriendCard key={friend.id} friend={friend} navigation={this.props.navigation}/>
            })}
          </ScrollView>
        )
      }

    } else {
      return <Spinner />
    }
  }
}
const styles = StyleSheet.create({
  noFriendsStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})