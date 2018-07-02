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
    const { following } = this.state

    return (
      <TouchableOpacity
        onPress={following ? () => this.unFollow(stageId) : () => this.follow(stageId)}>
        <Icon
          name="heart"
          type={following ? 'font-awesome' : 'evilicon'}
          color={following ? 'red' : 'white'}
        />
      </TouchableOpacity>
    )
  }
}
