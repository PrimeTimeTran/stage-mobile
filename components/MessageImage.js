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

export default class MessageImage extends React.Component {
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
        fill={20}
        tintColor={Colors.themeColor}
        onAnimationComplete={() => console.log('onAnimationComplete')}
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
        {currentMessage.isSending
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
