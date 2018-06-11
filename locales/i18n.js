import ReactNative from 'react-native'
import I18n from 'react-native-i18n'

import en from './en.json'
import he from './he.json'
import vi from './vi.json'

I18n.fallbacks = true

// Define the supported translations
I18n.translations = {
  en,
  he,
  vi
}

const currentLocale = I18n.currentLocale()

// TODO Get this function to return resolve(return a not promise) so it can be used for localization.
// It does return Vietnamese when I set the language on the simulator to Vietnamese.
//
const language = async () => {
  let language = await Expo.Util.getCurrentLocaleAsync()
  console.log('Language set on simulator', language)
  return language
}

console.log('Expo.Util.getCurrentLocaleAsync() returns promise', language())
console.log('I18n currentLocal returns', I18n.currentLocale())

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL)

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params)
}

export default I18n
