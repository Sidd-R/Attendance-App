import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

const Page = () => {
  const lsp = useLocalSearchParams();
  console.log('lsp', lsp);
  
  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}

export default Page