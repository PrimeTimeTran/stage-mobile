import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import Lightbox from 'react-native-lightbox';

import { API_ROOT } from '../constants/ApiConfig';
import { Card, CardSection } from '../components/common';

import client from '../utils/client';

export default class StagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Stages',
  };
  state = { stages: [] }

  componentWillMount() {
    const request = client();
    request.then(api => api.get(`${API_ROOT}stages`)).then(response => {
      return response.data
    }).then(data => {
      this.setState({ stages: data })
    }).catch(error => {
      console.log('Error:', error)
    })
  }

  render() {
    const { stages } = this.state
    const {
      cardHeaderStyle,
      headerContainerStyle,
      headerTextStyle,
      thumbnailStyle
     } = styles;

    if (stages) {
      return (
        <ScrollView>
          { stages && stages.map(stage => {
              return (
                <View key={stage.id}>
                  <Card>
                    <CardSection styling={cardHeaderStyle}>
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{stage.name}</Text>
                      </View>
                    </CardSection>

                    <CardSection>
                      { stage.uploads.map(upload => {
                          return <Image key={upload.id} style={{ height: 100, width: 100 }} source={{ uri: upload.url }} />
                        })
                      }
                    </CardSection>
                  </Card>
                </View>
                )
              }
          ) }
        </ScrollView>
      )
    } else {
      <div>Empty</div>
    }
  }
}

const styles = StyleSheet.create({
  cardHeaderStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingLeft: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    backgroundColor: '#333333',
    position: 'relative'
  },
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});