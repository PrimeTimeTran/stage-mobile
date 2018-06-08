import React, { Component } from 'react'
import { Text, ScrollView, Dimensions, Button, ImageBackground } from 'react-native'
import { Card, CardSection } from './common'

let SCREEN_WIDTH = Dimensions.get('window').width

export default class Slides extends Component {
  renderLastSlide(idx) {
    if (idx === this.props.data.length - 1) {
      return (
        <Button
          raised
          title='Join'
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, idx) => {
      let image
      if (idx == 0) {
        image = require('../assets/images/0.png')
      } else if (idx == 1) {
        image = require('../assets/images/1.png')
      } else if (idx == 2) {
        image = require('../assets/images/2.png')
      }
      return (
        <ImageBackground
          source={image}
          key={slide.text}
          style={styles.slideStyle}
        >
          <Card>
            <CardSection custom={{backgroundColor: '#333333'}}>
              <Text style={styles.slideTextStyle}>
                {slide.text}
              </Text>
              {this.renderLastSlide(idx)}
            </CardSection>
          </Card>
        </ImageBackground>
      )
    })
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideTextStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15,
  }
}
