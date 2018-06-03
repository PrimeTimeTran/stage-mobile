import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';

import ConversationsScreen from '../screens/ConversationsScreen';
import ConversationScreen from '../screens/ConversationScreen';

import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';

import StagesScreen from '../screens/StagesScreen';

import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const ConversationsStack = createStackNavigator({
  Conversations: ConversationsScreen,
  Conversation: ConversationScreen,
  Users: UsersScreen,
});

ConversationsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: 'Conversation',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-options'}
      />
    ),
    tabBarVisible: (navigation.state.index == 0) ? true : false
  }
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const StagesStack = createStackNavigator({
  Stages: StagesScreen,
});

StagesStack.navigationOptions = {
  tabBarLabel: 'Stages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Settings: SettingsScreen
});

ProfileStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-options'}
      />
    ),
    tabBarVisible: (navigation.state.index == 0) ? true : false
  }
};

const MainTabScreen = createBottomTabNavigator({
    ConversationsStack,
    HomeStack,
    StagesStack,
    ProfileStack
});

export default createBottomTabNavigator(
  {
    Welcome: WelcomeScreen,
    Auth: AuthScreen,
    Main: MainTabScreen
  },
  {
    lazy: true,
    navigationOptions: { tabBarVisible: false }
  }
);
