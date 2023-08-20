import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import {StyleSheet} from 'react-native' 

const Page = () => {
  return (
    <Layout level='2' style={styles.container}     >
      <Text>attendance</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingVertical: 30,
    gap: 30,
  },
})

export default Page