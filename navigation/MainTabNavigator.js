import React from 'react'
import { Platform, Text, StyleSheet } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import { Drawer } from '../components/common'
import EditProfileScreen from '../screens/EditProfileScreen'

import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'

import ConversationsScreen from '../screens/ConversationsScreen'
import ConversationScreen from '../screens/ConversationScreen'

import HomeScreen from '../screens/HomeScreen'
import UsersScreen from '../screens/UsersScreen'

import StagesScreen from '../screens/StagesScreen'
import StageScreen from '../screens/StageScreen'

import ProfileScreen from '../screens/ProfileScreen'
import MyProfileScreen from '../screens/MyProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'

import Colors from '../constants/Colors'

const ConversationsStack = createStackNavigator({
  Conversations: ConversationsScreen,
  Conversation: ConversationScreen,
  Users: UsersScreen,
  Profile: ProfileScreen
})

ConversationsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>Messages</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="message-processing" />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  MyProfile: MyProfileScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>Newsfeed</Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      active={focused}
      style={{ color: '#000' }}
      name='newspaper'
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
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>Stages</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='stadium'
      />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const ProfileStack = createStackNavigator({
  MyProfileScreen: MyProfileScreen,
  Settings: SettingsScreen
})

ProfileStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: () => <Text style={styles.tabBarLabelStyle}>Profile</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={'account-box'}
      />
    ),
    tabBarVisible: navigation.state.index == 0 ? true : false
  }
}

const MainTabScreen = createBottomTabNavigator(
  {
    ConversationsStack,
    HomeStack,
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
    EditProfile: EditProfileStack
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
    marginTop: 0,
    fontSize: 12
  }
})

export default ApplicationDrawer
