import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Video } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'

export default class VideoPlayer extends React.Component {
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
		const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
				<View>
						<Video
							source={{ uri: this.state.videoUrl }}
							shouldPlay={this.state.shouldPlay}
							fullscreen
							style={{ width: 300, height: 300 }}
							isMuted={this.state.mute}
						/>
						<View style={styles.controlBar}>
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
      </View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	},
	controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	}
});