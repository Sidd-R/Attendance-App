import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';


const BottomTabBar = ({ navigation, state }:any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={{paddingHorizontal:10,paddingVertical:10}}
    >
    <BottomNavigationTab title='HOME' icon={<Icon name='home-outline'/>}/>
    <BottomNavigationTab title='EMPLOYEE' icon={<Icon name='people-outline'/>}/>
    <BottomNavigationTab title='LOCATION' icon={<Icon name='map-outline'/>}/>
    <BottomNavigationTab title='ATTENDANCE' icon={<Icon name='file-text-outline'/>}/>
  </BottomNavigation>
);

export default BottomTabBar;