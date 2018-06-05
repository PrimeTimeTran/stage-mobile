import React, { Component } from 'react'
import {  View, Text, } from 'react-native'

import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

export default class CommentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.comments
    }
  }

  handleAddComment = (body) => {
    this.setState([ ...this.state.comments, body])
  }

  render() {
    const { comments } = this.state
    return (
      <View>
        { comments && <View> {comments.map(comment => <Comment comment={comment}/>)}</View> }
        <CommentForm onSubmit={this.handleAddComment}/>
      </View>
    )
  }
}
