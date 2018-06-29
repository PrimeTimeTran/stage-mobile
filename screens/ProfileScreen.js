import React from 'react'
import { ScrollView, Dimensions } from 'react-native'

import Colors from '../constants/Colors'
import { API_ROOT } from '../constants/ApiConfig'
import client from '../utils/client'

import { UserProfilePhotos, UserDescription, Spinner } from '../components/common'

const { height } = Dimensions.get('window')

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerTitle:
      navigation.state.params.name || navigation.state.params.first_name,
    headerStyle: { backgroundColor: Colors.themeColor }
  })

  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    const user_id = this.props.navigation.state.params.user_id
    const request = client()
    request
      .then(api => api.get(`${API_ROOT}users/${user_id}`))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({ user: data })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  render() {
    const { user } = this.state
    const { containerStyle } = styles
    if (user) {
      return (
        <ScrollView style={containerStyle}>
          <UserProfilePhotos user={user} />
          <UserDescription user={user}/>
        </ScrollView>
      )
    } else {
      return <Spinner />
    }
  }
}

const styles = {
  containerStyle: {
    minHeight: height,
    backgroundColor: 'white'
  }
}