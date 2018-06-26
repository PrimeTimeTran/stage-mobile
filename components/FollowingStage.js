import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

export default class FollowingStage extends Component {
  state = {
    following: this.props.following
  }

  toggleFollowing() {
    this.setState({ following: !this.state.following })
  }

  follow = stageId => {
    const { stage, follow, navigation } = this.props

    this.toggleFollowing()
    follow(stageId)

    navigation.navigate('Conversation', {
      conversation_id: stage.conversation_id,
      stages: true,
      conversation_name: stage.name
    })
  }

  unFollow = stageId => {
    this.toggleFollowing()
    this.props.unFollow(stageId)
  }

  render() {
    const { stageId } = this.props

    if (this.state.following) {
      return (
        <TouchableOpacity
          onPress={() => this.unFollow(stageId)}>
          <Icon
            name="heart"
            type="font-awesome"
            color="red"
          />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.follow(stageId)}>
          <Icon
            name="heart"
            type="evilicon"
            color="white"
          />
        </TouchableOpacity>
        )
    }
  }
}
