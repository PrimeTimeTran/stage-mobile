import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CardSection } from './CardSection'

import Colors from '../../constants/Colors'

import SocialIcon from './SocialIcon'

class Socials extends Component {
  render() {
    const {
      reactions,
      reactions_count,
      comments_count
    } = this.props

    const {
      containerStyle,
      socialTextStyle
    } = styles

    const like = reactions.filter(reaction => reaction.reaction_type == 'like')
    const heart = reactions.filter(reaction => reaction.reaction_type == 'heart')
    const wow = reactions.filter(reaction => reaction.reaction_type == 'wow')
    const laugh = reactions.filter(reaction => reaction.reaction_type == 'laugh')
    const sad = reactions.filter(reaction => reaction.reaction_type == 'sad')

    return (
      <CardSection>
        <View style={containerStyle}>
          {reactions_count > 0 && (
            <View>
              <View style={{ flexDirection: 'row' }}>
                { like.length && <SocialIcon type="evilicon" name="like" color="blue" size={20} /> }
                { heart.length && <SocialIcon type="evilicon" name="heart" color="red" size={20} /> }
                { wow.length && <SocialIcon type="entypo" name="emoji-happy" color="yellow" size={15} /> }
                { laugh.length && <SocialIcon type="entypo" name="emoji-flirt" color="pink" size={15} /> }
                { sad.length && <SocialIcon type="entypo" name="emoji-sad" color="green" size={15} /> }
                <Text style={[socialTextStyle, { marginLeft: 5 }]}>
                  { reactions_count == 1 && <Text>{reactions_count} Reaction</Text> }
                  { reactions_count >= 2 && <Text>{reactions_count} Reactions</Text> }
                </Text>
              </View>
            </View>
          )}
          {comments_count > 0 && (
            <Text style={socialTextStyle}>
              { comments_count == 1 && <Text>{comments_count} Comment</Text> }
              { comments_count >= 2 && <Text>{comments_count} Comments</Text> }
            </Text>
          )}
        </View>
      </CardSection>
    )
  }
}

export { Socials }

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  socialTextStyle: {
    paddingRight: 10,
    color: Colors.lightTextColor
  }
}