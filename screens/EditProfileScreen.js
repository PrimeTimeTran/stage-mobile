import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { Icon, FormLabel, FormInput } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '../constants/Colors'
import CurrentUser from '../utils/CurrentUser'
import { t } from '../locales/i18n'

export default class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerTitleStyle: { color: 'white' },
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate('Conversations')}>
        <Icon name="chevron-left" type="entypo" color="white" size={26} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.navigationHeaderBackgroundColor },
    headerBackTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  })

  state = {
    first_name: null,
    errorFirstName: null,
    last_name: null,
    errorLastName: null,
    email: null,
    errorEmail: null,
    city: null,
    country: null,
    occupation: null,
    description: null,
    age: null,
    phone_number: null
  }

  componentWillMount() {
    CurrentUser.get().then(currentUser => {
      const {
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

  onChangeFirstName = e => {
    if (!/[^a-zA-Za-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫A-EGHIK-VXYÂĐỔÔÚỨ]/.test(e)) {
      this.setState({ first_name: e })
      this.setState({ errorFirstName: null })
    } else {
      this.setState({ errorFirstName: 'First name can only contain letters' })
    }
  }

  onChangeLastName = e => {
    if (!/[^a-zA-Za-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫A-EGHIK-VXYÂĐỔÔÚỨ]/.test(e)) {
      this.setState({ last_name: e })
      this.setState({ errorLastName: null })
    } else {
      this.setState({ errorLastName: 'Last name can only contain letters' })
    }
  }

  onChangeEmail = e => {
    if (e.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ email: e })
      this.setState({ errorEmail: null })
    } else {
      this.setState({ errorEmail: 'Invalid Email'})
    }
  }

  render() {
    const {
      first_name,
      errorFirstName,
      last_name,
      errorLastName,
      email,
      errorEmail,
      city,
      country,
      occupation,
      description,
      age,
      phone_number
    } = this.state

    const {
      labelStyle,
      errorStyle
    } = styles

    if (first_name) {
      return (
        <View>
          <KeyboardAwareScrollView>
            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.first_name')}</FormLabel>
            <FormInput name="first_name" placeholder="James" value={first_name} onChangeText={this.onChangeFirstName} />
            <Text style={errorStyle}>{errorFirstName}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.last_name')}</FormLabel>
            <FormInput name="last_name" placeholder="Huynh" value={last_name} onChangeText={this.onChangeLastName} />
            <Text style={errorStyle}>{errorLastName}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.email')}</FormLabel>
            <FormInput name="email" placeholder="james@gmail.com" value={email} onChangeText={this.onChangeEmail} />
            <Text style={errorStyle}>{errorEmail}</Text>

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.city')}</FormLabel>
            <FormInput name="city" placeholder="Ho Chi Minh City" value={city} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.country')}</FormLabel>
            <FormInput name="country" placeholder="Vietnam" value={country} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.occupation')}</FormLabel>
            <FormInput name="occupation" placeholder="Chief Technical Officer" value={occupation} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.description')}</FormLabel>
            <FormInput name="description" placeholder="I love coding!" value={description} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.age')}</FormLabel>
            <FormInput name="age" placeholder="18" value={age.toString()} />

            <FormLabel labelStyle={labelStyle}>{t('drawer.editprofile.phone_number')}</FormLabel>
            <FormInput name="phone_number" placeholder="0964359305" value={phone_number} />
          </KeyboardAwareScrollView>
        </View>
      )
    } else {
      return (
        <Text>Loading</Text>
      )
    }
  }
}

const styles = {
  labelStyle: {
    color: Colors.themeColor
  },
  errorStyle: {
    color: 'red',
    alignSelf: 'center'
  }
}