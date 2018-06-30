import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import client from '../utils/client'

import { FriendCard, Spinner } from '../components/common'

export default class FriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Friends',
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
        .then(api => api.get(`friendships`))
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
// import React, { Component } from 'react';
// import { TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native';
// import { Icon } from 'react-native-elements'
// import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

// import Colors from '../constants/Colors'
// import client from '../utils/client'

// import { FriendCard, Spinner } from '../components/common'

// const FirstRoute = (friends, navigation) => (
//   <ScrollView>
//     {friends.map(friend => {
//       return <FriendCard key={friend.id} friend={friend} navigation={navigation}/>
//     })}
//   </ScrollView>
// )

// const SecondRoute = () => (
//   <View style={{ backgroundColor: '#673ab7' }} />
// );

// export default class FriendsScreen extends Component {
//   static navigationOptions = ({ navigation }) => ({
//     title: 'Friends',
//     headerTitleStyle: { color: 'white' },
//     headerLeft: (
//       <TouchableOpacity
//         style={{ padding: 10 }}
//         onPress={() => {
//           navigation.navigate('App')
//           navigation.openDrawer()
//         }}>
//         <Icon name="chevron-left" type="entypo" color="white" size={26} />
//       </TouchableOpacity>
//     ),
//     headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
//     headerBackTitleStyle: { color: 'white' },
//     headerTintColor: 'white'
//   })

//   state = {
//     friends: null,
//     index: 0,
//     routes: [
//       { key: 'first', title: 'Friends' },
//       { key: 'second', title: 'Requests' },
//     ],
//   }

//   async componentWillMount() {
//     const request = client()
//       request
//         .then(api => api.get(`friendships`))
//         .then(response => {
//           this.setState({ friends: response.data })
//           return response.data
//         })
//         .catch(error => {
//           console.log('Error:', error)
//         })
//   }


//   render() {
//     const {
//       friends
//     } = this.state

//     if (friends) {
//       if (friends.length == 0) {
//         return (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Get on Stage and make some friends!</Text>
//           </View>
//         )
//       } else {
//         return (

//             <TabView
//               navigationState={this.state}
//               renderScene={SceneMap({
//                 first: FirstRoute(friends, this.props.navigation),
//                 second: SecondRoute,
//               })}
//               onIndexChange={index => this.setState({ index })}
//               initialLayout={{ width: Dimensions.get('window').width }}
//             />
//         )
//       }

//     } else {
//       return <Spinner />
//     }
//   }
// }
