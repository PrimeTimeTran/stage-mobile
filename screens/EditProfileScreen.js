import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { Icon, FormLabel, FormInput, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '../constants/Colors'
import CurrentUser from '../utils/CurrentUser'
import { t } from '../locales/i18n'
import client from '../utils/client'

import {
  Spinner
} from '../components/common'

export default class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: t('drawer.profile.title'),
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          if (navigation.state.params.profile_screen === 'Drawer') {
            navigation.navigate('App')
            navigation.openDrawer()
          } else {
            navigation.navigate('MyProfileScreen')
          }
        }}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })

  state = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    city: null,
    country: null,
    occupation: null,
    description: null,
    age: null,
    phone_number: null,
    saved: null,
    errorFirstName: null,
    errorLastName: null,
    errorEmail: null,
    errorAge: null
  }

  componentWillMount() {
    CurrentUser.get().then(currentUser => {
      const {
        id,
        first_name,
        last_name,
        email,
        city,
        country,
        occupation,
        description,
        age,
        phone_number
      } = currentUser

      this.setState({
        id,
        first_name,
        last_name,
        email,
        city,
        country,
        occupation,
        description,
        age,
        phone_number
      })
    })
  }

  onSubmit = () => {
    const {
      id,
      first_name,
      last_name,
      email,
      city,
      country,
      occupation,
      description,
      age,
      phone_number
    } = this.state

    const request = client()
    request
      .then(api => api.put(`users/${id}`, {user: {
        first_name,
        last_name,
        email,
        city,
        country,
        occupation,
        description,
        age,
        phone_number
      }}))
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setUserData(data)
      })
      .catch(error => {
        console.log('Error', error)
      })
      this.setState({ saved: true })
      setInterval(() => this.setState({ saved: false }), 2000)
  }

  setUserData(data) {
    CurrentUser.put({
      _id: 'current_user',
      data: data
    })
    .then(response => {
      console.log('Response from CurrentUser', response);
    })
  }

  onChangeFirstName = e => {
    if (!/[^a-zA-Za-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫A-EGHIK-VXYÂĐỔÔÚỨ]/.test(e)) {
      this.setState({ first_name: e, errorFirstName: null })
    } else {
      this.setState({ errorFirstName: 'First name can only contain letters' })
    }
  }

  onChangeLastName = e => {
    if (!/[^a-zA-Za-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫A-EGHIK-VXYÂĐỔÔÚỨ]/.test(e)) {
      this.setState({ last_name: e, errorLastName: null })
    } else {
      this.setState({ errorLastName: 'Last name can only contain letters' })
    }
  }

  onChangeEmail = e => {
    if (e.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ email: e, errorEmail: null })
    } else {
      this.setState({ errorEmail: 'Invalid Email' })
    }
  }

  onChangeAge = e => {
    if (/^\d+$/.test(e)) {
      this.setState({ age: e, errorAge: null })
    } else {
      this.setState({ errorEmail: 'Invalid Age' })
    }
  }

  render() {
    const {
      id,
      first_name,
      last_name,
      email,
      city,
      country,
      occupation,
      description,
      age,
      phone_number,
      saved,
      errorFirstName,
      errorLastName,
      errorEmail
    } = this.state

    const {
      labelStyle,
      errorStyle
    } = styles

    if (id) {
      return (
        <View>
          <KeyboardAwareScrollView>
            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.first_name')}</FormLabel>
            <FormInput name="first_name" placeholder="James" value={first_name} onChangeText={this.onChangeFirstName} />
            <Text style={errorStyle}>{errorFirstName}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.last_name')}</FormLabel>
            <FormInput name="last_name" placeholder="Huynh" value={last_name} onChangeText={this.onChangeLastName} />
            <Text style={errorStyle}>{errorLastName}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.email')}</FormLabel>
            <FormInput name="email" placeholder="james@gmail.com" value={email} onChangeText={this.onChangeEmail} />
            <Text style={errorStyle}>{errorEmail}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.city')}</FormLabel>
            <FormInput name="city" placeholder="Ho Chi Minh City" value={city} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.country')}</FormLabel>
            <FormInput name="country" placeholder="Vietnam" value={country} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.occupation')}</FormLabel>
            <FormInput name="occupation" placeholder="Chief Technical Officer" value={occupation} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.description')}</FormLabel>
            <FormInput name="description" placeholder="I love coding!" value={description} onChangeText={this.onChangeAge} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.age')}</FormLabel>
            <FormInput name="age" placeholder="18" value={age.toString()} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.profile.phone_number')}</FormLabel>
            <FormInput name="phone_number" placeholder="0964359305" value={phone_number} />

            <Button
              title={saved ? 'Saved' : 'Update'}
              backgroundColor={saved ? Colors.buttonColor.toString() : 'red'}
              onPress={this.onSubmit}
              icon={{
                name: saved ? 'check-circle' : 'update',
                type: saved ? 'feather' : 'material-icons'
              }}>
              <Text>{saved ? 'Saved' : 'Update'}</Text>
            </Button>

          </KeyboardAwareScrollView>
        </View>
      )
    } else {
      return <Spinner />
    }
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.themeColor
  },
  errorStyle: {
    color: 'red',
    alignSelf: 'center'
  }
})
