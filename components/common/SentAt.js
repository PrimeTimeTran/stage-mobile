import React from 'react'
import {
  Text,
  View
} from 'react-native'

import { Icon } from 'react-native-elements'

const SentAt = ({ sentAt }) => {
  return (
    <View style={styles.headerRightStyle}>
      <Icon name='clock' type='material-community' color='black' size={10} />
      <Text style={styles.textStyle}>{sentAt}</Text>
    </View>
  )
}

export { SentAt }

const styles = {
  headerRightStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  textStyle: {
    fontSize: 10,
    paddingLeft: 5
  }
}
