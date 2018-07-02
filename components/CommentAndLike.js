import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-elements'

import Colors from '../constants/Colors'

import { CardSection } from './common'

const CommentAndLike = () => {
  return (
    <CardSection
      custom={{ justifyContent: 'space-around', padding: 0 }}>
      <Button
        title="Like"
        color={Colors.buttonColor.toString()}
        fontSize={14}
        icon={{
          name: 'thumb-up',
          color: Colors.buttonColor.toString()
        }}
        buttonStyle={{
          backgroundColor: 'transparent'
        }}
        onPress={() => console.log('Liked')}
      ><Text>Like</Text></Button>

      <Button
        title="Comment"
        color={Colors.buttonColor.toString()}
        fontSize={14}
        icon={{
          name: 'comment',
          color: Colors.buttonColor.toString()
        }}
        buttonStyle={{
          backgroundColor: 'transparent'
        }}
        onPress={() => console.log('Comment')}
        ><Text>Comment</Text></Button>
    </CardSection>
  )
}

export default CommentAndLike
