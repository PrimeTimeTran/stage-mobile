import React from 'react'
import {
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Icon } from 'react-native-elements'
import { Permissions, ImagePicker } from 'expo'
import ActionSheet from 'react-native-actionsheet'

import Colors from '../constants/Colors'
import { t } from '../locales/i18n'
import CurrentUser from '../utils/CurrentUser'
import client from '../utils/client'
import { API_ROOT } from '../constants/ApiConfig'

import { UserProfilePhotos, UserDescription, Spinner, PromptModal } from '../components/common'

const { width } = Dimensions.get('window')

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
    title: t('tab.me'),
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerTintColor: 'white',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() =>
          navigation.navigate('EditProfile', { profile_screen: 'MyProfile' })
        }>
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
      avatarSource: null,
      currentUser: null,
      modalVisible: false
    }
  }

  async componentWillMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
      client()
        .then(api => api.get(`users/${this.state.currentUser.id}`))
        .then(response => {
          this.setState({ currentUser: response.data })
          return response.data
        })
        .catch(error => {
          console.log('Error:', error)
        })
    })
  }

  onSubmit = () => {
    const { avatarSource, currentUser } = this.state
    const uri = avatarSource.uri
    const apiUrl = `${API_ROOT}uploads?userId=${currentUser.id}`
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData()
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        });
    const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
        }
    this.setModalVisible(true)
    setInterval(() => this.setModalVisible(false), 1500)
    return fetch(apiUrl, options)
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

  renderPhotoButton() {
    const{ avatarSource } = this.state
    if (avatarSource) {
      return (
        <TouchableOpacity
          onPress={() => this.onSubmit()}
          style={styles.photoButtonStyle}>
          <Icon
            name="save"
            type="font-awesome"
            color="#000"
            size={20}
            containerStyle={{
              marginTop: 3,
              padding: 0
            }}
          />
          <Text style={{ color: '#000' }}>Save</Text>
        </TouchableOpacity>
        )
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.handleChoosePhoto()}
          style={styles.photoButtonStyle}>
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
          <Text style={{ color: '#000' }}>Upload</Text>
        </TouchableOpacity>
      )
    }
  }

  renderCurrentUser() {
    const { currentUser, avatarSource } = this.state
    const { photoStyle } = styles

    if (avatarSource) {
      return (
        <Image
          style={photoStyle}
          source={avatarSource}
        />
      )
    } else {
      return <UserProfilePhotos user={currentUser} />
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {
      currentUser,
      modalVisible
    } = this.state
    if (currentUser)  {
      return (
        <ScrollView>
          {this.renderCurrentUser()}
          <UserDescription user={currentUser} />
          {this.renderPhotoButton()}
          {this.renderActionSheetForPhoto()}

          <PromptModal modalVisible={modalVisible} />
        </ScrollView>
      )
    } else {
      return <Spinner />
    }
  }
}

const styles = StyleSheet.create({
  photoStyle: {
    width,
    height: 300,
    resizeMode: 'cover'
  },
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
