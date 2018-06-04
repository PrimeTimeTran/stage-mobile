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

import { Icon, Button, ButtonGroup } from 'react-native-elements'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class StagesScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 2,
      stages: []
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex})
  }

  static navigationOptions = {
    title: 'Stages'
  }

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

  showStageUploads(stage, upload, index) {
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
      descriptionStyle,
      headerContainerStyle,
      headerTextStyle,
      thumbnailStyle
    } = styles

    const buttons = ['Hello', 'World']
    const { selectedIndex } = this.state

    if (stages) {
      return (
        <ScrollView>
          {stages &&
            stages.map(stage => {
              // console.log('Stage: ', stage)
              return (
                <View key={stage.id}>
                  <Card>
                    <CardSection styling={cardHeaderStyle}>
                      <View style={headerContainerStyle}>
                        <Icon name='chevron-right' color='white'/>
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
                              this.showStageUploads(stage, upload, index)
                            }>
                            <View>
                              <Image
                                style={{ height: 100, width: 100 }}
                                source={{ uri: upload.url }}
                              />
                              <Text
                                style={{
                                  color: '#fff',
                                  position: 'absolute',
                                  bottom: 2,
                                  right: 2,
                                  fontWeight: 'bold'
                                }}>
                                {Math.floor(Math.random() * Math.floor(200))} likes
                              </Text>
                            </View>
                          </Lightbox>
                        )
                      })}
                    </CardSection>
                    <CardSection>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={descriptionStyle}>
                            <Icon name='users' type='font-awesome' color='green' size={10}/>
                            <Icon name='place' color='black' size={15}/>
                            <Icon name='mobile' type='font-awesome' color='black' size={17}/>
                          </View>
                          <View style={descriptionStyle}>
                            <Text style={{color: 'green'}}>{Math.floor(Math.random() * Math.floor(1000))} Active Users</Text>
                            <Text>{stage.address}, {stage.city}, {stage.country}</Text>
                            <Text>{stage.phone}</Text>
                          </View>
                      </View>
                    </CardSection>
                    <CardSection>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} >
                      {/*
                        <Text> Works but ugly</Text>
                      <Button
                        outline
                        small
                        icon={{name: 'info', type: 'feather', color: '#276FBF'}}
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
                      /> */}
                      <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        color='red'
                        containerStyle={{backgroundColor: 'red'}}
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
    justifyContent: 'space-between'
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
  },
  descriptionStyle: {
    justifyContent: 'space-between',
    paddingLeft: 5
  }
})
