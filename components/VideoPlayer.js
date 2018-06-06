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
		console.log('This props', this.props)
		let myArray = [
			'https://i.imgur.com/gHFLves.mp4',
			'https://i.imgur.com/6hNdBia.mp4',
			'https://i.imgur.com/GwV55GL.mp4',
			'https://i.imgur.com/ZXEgLh0.mp4'
		]
		var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return (
			<Video
				shouldPlay
				isLooping
				isMuted={true}
				// source={{uri: this.state.videoUrl}}
				style={{ flex: 1 }}
				source={{ uri: rand }}
				resizeMode="contain"
			/>
		);
  }
}