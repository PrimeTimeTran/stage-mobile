import React, { Component } from 'react'
import {
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import client from '../utils/client'
import { t } from '../locales/i18n'

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
      .then(api => api.get(`uploads`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ uploads: data })
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  onToggleSelectUpload = id => {
    const { selected } = this.state
    if (selected.includes(id)) {
      const isStillSelected = selected.filter(uploadId => uploadId != id)
      this.setState({ selected: isStillSelected })
    } else {
      this.setState({ selected: [...selected, id] })
    }
  }

  onDeleteUploads = () => {
    const { selected } = this.state
    const request = client()
    request
      .then(api => api.delete('uploads/1', { params: { uploadIds: selected }}))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ uploads: data, selected: [] })
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  renderDeleteButton() {
    return (
      this.state.selected.length &&
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
        onPress={this.onDeleteUploads}
      ><Text>Delete</Text></Button>
    )
  }

  render() {
    const { uploads } = this.state
    const {
      containerStyle,
      multiImageContainer,
      multiImageStyle,
      singleUploadStyle,
      individualImageStyle
    } = styles

    if (uploads && uploads.length) {
      return (
        <View style={containerStyle}>
          <View
            style={multiImageContainer}>
            {uploads.map(upload => {
              let selected = this.state.selected.includes(upload.id) ? 'red' : 'transparent'
              return (
                <TouchableOpacity
                  onPress={() => this.onToggleSelectUpload(upload.id)}
                  key={upload.id}
                  >
                  <View
                    style={[multiImageStyle, { borderColor: selected }]}>
                    <Image
                      style={individualImageStyle}
                      source={{ uri: upload.url }}
                    />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
          {this.renderDeleteButton()}
        </View>
      )
    } else {
      if (uploads) {
        let selected = this.state.selected.includes(uploads.id) ? 'red' : 'transparent'
          return (
            <View>
              <TouchableOpacity
                onPress={() => this.onToggleSelectUpload(uploads.id)}
                key={uploads.id}
                >
                <View
                  style={{
                    marginTop: 10,
                    marginLeft: 10
                  }}>
                  <Image
                    style={[singleUploadStyle, { borderColor: selected }]}
                    source={{ uri: uploads.url }}
                  />
                </View>
              </TouchableOpacity>
              {this.renderDeleteButton()}
            </View>
          )
      } else {
        return <Spinner />
      }
    }
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    width
  },
  multiImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  multiImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 3,
    borderRadius: 5
  },
  individualImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 3
  },
  singleUploadStyle: {
    height: 100,
    width: 100,
    borderRadius: 3,
    borderWidth: 3,
    borderRadius: 5
  }
}