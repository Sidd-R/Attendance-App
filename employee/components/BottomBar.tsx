import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';


const BottomTabBar = ({ navigation, state }:any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME' icon={<Icon name='home-outline'/>}/>
    <BottomNavigationTab title='PROFILE' icon={<Icon name='person-outline'/>}/>
  </BottomNavigation>
);

export default BottomTabBar;