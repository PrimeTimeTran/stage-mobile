import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native'

import { Icon, Button } from 'react-native-elements'

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
    const {
      cardHeaderStyle,
      headerContainerStyle,
      headerTextStyle,
      thumbnailStyle
    } = styles

    if (stages) {
      return (
        <ScrollView>
          {stages &&
            stages.map(stage => {
              console.log('Stage: ', stage)
              return (
                <View key={stage.id}>
                  <Card>
                    <CardSection styling={cardHeaderStyle}>
                      <View style={headerContainerStyle}>
                        <Icon name='arrow-right' type='evilicon' color='white'/>
                        <Text style={headerTextStyle}>
                          {stage.name}
                        </Text>
                      </View>
                      <Icon name='heart' type='evilicon' color='white'/>
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
                    </CardSection>
                    <CardSection>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} >
                      <Button
                        outline
                        small
                        icon={{name: 'info-with-circle', type: 'entypo', color: '#276FBF'}}
                        title='Info'
                        style={{width: 100}}
                        color='#276FBF'
                      />
                      <Button
                        outline
                        small
                        icon={{name: 'message-circle', type: 'feather', color: '#276FBF'}}
                        title='Chat'
                        style={{width: 100}}
                        color='#276FBF'
                      />
                      </View>
                    </CardSection>
                  </Card>
                </View>
              )
            })}
        </ScrollView>
      )
    } else {
      return <div>Empty</div>
    }
  }
}

const styles = StyleSheet.create({
  cardHeaderStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    position: 'relative'
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
})
