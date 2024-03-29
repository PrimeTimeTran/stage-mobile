import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import { Video } from 'expo'

import { t } from '../locales/i18n'
import client from '../utils/client'
import CurrentUser from '../utils/CurrentUser'
import Colors from '../constants/Colors'

import {
  Avatar,
  Card,
  CardSection,
  SentAt,
  Spinner,
  Socials
} from '../components/common'
import CommentContainer from '../containers/CommentContainer'
import PostForm from '../components/PostForm'
import VideoPlayer from '../components/VideoPlayer'
import CommentAndLike from '../components/CommentAndLike'

const { width, height } = Dimensions.get('window')

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: t('tab.newsfeed'),
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

  state = {
    posts: null,
    currentUser: null
  }

  componentDidMount() {
    CurrentUser.get().then(currentUser => {
      this.setState({ currentUser })
    })
  }

  componentWillMount() {
    client()
      .then(api => api.get('posts'))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ posts: data })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  showUploads(post, upload, index) {
    return (
      <Carousel
        currentPage={index}
        autoplay={false}
        style={{
          flex: 1,
          width,
          height
        }}>
        {post.uploads.map(upload => {
          return (
            <View style={{ flex: 1 }} key={upload.id}>
              <Video key={upload.id} source={{ uri: upload.url }} />
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

  onNavigateProfile = user => {
    const { id } = user
    CurrentUser.get().then(currentUser => {
      if (currentUser.id == id) {
        this.props.navigation.navigate('MyProfile')
      } else {
        this.props.navigation.navigate('Profile', {
          user_id: id,
          first_name: user.first_name
        })
      }
    })
  }

  onCreatePost = body => {
    client()
      .then(api => api.post('posts', { body: body }))
      .then(response => {
        return response.data
      })
      .then(data => {
        let newArray = this.state.posts.slice()
        newArray.unshift(data)
        this.setState({ posts: newArray })
      })
      .catch(error => {
        console.log('Error', error)
      })
  }

  render() {
    const { posts, currentUser } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      avatarStyle,
      postHeaderStyle,
      timeContainerStyle,
      postBodyStyle
    } = styles

    if (posts) {
      return (
        <ScrollView scrollEventThrottle={5}>
          <PostForm onSubmit={this.onCreatePost} name={currentUser.first_name}/>
          {posts &&
            posts.map(post => {
              const {
                id,
                user,
                reactions,
                reactions_count,
                comments_count,
              } = post
              return (
                <View key={id}>
                  <Card>
                    <CardSection custom={{ borderBottomWidth: 0 }}>
                      <View style={headerContainerStyle}>
                        <TouchableOpacity onPress={() =>
                            this.onNavigateProfile(user)}>
                          <Avatar custom={avatarStyle} url={user.avatar_url} />
                        </TouchableOpacity>
                      </View>
                      <View style={postHeaderStyle}>
                        <Text style={headerTextStyle}>
                          {user.full_name}
                        </Text>
                        <View style={timeContainerStyle}>
                          <SentAt sentAt={post.created_at} />
                        </View>
                      </View>
                    </CardSection>
                    <CardSection custom={postBodyStyle}>
                      <Text numberOfLines={5} style={{ fontSize: 13 }}>
                        {post.body}
                      </Text>
                    </CardSection>
                    {post.uploads &&
                      post.uploads.map((upload, index) => {
                        {
                          if (upload.media_type == 'vid') {
                            return (
                              <CardSection key={upload.id}>
                                <Lightbox
                                  swipeToDismiss={false}
                                  renderContent={() =>
                                    this.showUploads(post, upload, index)
                                  }>
                                  <VideoPlayer video={upload.url} />
                                </Lightbox>
                              </CardSection>
                            )
                          }
                        }
                      })}

                    <Socials
                      reactions_count={reactions_count}
                      comments_count={comments_count}
                      reactions={reactions}
                    />
                    <CommentAndLike />
                    <CommentContainer
                      comments={post.comments}
                      postId={id}
                      onNavigateProfile={this.onNavigateProfile}
                    />
                  </Card>
                </View>
              )
            })}
        </ScrollView>
      )
    } else {
      return <Spinner />
    }
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '600',
    color: '#333333',
    paddingLeft: 5
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  postHeaderStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingRight: 5
  },
  postBodyStyle: {
    borderBottomWidth: 0,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 0,
    paddingTop: 0
  }
})
