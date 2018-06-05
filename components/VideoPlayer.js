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
		let myArray = [
			'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
			'https://static.videezy.com/system/resources/previews/000/000/160/original/RoadTrip.mp4',
			'http://coverr.co/s3/mp4/Brooklyn-run.mp4',
			'https://static.videezy.com/system/resources/previews/000/002/448/original/slow-motion-drop-hd-stock-video.mp4',
			'http://coverr.co/s3/mp4/Down-time.mp4',
			'http://coverr.co/s3/mp4/Moped.mp4',
			'http://coverr.co/s3/mp4/Squat-it.mp4',
			'http://coverr.co/s3/mp4/Behind-the-screen.mp4',
			'http://coverr.co/s3/mp4/Film-set.mp4'
		]
		var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return (
				<Video
					// source={{uri: this.state.videoUrl}}
					source={{uri: rand}}
					style={{height: 100, width: 100}}
					shouldPlay={this.state.shouldPlay}
					resizeMode="contain"
					isMuted={this.state.mute}

				/>
		);
  }
}