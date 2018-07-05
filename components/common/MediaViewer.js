import React from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import VideoPlayer from '../VideoPlayer'
import {
  Avatar
} from './index'

const { width, height } = Dimensions.get('window')

class MediaViewer extends React.Component {
  showUploads(obj, upload, index) {
    return (
      <Carousel
        currentPage={index}
        autoplay={false}
        style={{
          flex: 1,
          width,
          height
        }}>
        {obj.uploads.map(upload => {
          return (
            <View style={{ flex: 1 }} key={upload.id}>
              { upload.media_type == 'vid' ?
                  <VideoPlayer
                    isLooping
                    video={upload.url}
                    fullScreen={true}
                    style={{ flex: 1, width, height }}
                  />
              :
                  <Image
                    style={{ flex: 1, resizeMode: 'cover' }}
                    key={upload.id}
                    source={{ uri: upload.url }}
                  />
              }
              <View
                style={{
                  position: 'absolute',
                  height: 40,
                  top: 10,
                  left: 10,
                  right: 5
                }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                  <Avatar
                    url={upload.user_avatar_url}
                    custom={styles.avatarStyle}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 25,
                      paddingLeft: 10
                    }}>
                    {upload.user_name}
                  </Text>
                </View>
              </View>
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
    const {
      object
    } = this.props

    return (
      <View style={{ flexDirection: 'row' }}>
        {object.uploads.map((upload, index) => {
          return (
            <Lightbox
              key={upload.id}
              swipeToDismiss={false}
              renderContent={() =>
                this.showUploads(
                  object,
                  upload,
                  index
                )
              }>
              <View style={{ flex: 1, marginRight: 5, marginTop: 10 }}>
                { upload.media_type == 'vid' ?
                    <VideoPlayer
                      isLooping
                      video={upload.url}
                    />
                :
                    <Image
                      style={{
                        height: 90,
                        width: 90,
                        // borderRadius: 5
                      }}
                      source={{ uri: upload.url }}
                    />
                }
                <View
                  style={{
                    backgroundColor: '#000000aa',
                    position: 'absolute',
                    height: 32,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      fontWeight: 'bold'
                    }}>
                    {Math.floor(
                      Math.random() * Math.floor(200)
                    )}{' '}
                    likes
                  </Text>
                </View>
              </View>
            </Lightbox>
          )
        })}
      </View>
    )
  }
}

export { MediaViewer }

const styles = StyleSheet.create({
  avatarStyle: {
    marginLeft: 5,
    marginTop: 5,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    paddingRight: 10
  }
})
