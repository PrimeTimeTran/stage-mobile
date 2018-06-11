import Color from 'color'

const tintColor = '#2f95dc'
const themeColor = Color('#f3a40b')

export default {
  tintColor,
  tabIconDefault: '#ffffff99',
  tabIconSelected: '#fff',
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  activeStageColor: themeColor.darken(0.05),
  commentorColor: themeColor.darken(0.05),
  buttonColor: themeColor.darken(0.1),
  themeColor: themeColor,
  navigationHeaderBackgroundColor: themeColor
}
