import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform
} from 'react-native'
import { Button } from 'react-native-elements'

import Colors from '../constants/Colors'

import { Icon, SearchBar } from 'react-native-elements'
const isIphoneX = () => {
  const { height, width } = Dimensions.get('window')
  return Platform.OS === 'ios' && (height === 812 || width === 812)
}

export default class SearchHeader extends Component {
  state = { value: '' }

  componentDidMount() {
    setTimeout(() => {
      this.search.focus()
    }, 100)
  }

  render() {
    return (
      <View
        style={{
          height: isIphoneX() ? 88 : Platform.OS == 'ios' ? 64 : 78,
          paddingTop: Platform.OS == 'ios' ? (isIphoneX() ? 20 : 20) : 0,
          backgroundColor: Colors.themeColor,
          flexDirection: 'row'
        }}>
        <View
          style={{
            top: isIphoneX() ? 40 : 16,
            flex: 1,
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
          <SearchBar
            returnKeyType="search"
            placeholder="e.g. Bar2000"
            placeholderTextColor="#ddd"
            value={this.state.value}
            onChangeText={text => this.setState({ value: text })}
            ref={search => (this.search = search)}
            onSubmitEditing={() => this.props.performSearch(this.state.value)}
            icon={{
              name: 'magnify',
              type: 'material-community',
              color: Colors.themeColor
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: Colors.themeColor,
              padding: 0,
              borderWidth: 0,
              shadowColor: 'white', //no effect
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            inputStyle={{
              backgroundColor: '#fff',
              borderWidth: 0
            }}
            inputContainerStyle={{
              borderWidth: 0
            }}
            showOnLoad
            round
            lightTheme
          />
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Cancel"
            buttonStyle={{
              color: '#c00',
              backgroundColor: 'transparent'
            }}
            style={{
              margin: 0,
              padding: 0
            }}
          />
        </View>
      </View>
    )
  }
}
