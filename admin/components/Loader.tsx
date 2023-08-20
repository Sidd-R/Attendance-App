import { Layout, Popover, Spinner, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native';

const Loader = ({visible}:{visible:boolean}) => {
  return (
    
    <Popover
    backdropStyle={styles.backdrop}
    visible={true}
    anchor={() => <></>}
    // onBackdropPress={() => setVisible(false)}
  >
     <Layout style={styles.backdrop}>
      <Text>
        Loading
      </Text>
      <Spinner />
    </Layout>
  </Popover>
  )
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});


export default Loader