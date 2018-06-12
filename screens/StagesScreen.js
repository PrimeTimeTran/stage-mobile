import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native'

import { Icon, Button } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class StagesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Stages',
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: Colors.themeColor },
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerLeft: (
      <View style={{paddingLeft: 10}}>
        <Icon
          type='entypo'
          name='menu'
          color='white'
          onPress={() => navigation.openDrawer()}/>
      </View>
    )
  })

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
                            <Text>{stage.business_address}</Text>
                            <Text>{stage.phone}</Text>
                          </View>
                      </View>
                    </CardSection>
                    <CardSection>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} >
                          <Text> Works but ugly</Text>
                          <Button
                            outline
                            small
                            icon={{
                              name: 'info',
                              type: 'feather',
                              color: Colors.themeColor.toString()
                            }}
                            title='Info'
                            style={{width: 100}}
                            color={Colors.themeColor}
                            onPress={() => console.log('Get more info')}
                          />
                          <Button
                            outline
                            small
                            icon={{
                              name: 'message-circle',
                              type: 'feather',
                              color: Colors.themeColor.toString()
                            }}
                            title='Chat'
                            style={{width: 100}}
                            color={Colors.themeColor}
                            onPress={() => this.handleGoToStageConversation(stage)}
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
    backgroundColor: Colors.themeColor,
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
  descriptionStyle: {
    justifyContent: 'space-between',
    paddingLeft: 5
  }
})
