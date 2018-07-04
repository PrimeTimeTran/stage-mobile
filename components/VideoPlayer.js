import React, { Component } from 'react'
import { Video } from 'expo'

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