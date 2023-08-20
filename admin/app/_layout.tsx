import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Tabs, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/HomeHeader';
import PageHeader from '../components/PageHeader';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import BottomTabBar from '../components/BottomBar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const pathName = usePathname()
  console.log(pathName);

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
      <Tabs 
      tabBar={(props) => <BottomTabBar {...props} />}
      // screenOptions={{ true:false}}
      // screenOptions={{header:() => pathName === '/' ?<HomeHeader/>: <PageHeader/>}}
      >
        <Tabs.Screen name="index" options={{header: () => <HomeHeader/>}}/>
        <Tabs.Screen name="(employee)" options={{headerShown:false}}/>
        <Tabs.Screen name="location" options={{header: () => <PageHeader name='Location'/>}}/>
        <Tabs.Screen name="attendance" options={{header: () => <PageHeader name='Attendance'/>}}/>
      </Tabs>
      </SafeAreaView>
      <StatusBar style='auto' backgroundColor='gray'/>
  </ApplicationProvider>
  </>
  );
}
