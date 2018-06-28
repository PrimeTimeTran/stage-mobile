import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'

import { sendMessage, setCallback } from '../utils/chat'
import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'
import CurrentUser from '../utils/CurrentUser'

import { Permissions, ImagePicker } from 'expo'
import MessageImage from '../components/MessageImage'

import ActionSheet from 'react-native-actionsheet'
import { Spinner } from '../components/common'

let options = {
  title: 'Select Upload',
  customButtons: [{ name: 'fb', title: 'Choose Photo' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerTitle:
      navigation.state.params.conversation_name ||
      navigation.state.params.other_user_name,
    headerRight: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() =>
          navigation.navigate('Users', {
            conversation_id: navigation.state.params.conversation_id
          })
        }>
        <Icon
          name="account-multiple"
          type="material-community"
          color="white"
          size={28}
        />
      </TouchableOpacity>
    )
  })

  state = { messages: [], currentUser: null }

  async componentWillMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
    const conversation_id = this.props.navigation.state.params.conversation_id

    const request = client()
    request
      .then(api =>
        api.get(`${API_ROOT}conversations/${conversation_id}/messages`)
      )
      .then(response => {
        return response.data
      })
      .then(data => {
        let messages = data.map(chat => chat.gifted_chat)
        this.setState({ messages })
      })
      .catch(error => {
        console.log('Error:', error)
      })

    setCallback(this.onReceive)
  }

  onReceive = data => {
    const conversationId = this.props.navigation.state.params.conversation_id
    const message = JSON.parse(data).gifted_chat
    const isSameConversation =
      JSON.parse(data).conversation_id == conversationId

    if (message.user._id != this.state.currentUser.id && isSameConversation) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    }
  }

  onSend(messages = []) {
    const conversation_id = this.props.navigation.state.params.conversation_id
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
    sendMessage({
      conversation_id: conversation_id,
      body: messages[0].text
    })
  }

  onLongPress = (context, message) => {
    console.log('Long Pressed context:', context)
    console.log('Long Pressed message:', message)
  }

  renderBubble = props => {
    let username = props.currentMessage.user.name
    let isImage = props.currentMessage.image != null
    const [color, textColor] = this.getColor(username)

    if (this.state.currentUser.id == props.currentMessage.user._id) {
      return (
        <Bubble
          {...props}
          position="right"
          textStyle={{
            right: {
              color: 'white'
            },
            left: {
              color: textColor
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: color,
              padding: 5
            },
            right: {
              borderColor: '#c00',
              backgroundColor: isImage ? Colors.transparent : Colors.defaultBlue
            }
          }}
        />
      )
    } else {
      return (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'white'
            },
            left: {
              color: textColor
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: color,
              padding: 5
            }
          }}
        />
      )
    }
  }

  getColor(username) {
    // TODO
    // Username is undefined the first time this renders after a new message is sent.
    if (!username) {
      username = 'Hello'
    }
    let sumChars = 0
    for (let i = 0; i < username.length; i++) {
      sumChars += username.charCodeAt(i)
    }

    let colors = [
      '#d5c0ab',
      '#e8e8e8',
      '#e9aaa8',
      '#e3efda',
      '#5596d6',
      '#f7eccf',
      '#a68cd6'
    ]
    let textColor = ['#444', '#444', '#444', '#444', '#fff', '#444', '#fff']
    let index = sumChars % colors.length
    return [colors[index], textColor[index]]
  }

  onAvatarPress = props => {
    this.props.navigation.navigate('Profile', {
      user_id: props._id,
      name: props.name
    })
  }

  handleOpenAttachment() {
    this.photoChoosingActionSheet.show()
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

  async askPhotoPermission() {
    const cameraStatus = await Permissions.askAsync(Permissions.CAMERA)
    const cameraRollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    return {
      cameraStatus: cameraStatus.status,
      cameraRollStatus: cameraRollStatus.status
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
        console.log(response.uri)
        this.appendPendingUploadMessage(response.uri)

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data }

        this.setState({
          avatarSource: source
        })
      }
    }
  }

  appendPendingUploadMessage(photoURI) {
    let message = {
      _id: Math.random()
        .toString(36)
        .substr(2, 9),
      isSending: true,
      created_at: new Date().toISOString(),
      image: photoURI,
      user: {
        _id: this.state.currentUser.id,
        name: this.state.currentUser.first_name
      }
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message)
    }))
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

  cancelInProgressUpload(data) {
    let { currentMessage } = data
    this.setState(previousState => {
      let messages = previousState.messages.filter(item => {
        return item._id != currentMessage._id
      })
      return {
        messages: messages
      }
    })
  }

  render() {
    const { currentUser, messages } = this.state

    if (currentUser) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <GiftedChat
            style={{ backgroundColor: '#fff' }}
            onPressAvatar={props => this.onAvatarPress(props)}
            messages={messages}
            alwaysShowSend={true}
            onLongPress={this.onLongPress}
            renderBubble={props => this.renderBubble(props)}
            renderMessageImage={messageImageProps => {
              return (
                <MessageImage
                  {...messageImageProps}
                  cancelInProgressUpload={() =>
                    this.cancelInProgressUpload(messageImageProps)
                  }
                />
              )
            }}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: currentUser.id
            }}
            renderActions={() => {
              return (
                <TouchableOpacity
                  onPress={() => this.handleOpenAttachment()}
                  style={{
                    paddingLeft: 7,
                    paddingRight: 7,
                    height: 43,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Icon
                    containerStyle={{
                      transform: [{ rotate: '140deg' }]
                    }}
                    name="attachment"
                    type="community-material"
                    color={Colors.themeColor.lighten(0.3).toString()}
                    size={30}
                  />
                </TouchableOpacity>
              )
            }}
          />

          {this.renderActionSheetForPhoto()}
        </View>
      )
    } else {
      return <Spinner />
    }
  }
}
