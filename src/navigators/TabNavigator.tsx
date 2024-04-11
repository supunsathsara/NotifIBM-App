/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import Home from '../screens/Home';
import GPACal from '../screens/GPACal';
import Octicons from 'react-native-vector-icons/Octicons';
import Account from '../screens/Account';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={30}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Octicons name="home" size={size} color={
              focused ? '#D1F4FF' : '#2F2F2F'
            }
            />
          ),
        }}
        />
         <Tab.Screen
        name="GPACalculator"
        component={GPACal}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Octicons name="meter" size={size} color={
              focused ? '#D1F4FF' : '#2F2F2F'
            }
            />
          ),
        }}
        />
         <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Octicons name="person" size={size} color={
              focused ? '#D1F4FF' : '#2F2F2F'
            }
            />
          ),
        }}
        />
     
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;