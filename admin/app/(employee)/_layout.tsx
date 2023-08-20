import { SplashScreen, Stack } from 'expo-router';
import PageHeader from '../../components/PageHeader';
import { StyleSheet, Dimensions, Pressable } from 'react-native';

export default function EmployeeLayout() {

  return (
      <Stack>
        <Stack.Screen name="index" options={{header:()=> <PageHeader name='Employees'/>}}/>
        <Stack.Screen name="[id]" options={{header:()=> <PageHeader name='Employee'/>}}  />
      </Stack>
  );
}


