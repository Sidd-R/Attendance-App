import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Profile from './Profile';
import { Header } from '../../components/Header';
import BottomBar from '../../components/BottomBar';

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  
  return (
    <Tab.Navigator screenOptions={{header: ()=> <Header/>}} tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}