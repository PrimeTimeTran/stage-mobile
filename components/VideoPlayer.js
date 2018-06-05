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
		}));
	}

	handleVolume = () => {
		this.setState(prevState => ({
			mute: !prevState.mute,
		}));
	}

  render() {
    return (
				<Video
					source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
					// source={{uri: this.state.videoUrl}}
					shouldPlay={this.state.shouldPlay}
					resizeMode="cover"
					isMuted={this.state.mute}
					style={{height: 100, width: 100}}
				/>
		);
  }
}