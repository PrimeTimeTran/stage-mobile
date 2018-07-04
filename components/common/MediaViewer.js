import React from 'react'
import {
  Text,
  View,
  Dimensions,
  Image
} from 'react-native'

import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import VideoPlayer from '../VideoPlayer'

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
                <View style={{ flex: 1 }}>
                  { upload.media_type == 'vid' ?
                      <VideoPlayer
                        isLooping
                        video={upload.url}
                      />
                  :
                      <Image
                        style={{
                          height: 100,
                          width: 100
                          // borderRadius: 5
                        }}
                        source={{ uri: upload.url }}
                      />
                  }
                  <Text
                    style={{
                      color: '#fff',
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      fontWeight: 'bold',
                      fontSize: 10
                    }}>
                    {Math.floor(
                      Math.random() * Math.floor(200)
                    )}{' '}
                    likes
                  </Text>
                </View>
              </Lightbox>
            )
          })}
      </View>
    )
  }
}

export { MediaViewer }