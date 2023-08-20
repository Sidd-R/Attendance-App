import React from 'react';
import { Link, Stack, router } from 'expo-router';
import HomeHeader from '../components/HomeHeader';
import { Divider, Icon, Layout, Text } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  Pressable,
  ImageBackground,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Page = () => {
  return (
    <Layout style={styles.container} level="2">
      <Text category="h2" style={{marginVertical:12}} >
        Hey Admin,
      </Text>
      {/* <Divider style={{ marginVertical: 10 }} /> */}
      <Layout style={styles.main} level="2">
        <Pressable
          onPress={() => {
            router.push('/(employee)');
          }}
          style={styles.boxContainer}
        >
          <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4">Employee</Text>
            <View style={styles.iconContainer}
            >
            <Icon 
            style={{width: 45, height: 45}}
            name='people-outline' />
            </View>
            
          </ImageBackground>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/location');
          }}
          style={styles.boxContainer}
        >
          <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4">Location</Text>
            <View style={styles.iconContainer}
            >
            <Icon
            style={{width: 45, height: 45}}
            name='map-outline' />
            </View>

          </ImageBackground>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/attendance');
          }}
          style={styles.boxContainer}
        >
          <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4">Attendance</Text>
            <View style={styles.iconContainer}
            >
            <Icon
            style={{width: 45, height: 45}}
            name='file-text-outline' />
            </View>

          </ImageBackground>
        </Pressable>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 10,
  },
  main: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  box: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 30,
    
  },
  // i want a round container for the icon with whitish background and somewhat transparent
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.65)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  boxContainer: {
    overflow: 'hidden',
    borderRadius: 20,
  },
});

export default Page;
