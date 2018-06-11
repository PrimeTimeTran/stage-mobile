import ReactNative from 'react-native'
import I18n from 'ex-react-native-i18n'

import en from './en.json'
import he from './he.json'
import vi from './vi.json'

I18n.fallbacks = true

I18n.translations = {
  en,
  he,
  vi
}

const currentLocale = I18n.currentLocale()

I18n.locale = 'en'

const getLanguage = async () => {
  try {
    const choice = await Expo.Utils.getCurrentLocaleAsync()
    I18n.locale = choice.substr(0, 2)
    I18n.initAsync()
  } catch (error) {
    console.log('Unable to get current locale')
  }
}
getLanguage()

export const isRTL =
  currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0

ReactNative.I18nManager.allowRTL(isRTL)

export function t(name, params = {}) {
  return I18n.t(name, params)
}

export default I18n