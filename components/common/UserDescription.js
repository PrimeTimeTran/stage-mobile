import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import Colors from '../../constants/Colors'
import client from '../../utils/client'
import CurrentUser from '../../utils/CurrentUser'

import { CardSection } from './CardSection'

class UserDescription extends Component {
  state = {
    conversationId: null,
    otherUserName: null,
    currentUser: null
  }

  async componentWillMount() {
    const otherUserId = this.props.user.id
    const request = client()
    request
      .then(api =>
        api.get(`conversations/present?otherUserId=${otherUserId}`)
      )
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({
          conversationId: data.conversation_id,
          otherUserName: data.other_user_name
        })
      })
      .catch(error => {
        console.log('Error', error)
      })
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
  }

  onGoToConversation = () => {
    const { conversationId, otherUserName } = this.state
    if (conversationId) {
      this.props.navigation.navigate('PrivateConversation', {
        conversation_id: conversationId,
        other_user_name: otherUserName
      })
    } else {
      this.props.navigation.navigate('NewConversation', {
        other_user_name: otherUserName,
        other_user_id: this.props.user.id
      })
    }
  }

  render() {
    const { user } = this.props
    const { descriptionStyle, titleStyle } = styles
    const { currentUser } = this.state
    if (currentUser) {
      return (
        <View>
          <CardSection>
            <View style={{ flex: 1 }}>
              <View style={descriptionStyle}>
                <Icon
                  type="material-community"
                  name="account"
                  color="grey"
                  size={18}
                />
                <Text style={titleStyle}>
                  {[user.full_name, user.age].filter(n => n).join(', ')}
                </Text>
              </View>
              <View style={descriptionStyle}>
                <Icon
                  type="material-community"
                  name="map-marker"
                  color="grey"
                  size={18}
                />

                <Text style={titleStyle}>{user.location}</Text>
              </View>
              <View style={[descriptionStyle, { marginBottom: 0 }]}>
                <Icon
                  type="material-community"
                  name="briefcase"
                  color="grey"
                  size={17}
                />
                <Text style={titleStyle}>{user.occupation}</Text>
              </View>
                {currentUser.id != user.id &&
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 5,
                      bottom: 5,
                      justifyContent: 'space-between'
                    }}>
                    <TouchableOpacity onPress={this.onGoToConversation}>
                      <Icon type="font-awesome" name="send-o" color="grey" size={20} />
                    </TouchableOpacity>
                    <Icon type="font-awesome" name="gift" color="grey" size={20} />
                  </View>
                }
            </View>
          </CardSection>
          <CardSection>
            <View style={{ padding: 5 }}>
              <Text style={{ color: '#333' }}>{user.description}</Text>
            </View>
          </CardSection>
        </View>
      )
    } else {
      return <View><Text>Go</Text></View>
    }

  }
}

export { UserDescription }

const styles = StyleSheet.create({
  descriptionStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 5,
    marginBottom: 5,
    flexDirection: 'row'
  },
  titleStyle: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.themeColor.darken(0.2)
  }
})
