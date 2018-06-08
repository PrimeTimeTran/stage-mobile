import React from 'react'
import {
  Image,
  ScrollView,
  View,
  Dimensions,
  Button
} from 'react-native'

import Carousel from 'react-native-looped-carousel'
import { UserDescription } from '../components/common'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

const { width } = Dimensions.get('window')
const defaultImage = 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerTitleStyle: {color: 'white'},
    headerBackTitleStyle: {color: 'white'},
    headerTitle: (navigation.state.params.name || navigation.state.params.first_name),
    headerStyle: {backgroundColor: '#333333'}
  })

  constructor(props) {
    super(props)

    this.state = {
      size: { width, height: 300 },
      user: {}
    }
  }

  componentWillMount() {
    const user_id = this.props.navigation.state.params.user_id
    const request = client();
    request
      .then(api =>
        api.get(`${API_ROOT}users/${user_id}`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({user: data})
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout
    this.setState({size: {width: layout.width, height: layout.height}})
  }

  render() {
    const { size, user } = this.state
    if (user && user.uploads && user.uploads.length > 0) {
      return (
        <ScrollView>
          <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
            <Carousel
              autoplay={false}
              style={size}
              onAnimateNextPage={(p) => console.log(p)}
            >
              { user.uploads.map(upload => {
                  return (
                    <View style={size} key={upload.id}>
                      <Image style={size} source={{uri: upload.url}} />
                    </View>
                  )
                })
              }
            </Carousel>
          </View>
          <UserDescription user={user} />
        </ScrollView>
        )
    } else {
      return (
        <View style={size}>
          <Image style={size} source={{uri: defaultImage}} />
        </View>
      )
    }
  }
}
