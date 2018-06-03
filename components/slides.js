import React, { Component } from 'react';
import {  View, Text, ScrollView, Dimensions, Button } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  renderLastSlide(idx) {
    if (idx === this.props.data.length - 1) {
      return (
        <Button
          raised
          title='Onwards!'
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, idx) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, {backgroundColor: slide.color}]}

        >
          <Text style={styles.slideTextStyle}>{slide.text}</Text>
          {this.renderLastSlide(idx)}
        </View>
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
    );
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
