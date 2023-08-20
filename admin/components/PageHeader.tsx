import React from 'react';
import { Divider, Icon, IconElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { router } from 'expo-router';

const BackIcon = (props:any): IconElement => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

const BackAction = (): React.ReactElement => (
  <TopNavigationAction icon={BackIcon} onPress={() => router.back()}/>
);

// const renderTitle = (): React.ReactElement => (
//   <View style={styles.titleContainer}>
    
//     <Text >
//       AttendenceX
//     </Text>
//   </View>
// );

const PageHeader = ({name}: {name: string}): React.ReactElement => (

  // return (
  <>
  <TopNavigation
     accessoryLeft={BackAction}
     title={name}
     style={{paddingVertical: 25}}
     
     />
     <Divider />
  </>
  // )

  );

export default PageHeader;