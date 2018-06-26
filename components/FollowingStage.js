import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements'

export default class FollowingStage extends Component {
  state = {
    following: this.props.following
  }

  toggleFollowing() {
    this.setState({ following: !this.state.following })
  }

  follow = stageId => {
    this.toggleFollowing()
    this.props.follow(stageId)
  }

  unFollow = stageId => {
    this.toggleFollowing()
    this.props.unFollow(stageId)
  }

  render() {
    const { stageId } = this.props

    if (this.state.following) {
      return (
        <TouchableOpacity onPress={() => this.follow(stageId)}>
          <Icon name="heart" type="font-awesome" color="red" />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.unFollow(stageId)}>
          <Icon name="heart" type="evilicon" color="white" />
        </TouchableOpacity>
        )
    }
  }
}
