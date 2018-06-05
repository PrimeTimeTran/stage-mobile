import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native'

import { Icon } from 'react-native-elements'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

import { API_ROOT } from '../constants/ApiConfig'
import { Card, CardSection } from '../components/common'

import client from '../utils/client'

const { width } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (`${navigation.state.params.user_id}` || 'Profile'),
    headerStyle: {
      backgroundColor: '#333333',
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('Settings')}
        backgroundColor='#0076FF'
        color='blue'
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height: 300 },
      user: {}
    };
  }

  componentWillMount() {
    const user_id = this.props.navigation.state.params.user_id || 1
    const request = client();
    request
      .then(api =>
        api.get(`${API_ROOT}users/${user_id}`))
      .then(response => {
        return response.data
      })
      .then(data => {
        console.log('Data: ', data);
        this.setState({user: data}, console.log('User: ', this.state.user))
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  }

  render() {
    const { descriptionStyle } = styles
    const { size } = this.state
    console.log('This State: ', this.state);
    return (
      <ScrollView>
          <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
            <Carousel
              autoplay={false}
              style={size}
              pageInfo
              onAnimateNextPage={(p) => console.log(p)}
            >
              <View style={[{ backgroundColor: '#BADA55' }, size]}><Text>1</Text></View>
              <View style={[{ backgroundColor: 'red' }, size]}><Text>2</Text></View>
              <View style={[{ backgroundColor: 'blue' }, size]}><Text>3</Text></View>
            </Carousel>
          </View>
          <View>
              <CardSection>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={descriptionStyle}>
                    <Icon name='users' type='font-awesome' color='green' size={10}/>
                    <Icon name='place' color='black' size={15}/>
                    <Icon name='mobile' type='font-awesome' color='black' size={17}/>
                  </View>
                  <View style={descriptionStyle}>
                    <Text>Name</Text>
                    <Text>Location</Text>
                    <Text>Occupation</Text>
                  </View>
                </View>
              </CardSection>
          </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  descriptionStyle: {
    justifyContent: 'space-between',
    paddingLeft: 5
  }
})
