import React from 'react'
import {
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Carousel from 'react-native-looped-carousel'
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import CurrentUser from '../utils/CurrentUser'
import client from '../utils/client'

import { UserDescription } from '../components/common'
import { Permissions, ImagePicker } from 'expo'
import ActionSheet from 'react-native-actionsheet'

const { width } = Dimensions.get('window')
const defaultImage =
  'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'

let options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class MyProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Me',
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerTintColor: 'white',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => console.log('Settings')}>
        <Icon
          type="material-community"
          name="settings"
          color="white"
          size={26}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.openDrawer()}>
        <Icon name="menu" type="material-community" color="white" size={26} />
      </TouchableOpacity>
    )
  })

  constructor(props) {
    super(props)

    this.state = {
      size: { width, height: 300 },
      currentUser: {}
    }
  }

  async componentWillMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
      const request = client()
        request
          .then(api => api.get(`${API_ROOT}users/${this.state.currentUser.id}`))
          .then(response => {
            this.setState({ currentUser: response.data })
            return response.data
          })
          .catch(error => {
            console.log('Error:', error)
          })
    })
  }

  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout
    this.setState({ size: { width: layout.width, height: layout.height } })
  }

  async askPhotoPermission() {
    const cameraStatus = await Permissions.askAsync(Permissions.CAMERA)
    const cameraRollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    return {
      cameraStatus: cameraStatus.status,
      cameraRollStatus: cameraRollStatus.status
    }
  }

  async takePhoto() {
    const { cameraStatus, cameraRollStatus } = await this.askPhotoPermission()
    if (cameraStatus === 'granted' && cameraRollStatus === 'granted') {
      // bug in expo, need to request for again
      await Permissions.getAsync(Permissions.CAMERA)
      let response = await ImagePicker.launchCameraAsync(options)
      if (response.cancelled) {
        console.log('User cancelled image picker')
      } else {
        let source = { uri: response.uri }

        this.setState({
          avatarSource: source
        })
      }
    }
  }

  async choosePhotoFromCameraRoll() {
    const { cameraStatus, cameraRollStatus } = await this.askPhotoPermission()
    if (cameraRollStatus === 'granted') {
      // bug in expo, need to request for again
      let response = await ImagePicker.launchImageLibraryAsync(options)
      if (response.cancelled) {
        console.log('User cancelled image picker')
      } else {
        let source = { uri: response.uri }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data }

        this.setState({
          avatarSource: source
        })
      }
    }
  }

  handleChoosePhoto() {
    this.photoChoosingActionSheet.show()
  }

  renderActionSheetForPhoto() {
    return (
      <ActionSheet
        ref={o => (this.photoChoosingActionSheet = o)}
        title={'Select Avatar'}
        options={['Take Photo...', 'Choose from Library...', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            this.takePhoto()
          } else if (index === 1) {
            this.choosePhotoFromCameraRoll()
          }
        }}
      />
    )
  }

  renderAvatar() {}

  renderPhotoButton() {
    return (
      <TouchableOpacity
        style={styles.photoButtonStyle}
        onPress={() => this.handleChoosePhoto()}>
        <Icon
          name="camera"
          type="material-community"
          color="#000"
          size={20}
          containerStyle={{
            marginTop: 3,
            padding: 0
          }}
        />
        <Text style={{ color: '#000' }}>Edit</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { size, currentUser } = this.state
    console.log('CurrentUser', currentUser);

    if (currentUser && currentUser.uploads && currentUser.uploads.length > 0) {
      return (
        <ScrollView>
          <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
            <Carousel
              autoplay={false}
              style={size}
              onAnimateNextPage={p => console.log(p)}>
              {currentUser.uploads.map(upload => {
                return (
                  <View style={size} key={upload.id}>
                    <Image style={size} source={{ uri: upload.url }} />
                  </View>
                )
              })}
            </Carousel>
          </View>
          <UserDescription user={currentUser} />

          {this.renderPhotoButton()}
          {this.renderActionSheetForPhoto()}
        </ScrollView>
      )
    } else {
      return (
        <View style={size}>
          <Image
            style={[size, { resizeMode: 'cover' }]}
            source={
              this.state.avatarSource
                ? this.state.avatarSource
                : { uri: defaultImage }
            }
          />
          {this.renderPhotoButton()}
          {this.renderActionSheetForPhoto()}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  photoButtonStyle: {
    backgroundColor: '#eeeeeeaa',
    width: 80,
    borderTopLeftRadius: 5,
    bottom: 0,
    right: 0,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
})
