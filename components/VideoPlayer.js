import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Video } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'

const { WINDOW_WIDTH } = Dimensions.get('window')

export default class VideoPlayer extends Component {
  state = {
    mute: true,
    fullScreen: false,
    shouldPlay: true,
    videoUrl: this.props.video
  }

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay
    }))
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute
    }))
  }

  render() {
    let myArray = [
			'https://i.imgur.com/gHFLves.mp4',
			'https://i.imgur.com/6hNdBia.mp4',
			'https://i.imgur.com/GwV55GL.mp4',
			'https://i.imgur.com/ZXEgLh0.mp4',
			'https://i.imgur.com/RNVhrQa.mp4',
			'https://i.imgur.com/46IdBXo.mp4',
			'https://i.imgur.com/U25iofY.mp4',
			'https://i.imgur.com/XcuP9Qi.mp4',
			'https://i.imgur.com/h6UO42C.mp4',
    ]
    var rand = myArray[Math.floor(Math.random() * myArray.length)]
    return (
      <Video
        ref={component => (this.playbackInstance = component)}
        source={{
          uri: this.props.video
        }}
        onPlaybackStatusUpdate={instance => {
          if (this.props.isLooping) {
            if (instance.didJustFinish) {
              this.playbackInstance.setStatusAsync({
                shouldPlay: true,
                positionMillis: 0
              })
            }
          }
        }}
        onError={msg => {
          console.log(msg)
        }}
        shouldPlay={true}
        resizeMode="cover"
        isMuted={this.state.mute}
        style={
          this.props.fullScreen ? { flex: 1 } : { height: 100, width: 100 }
        }
      />
    )
  }
}