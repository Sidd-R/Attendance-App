import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Divider,
  Icon,
  IconElement,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';


export const Header = (): React.ReactElement => {

  const renderTitle = (props:any): React.ReactElement => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../assets/icon.png')}
      />
      <Text {...props}>
        AttendenceX
      </Text>
    </View>
  );

  return (
    <>
    <TopNavigation
      title={renderTitle}
      style={{paddingVertical: 10}}
      // accessoryRight={renderOverflowMenuAction}
    />
    <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
});