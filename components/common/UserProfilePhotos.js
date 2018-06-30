import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import Carousel from 'react-native-looped-carousel'

const { width } = Dimensions.get('window')
const defaultImage =
  'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'

class UserProfilePhotos extends Component {
  render() {
    const { user } = this.props
    const {
      size,
      photoStyle
    } = styles

    if (user && user.uploads && user.uploads.length > 0) {
      if (user.uploads.length === 1 ) {
        return (
          <Image
            style={photoStyle}
            source={{ uri: user.uploads[0].url }}
          />
        )
      } else {
        return (
          <Carousel
            autoplay={false}
            style={size}
            onAnimateNextPage={p => console.log(p)}>
            {user.uploads.map(upload => {
              return (
                <Image
                  key={upload.id}
                  style={photoStyle}
                  source={{ uri: upload.url }}
                />
              )
            })}
          </Carousel>
        )
      }
    } else {
      return <Image style={size} source={{ uri: defaultImage }} />
    }
  }
}

export { UserProfilePhotos }

const styles = {
  size: {
    width,
    height: 300
  },
  photoStyle: {
    width,
    height: 300,
    resizeMode: 'cover'
  }
}