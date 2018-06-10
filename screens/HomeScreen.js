import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'

import { Button, Icon } from 'react-native-elements'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import { Video } from 'expo'
import Colors from '../constants/Colors'
import PostForm from '../components/PostForm'
import { Avatar, Card, CardSection, SentAt, Socials } from '../components/common'
import VideoPlayer from '../components/VideoPlayer'
import CommentContainer from '../containers/CommentContainer'

import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'
import CurrentUser from '../utils/CurrentUser'

const { WINDOW_WIDTH, WINDOW_HEIGHT } = Dimensions.get('window')

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerTitleStyle: {color: 'white'},
    headerStyle: { backgroundColor: Colors.themeColor },
    headerBackTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerLeft: (
      <View style={{paddingLeft: 10}}>
        <Icon
          type="entypo"
          name="menu"
          color="white"
          onPress={() => navigation.openDrawer()}/>
      </View>
    )
  })

  state = { posts: [] }

  componentWillMount() {
    const request = client()
    request
      .then(api => api.get(`${API_ROOT}posts`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({posts: data})
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
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT
        }}>
        {post.uploads.map(upload => {
          return (
            <View style={{flex: 1}} key={upload.id}>
              <Video
                key={upload.id}
                source={{uri: upload.url}}
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

   navigateProfile = async (user) => {
    const { id } = user
    const currentUser = await CurrentUser()

    if (parseInt(currentUser) === id) {
      this.props.navigation.navigate('MyProfile')
    } else {
      this.props.navigation.navigate('Profile', {
        user_id: id,
        first_name: user.first_name
      })

    }
  }

  onAddPost = (body) => {
    const request = client()
    request
      .then(api =>
        api.post(`${API_ROOT}posts/`, {body: body, }))
      .then(response => {
        return response.data
      })
      .then(data => {
        let newArray = this.state.posts.slice()
        newArray.unshift(data)
        this.setState({posts: newArray})
      })
      .catch(error => {
        console.log('Error', error)
      })
  }

  render() {
    const { posts } = this.state
    const {
      headerContainerStyle,
      headerTextStyle,
      avatarStyle
    } = styles

    return (
      <ScrollView scrollEventThrottle={5}>
        <PostForm onSubmit={this.onAddPost}/>
        { posts && posts.map(post => {
          console.log('Post ', post);
            const { id, user, reactions_count, comments_count } = post
            return (
              <View key={id}>
                <Card>
                  <CardSection custom={{borderBottomWidth: 0}}>
                    <View style={headerContainerStyle}>
                      <TouchableOpacity onPress={() => this.navigateProfile(user)}>
                        <Avatar custom={avatarStyle} url={user.avatar_url} />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={headerTextStyle}>{user.full_name}</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                        <SentAt sentAt={post.created_at} />
                      </View>
                    </View>
                  </CardSection>
                  <CardSection custom={{borderBottomWidth: 0, padding: 10}}>
                    <Text numberOfLines={5} style={{fontSize: 13}}>{post.body}</Text>
                  </CardSection>
                    { post.uploads && post.uploads.map((upload, index) => {
                      { if (upload.media_type == 'vid') {
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
                      }}})
                    }
                    <Socials reactions_count={reactions_count} comments_count={comments_count} />
                    <CardSection custom={{justifyContent: 'space-around'}}>
                      <Button
                        title="Like"
                        color={Colors.themeColor.toString()}
                        icon={{ type:"evilicon", name: 'like', color: Colors.themeColor.toString() }}
                        buttonStyle={{ backgroundColor: 'white' }}
                        onPress={() => console.log("Liked")}
                      >
                        <Text>Like</Text>
                      </Button>
                      <Button
                        title="Comment"
                        color={Colors.themeColor.toString()}
                        icon={{ type:"evilicon", name: 'comment', color: Colors.themeColor.toString() }}
                        buttonStyle={{ backgroundColor: 'white' }}
                        backgroundColor="none"
                      >
                        <Text>Comment</Text>
                      </Button>
                    </CardSection>
                    <CommentContainer comments={post.comments} postId={id}/>
                </Card>
              </View>
              )
            }
          )
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    paddingLeft: 5
  },
  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
})
