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

import axios from 'axios';

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
    console.log('This: ', this);
    console.log('Stages', this.state.stages);

    const { stages } = this.state
    const {
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
                    <CardSection>
                      <View style={headerContainerStyle}>
                      </View>
                      <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{stage.name}</Text>
                      </View>
                    </CardSection>

                    <CardSection>
                      { stage.uploads.map(upload => {
                          return <Image style={{ height: 100, width: 100 }} id={upload.id} source={{ uri: upload.url }} />
                        })
                      }
                      <Text>
                        {/* {post.body} */}
                      </Text>
                    </CardSection>
                  </Card>
                </View>
                )
              }
            )
          }
        </ScrollView>
      )
    } else {
      <div>Empty</div>
    }
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: '600'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});