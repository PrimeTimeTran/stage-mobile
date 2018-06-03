import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native'

import axios from 'axios'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class StagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Stages'
  }
  state = { stages: [] }

  componentWillMount() {
    const request = client()
    request
      .then(api => api.get(`${API_ROOT}stages`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ stages: data })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  showStage(stage, upload, index) {
    return (
      <Carousel
        currentPage={index}
        autoplay={false}
        style={{
          flex: 1,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT
        }}>
        {stage.uploads.map(upload => {
          return (
            <View style={{ flex: 1 }} key={upload.id}>
              <Image
                style={{ flex: 1, resizeMode: 'cover' }}
                key={upload.id}
                source={{ uri: upload.url }}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  fontWeight: 'bold'
                }}>
                {Math.floor(Math.random() * Math.floor(200))} likes
              </Text>
            </View>
          )
        })}
      </Carousel>
    )
  }

  render() {
    const { stages } = this.state
    const { headerContainerStyle, headerTextStyle, thumbnailStyle } = styles

    if (stages) {
      return (
        <ScrollView>
          {stages &&
            stages.map(stage => {
              return (
                <View key={stage.id}>
                  <Card>
                    <CardSection>
                      <View style={headerContainerStyle} />
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{stage.name}</Text>
                      </View>
                    </CardSection>

                    <CardSection>
                      {stage.uploads.map((upload, index) => {
                        return (
                          <Lightbox
                            key={upload.id}
                            swipeToDismiss={false}
                            renderContent={() =>
                              this.showStage(stage, upload, index)
                            }>
                            <Image
                              style={{ height: 100, width: 100 }}
                              source={{ uri: upload.url }}
                            />
                          </Lightbox>
                        )
                      })}
                      <Text>{/* {post.body} */}</Text>
                    </CardSection>
                  </Card>
                </View>
              )
            })}
        </ScrollView>
      )
    } else {
      ;<div>Empty</div>
    }
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: '600'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
})
