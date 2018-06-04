import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Video } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'

const { WINDOW_WIDTH } = Dimensions.get('window')

export default class VideoPlayer extends Component {
	state = {
		mute: false,
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
		console.log('Rendering Video Player: ', this)
    return (
			<View style={{ flex: 1, height: 100, width: 100}}>
					<Video
						source={{ uri: this.state.videoUrl }}
						shouldPlay={this.state.shouldPlay}
						resizeMode="cover"
						isMuted={this.state.mute}
					/>
					<View>
						<MaterialIcons
							name={this.state.mute ? "volume-mute" : "volume-up"}
							size={45}
							color="white"
							onPress={this.handleVolume}
						/>
						<MaterialIcons
							name={this.state.shouldPlay ? "pause" : "play-arrow"}
							size={45}
							color="white"
							onPress={this.handlePlayAndPause}
						/>
					</View>
			</View>
		);
  }
}