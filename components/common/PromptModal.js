import React, { Component } from 'react'
import {
  Text,
  Dimensions,
  Modal,
  TouchableHighlight,
  View
} from 'react-native'

const { height } = Dimensions.get('window')

class PromptModal extends Component {
  render() {
    const { modalVisible } = this.props
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={
          modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : ''}>
          <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height
            }}>
            <TouchableHighlight>
              <Text>Success</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export { PromptModal }