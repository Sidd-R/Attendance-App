import { Divider, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import {StyleSheet} from 'react-native'

export default function Detail({attribute,value}:{attribute:string,value:string}) {
  return (
    <>
   <Layout style={styles.container}
   level='3'
   >
      <Text style={styles.leftText}
   status='primary'

      >{attribute}: </Text> 
      <Text style={styles.rightText}
      >{value}</Text>
   </Layout>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginVertical: 2,
  },
  leftText: {},
  rightText: {},
})