import React from 'react'
import {
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import Carousel from 'react-native-looped-carousel'
import ImagePicker from 'react-native-image-picker'
import { Icon } from 'react-native-elements'

import { UserDescription } from '../components/common'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

const { width } = Dimensions.get('window')
const defaultImage = 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'

let options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class MyProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Me',
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: '#333333'},
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerRight: (
      <View style={{paddingRight: 10}}>
        <Icon
          type='font-awesome'
          name='gears'
          color='white'
          size={15}
          onPress={() => console.log('Settings') }/>
      </View>
    ),
    headerLeft: (
      <View style={{paddingLeft: 10}}>
        <Icon
          type='entypo'
          name='menu'
          color='white'
          onPress={() => navigation.openDrawer()}/>
      </View>
    )
  })

  constructor(props) {
    super(props)

    this.state = {
      size: { width, height: 300 },
      user: {}
    }
  }

  async componentWillMount() {
    const user_id = await AsyncStorage.getItem('current_user')
    const request = client()
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

  handleChoosePhoto(){
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source = { uri: response.uri }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data }

        this.setState({
          avatarSource: source
        })
      }
    })
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
                )})
              }
            </Carousel>
          </View>
          <UserDescription user={user} />
          <TouchableOpacity onPress={this.handleChoosePhoto.bind(this)}>
            <Text>Show Image picker</Text>
          </TouchableOpacity>
          </ScrollView>
        )
    } else {
      return (
        <View style={size}>
          <Image style={size} source={{uri: defaultImage}} />
          <TouchableOpacity onPress={this.handleChoosePhoto.bind(this)}>
            <Text>Show Image picker</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
