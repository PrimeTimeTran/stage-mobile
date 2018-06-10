import React from 'react'
import { Text, View } from 'react-native'

import { Icon } from 'react-native-elements'

const SentAt = ({ sentAt }) => {
  return (
    <View style={styles.headerRightStyle}>
      <Icon name="clock" type="material-community" color="#999" size={12} />
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
    fontSize: 12,
    color: '#999',
    paddingLeft: 5
  }
}
