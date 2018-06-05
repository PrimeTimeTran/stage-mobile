import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

class TestScreen extends Component {
  render() {
    return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
  }
}

export default TestScreen