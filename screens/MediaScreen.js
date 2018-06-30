import React, { Component } from 'react'
import { Image, Dimensions, TouchableOpacity, View, Text } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import {
  Spinner
} from '../components/common'

const { width } = Dimensions.get('window')

export default class MediaScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Media',
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          navigation.navigate('App')
          navigation.openDrawer()
        }}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })

  state = { uploads: null, selected: [] }

  async componentWillMount() {
    const request = client()
    request
      .then(api => api.get(`${API_ROOT}uploads`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ uploads: data })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  onToggleSelectUpload = id => {
    const { selected } = this.state
    if (selected.includes(id)) {
      const unSelected = selected.filter(uploadId => uploadId != id)
      this.setState({ selected: unSelected })
    } else {
      this.setState({ selected: [...selected, id]})
    }
  }

  onRemoveUploads = () => {
    console.log('Removing Uploads')
  }

  render() {
    const { uploads } = this.state
    if (uploads) {
      return (
        <View style={{ flex: 1, width }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
            {uploads.map(upload => {
              let selected = this.state.selected.includes(upload.id) ? 'red' : 'transparent'
              return (
                <TouchableOpacity onPress={() => this.onToggleSelectUpload(upload.id)}>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      borderColor: selected,
                      borderWidth: 3,
                      borderRadius: 5
                    }}>
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 3
                      }}
                      source={{ uri: upload.url }}
                    />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
          { this.state.selected.length > 0 &&
            <Button
              title="Delete"
              fontSize={14}
              icon={{
                type: 'feather',
                name: 'save'
              }}
              buttonStyle={{
                marginTop: 10,
                backgroundColor: Colors.buttonColor.toString()
              }}
              onPress={this.onRemoveUploads}
            ><Text>Delete</Text></Button>
          }
        </View>
      )
    } else {
      return <Spinner />
    }
  }
}
