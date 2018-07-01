/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types'
import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import Colors from '../constants/Colors'
import { RNS3 } from 'react-native-aws3'
import { S3_ACCESS_KEY, S3_SECRET_KEY } from 'react-native-dotenv'

import { sendMessage } from '../utils/chat'

const s3Options = {
  keyPrefix: 'uploads/',
  bucket: 'react-native-s3',
  region: 'ap-southeast-1',
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  successActionStatus: 201
}

export default class MessageImage extends React.Component {
  state = {
    currentUploadingProgress: 0,
    sendMessageComplete: false
  }

  renderCancelButton() {
    let size = 50
    return (
      <TouchableOpacity
        onPress={() => this.cancelInProgressUpload()}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -size / 2,
          marginLeft: -size / 2
        }}>
        <Icon
          name="close"
          color="white"
          type="community-material"
          size={size - 10}
        />
      </TouchableOpacity>
    )
  }

  cancelInProgressUpload() {
    if (this.props.cancelInProgressUpload) {
      this.props.cancelInProgressUpload()
    }
  }

  componentDidMount() {
    let { imageProps, currentMessage } = this.props
    if (currentMessage.isSending) {
      const file = {
        uri: currentMessage.image,
        type: 'image/png',
        name: [
          Math.random()
            .toString(36)
            .substring(2, 15),
          Math.random()
            .toString(36)
            .substring(2, 15),
          '.png'
        ].join('')
      }
      RNS3.put(file, s3Options)
        .then(response => {
          if (response.status !== 201)
            throw new Error('Failed to upload image to S3')

          sendMessage({
            conversation_id: this.props.conversationId,
            upload_s3_location: response.body.postResponse.location
          })
          this.setState({
            sendMessageComplete: true
          })
        })
        .progress(e => {
          let percent = e.loaded * 100.0 / e.total
          this.setState({ currentUploadingProgress: percent })
        })
    }
  }

  renderImageWithLoader() {
    let {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage
    } = this.props
    let width = 50
    let progressBar = (
      <AnimatedCircularProgress
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginTop: -(width / 2),
          marginLeft: -(width / 2)
        }}
        size={width}
        width={4}
        fill={this.state.currentUploadingProgress}
        tintColor={Colors.themeColor.toString()}
        backgroundColor={'#fff'}
      />
    )
    return (
      <View>
        <Image
          {...imageProps}
          style={[styles.image, imageStyle]}
          source={{ uri: currentMessage.image }}
        />
        <View
          style={{
            backgroundColor: '#00000055',
            flex: 1,
            borderRadius: 15,
            margin: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
        {progressBar}
        {this.renderCancelButton()}
      </View>
    )
  }

  renderImage() {
    let {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage
    } = this.props
    return (
      <Lightbox
        activeProps={{
          style: styles.imageActive
        }}
        {...lightboxProps}>
        <Image
          {...imageProps}
          style={[styles.image, imageStyle]}
          source={{ uri: currentMessage.image }}
        />
      </Lightbox>
    )
  }

  render() {
    let {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        {currentMessage.isSending && this.state.sendMessageComplete == false
          ? this.renderImageWithLoader()
          : this.renderImage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover'
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain'
  }
})

MessageImage.defaultProps = {
  currentMessage: {
    image: null
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {}
}

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object
}
