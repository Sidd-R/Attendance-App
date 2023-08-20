import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Divider,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';

const HomeHeader = (props: Props
  ): React.ReactElement => {

  const renderTitle = (): React.ReactElement => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../assets/images/icon.png')}
      />
      <Text >
        AttendenceX
      </Text>
    </View>
  );

  return (
    <>
    <TopNavigation
      title={renderTitle}
      style={{paddingVertical: 10}}
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

export default HomeHeader;