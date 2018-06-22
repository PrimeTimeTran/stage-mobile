import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation'

import { t } from '../locales/i18n'

import TabBarIcon from '../components/TabBarIcon'
import { Drawer } from '../components/common'
import EditProfileScreen from '../screens/EditProfileScreen'

import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'

import ConversationsScreen from '../screens/ConversationsScreen'
import ConversationScreen from '../screens/ConversationScreen'
import SearchConversationsScreen from '../screens/SearchConversationsScreen'

import NewsFeedScreen from '../screens/NewsFeedScreen'
import UsersScreen from '../screens/UsersScreen'

import StagesScreen from '../screens/StagesScreen'
import StageScreen from '../screens/StageScreen'

import ProfileScreen from '../screens/ProfileScreen'
import MyProfileScreen from '../screens/MyProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'

import Colors from '../constants/Colors'
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

let ConversationsTransitionConfiguration = () => {
  return {
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps
      const { index, route } = scene
      const params = route.params || {}
      let transition = params.transition || 'default'
      const last = sceneProps.scenes[sceneProps.scenes.length - 1];

      if (last.route.routeName === 'SearchConversations') {
        return CardStackStyleInterpolator.forFade(sceneProps);
      }

      return CardStackStyleInterpolator.forHorizontal(sceneProps)
    }
  }
}

const ConversationsStack = createStackNavigator(
  {
    Conversations: {
      screen: ConversationsScreen,
      navigationOptions: {
        title: 'Messages'
      }
    },
    SearchConversations: SearchConversationsScreen,
    Conversation: ConversationScreen,
    Users: UsersScreen,
    Profile: ProfileScreen
  },
  {
    transitionConfig: ConversationsTransitionConfiguration,
    cardStyle: {
      backgroundColor: 'transparent'
    }
  }
)

ConversationsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>{t('tab.messages')}</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="message-processing" />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const NewsFeedStack = createStackNavigator({
  Home: NewsFeedScreen,
  Profile: ProfileScreen,
  MyProfile: MyProfileScreen
})

NewsFeedStack.navigationOptions = {
  tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>{t('tab.newsfeed')}</Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      active={focused}
      style={{ color: '#000' }}
      name="newspaper"
    />
  )
}

const StagesStack = createStackNavigator({
  Stages: StagesScreen,
  Stage: StageScreen,
  Conversation: ConversationScreen,
  Profile: ProfileScreen
})

StagesStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>{t('tab.stages')}</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="stadium" />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const ProfileStack = createStackNavigator({
  MyProfileScreen: MyProfileScreen,
  EditMyProfile: EditProfileScreen
})

ProfileStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>{t('tab.profile')}</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={'account-box'} />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const MainTabScreen = createBottomTabNavigator(
  {
    ConversationsStack,
    NewsFeedStack,
    StagesStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#ffffff99',
      style: {
        backgroundColor: Colors.themeColor,
        borderTopWidth: 1,
        borderTopColor: 'white',
        padding: 5
      }
    }
  }
)

const MainDrawerNavigation = createBottomTabNavigator(
  {
    Welcome: WelcomeScreen,
    Auth: AuthScreen,
    Main: MainTabScreen
  },
  {
    lazy: true,
    navigationOptions: { tabBarVisible: false }
  }
)

const EditProfileStack = createStackNavigator({
  EditProfile: EditProfileScreen
})

const ApplicationDrawer = createDrawerNavigator(
  {
    App: MainDrawerNavigation,
    Edit: EditProfileStack
  },
  {
    contentComponent: props => {
      return <Drawer {...props} />
    }
  }
)

ApplicationDrawer.navigationOptions = ({ navigation }) => {
  return {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => <Text>Go</Text>
  }
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 0,
    fontSize: 12
  }
})

export default ApplicationDrawer
