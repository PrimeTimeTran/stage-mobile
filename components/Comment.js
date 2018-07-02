import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Colors from '../constants/Colors'
import { Avatar, CardSection } from './common'

export default class Comment extends Component {
  onGoToProfile = user => this.props.onNavigateProfile(user)

  render() {
    const {
      id,
      user,
      body
    } = this.props.comment

    const {
      commentContainerStyle,
      avatarStyle,
      textContainerStyle,
      userNameStyle,
      commentBodyStyle
    } = styles

    return (
      <CardSection
          id={id}
          custom={commentContainerStyle}
        >
        <View>
          <TouchableOpacity onPress={() =>
              this.onGoToProfile(user)
            }>
            <Avatar
              url={user.user_profile_photo}
              custom={avatarStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={textContainerStyle}>
          <TouchableOpacity onPress={() =>
              this.onGoToProfile(user)
            }>
            <Text style={userNameStyle}>
              {user.full_name}
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={commentBodyStyle}>
              {body}
            </Text>
          </View>
        </View>
      </CardSection>
    )
  }
}

const styles = StyleSheet.create({
  commentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  avatarStyle: {
    marginLeft: 5,
    marginTop: 5,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20
  },
  textContainerStyle: {
    padding: 5,
    marginRight: 20
  },
  userNameStyle: {
    color: Colors.commentorColor
  },
  commentBodyStyle: {
    marginRight: 10,
    marginTop: 5
  }
})
