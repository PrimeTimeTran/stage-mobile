import ReactNative from 'react-native'
import I18n from 'react-native-i18n'

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

// I expect language for the user to be set on line 11.
// The welcome screen still prints English though.

I18n.locale = 'en'
const getLanguage = async() => {
  const choice = await Expo.Util.getCurrentLocaleAsync()
  return choice.substr(0, 2)
}

getLanguage().then(resolve => {
  I18n.locale = resolve
  return resolve
})

console.log(I18n.t('welcome.first'))


export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0

ReactNative.I18nManager.allowRTL(isRTL)

export function strings(name, params = {}) {
  return I18n.t(name, params)
}

export default I18n