import React, { Component } from 'react'
import { View } from 'react-native'

import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

import client from '../utils/client'

export default class CommentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.comments
    }
  }

  onAddComment = body => {
    const { postId } = this.props
    client()
      .then(api =>
        api.post(`posts/${postId}/comments`, {
          body: body,
          commentable_type: 'Post',
          commentable_id: postId
        })
      )
      .then(response => {
        return response.data
      })
      .then(data => {
        let newArray = this.state.comments.slice()
        newArray.push(data)
        this.setState({ comments: newArray })
      })
      .catch(error => {
        console.log('Error', error)
      })
  }

  render() {
    const { comments } = this.state
    return (
      <View>
        {comments && comments.map(comment => <Comment key={comment.id} comment={comment} onNavigateProfile={this.props.onNavigateProfile} />)}
        <CommentForm onSubmit={this.onAddComment} />
      </View>
    )
  }
}
