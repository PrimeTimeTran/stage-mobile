import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import { Icon, Button } from 'react-native-elements'
import call from 'react-native-phone-call'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

let SCREEN_WIDTH = Dimensions.get('window').width

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class StagesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Stages',
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.openDrawer()}>
        <Icon name="menu" type="material-community" color="white" size={26} />
      </TouchableOpacity>
    )
  })

  constructor() {
    super()
    this.state = {
      selectedIndex: 2,
      stages: []
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
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

  handleGoToStageConversation(stage) {
    this.props.navigation.navigate('Conversation', {
      conversation_id: stage.conversation_id,
      stages: true,
      conversation_name: stage.name
    })
  }

  handleCallStage = phone => {
    console.log('Phone Number: ', phone)
    const args = {
      number: '0964359305',
      prompt: false
    }
    call(args).catch(console.error)
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
      headerTextStyle
    } = styles

    if (stages) {
      return (
        <ScrollView>
          {stages &&
            stages.map(stage => {
              return (
                <View key={stage.id}>
                  <Card>
                    <CardSection custom={cardHeaderStyle}>
                      <View style={headerContainerStyle}>
                        <Icon name="chevron-right" color="white" />
                        <Text style={headerTextStyle}>{stage.name}</Text>
                      </View>
                      <Icon name="heart" type="evilicon" color="white" />
                    </CardSection>

                    <CardSection>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {stage.uploads.map((upload, index) => {
                          return (
                            <Lightbox
                              key={upload.id}
                              swipeToDismiss={false}
                              renderContent={() =>
                                this.showStageUploads(stage, upload, index)
                              }>
                              <View
                                style={{
                                  marginRight: 10
                                }}>
                                <Image
                                  style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 5
                                  }}
                                  source={{ uri: upload.url }}
                                />
                                <View
                                  style={{
                                    backgroundColor: '#000000aa',
                                    position: 'absolute',
                                    height: 32,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    borderBottomRightRadius: 5,
                                    borderBottomLeftRadius: 5
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      position: 'absolute',
                                      bottom: 8,
                                      right: 8,
                                      fontWeight: 'bold'
                                    }}>
                                    {Math.floor(
                                      Math.random() * Math.floor(200)
                                    )}{' '}
                                    likes
                                  </Text>
                                </View>
                              </View>
                            </Lightbox>
                          )
                        })}
                      </ScrollView>
                    </CardSection>
                    <CardSection>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={[descriptionStyle, { marginTop: 0 }]}>
                          <Icon
                            name="account-multiple"
                            type="material-community"
                            color={Colors.themeColor.darken(0.2)}
                            size={14}
                          />
                          <Text
                            style={{
                              color: Colors.themeColor.darken(0.2).toString(),
                              marginLeft: 10
                            }}>
                            {Math.floor(Math.random() * Math.floor(1000))}{' '}
                            Active Users
                          </Text>
                        </View>
                        <View style={descriptionStyle}>
                          <Icon
                            name="map-marker"
                            color="black"
                            size={14}
                            type="material-community"
                          />
                          <Text style={{ marginLeft: 10 }}>
                            {stage.business_address}
                          </Text>
                        </View>
                        <View style={descriptionStyle}>
                          <Icon
                            name="cellphone"
                            type="material-community"
                            color="black"
                            size={14}
                          />
                          <TouchableOpacity style={{ marginLeft: 10 }} onPress={this.handleCallStage(stage.phone)}><Text>{stage.phone}</Text></TouchableOpacity>
                        </View>
                      </View>
                    </CardSection>
                    <CardSection>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          height: 20
                        }}>
                        <Button
                          icon={{
                            name: 'information',
                            type: 'material-community',
                            color: Colors.themeColor
                          }}
                          title="Info"
                          textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                          color={Colors.themeColor}
                          onPress={() => console.log('Get more info')}
                          buttonStyle={{
                            width: SCREEN_WIDTH / 2,
                            backgroundColor: 'transparent',
                            height: 45,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5
                          }}
                        />
                        <Button
                          small
                          icon={{
                            name: 'message-processing',
                            type: 'material-community',
                            color: Colors.themeColor
                          }}
                          title="Chat"
                          textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                          color={Colors.themeColor}
                          onPress={() =>
                            this.handleGoToStageConversation(stage)
                          }
                          containerStyle={{ width: SCREEN_WIDTH / 2 }}
                          buttonStyle={{
                            width: SCREEN_WIDTH / 2,
                            backgroundColor: 'transparent',
                            height: 45,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5
                          }}
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
    backgroundColor: Colors.themeColor.darken(0.2),
    position: 'relative'
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  descriptionStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 5,
    flexDirection: 'row',
    marginTop: 5
  }
})
