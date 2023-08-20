import React from 'react';
import {
  Avatar,
  Button,
  Icon,
  IconElement,
  Input,
  Layout,
  List,
  ListItem,
  Popover,
  Spinner,
  Text,
} from '@ui-kitten/components';
import { StyleSheet, Dimensions, Pressable, View } from 'react-native';
import Detail from '../components/Detail';
import { router } from 'expo-router';
import axios from 'axios';

interface Location {
  locationId: string;
  name: string;
  latitude: string;
  longitude: string;
}

const Page = () => {
  const [visible, setVisible] = React.useState(false);
  const [locations, setLocations] = React.useState<Array<Location>>([])
  const [name, setName] = React.useState<string>('')
  const [coordinates, setCoordinates] = React.useState<string>('')

  React.useEffect(() => {
    (async () => {
      
    await axios.get(process.env.EXPO_PUBLIC_BASE_URL + 'location/all.php').then((res) => {
      console.log('res', res.data
      );
      setLocations(res.data)
    }
    ).catch((err) => {
      console.log('err', err);
    }
    )
    })()
  }, []);

  const DeleteButton = ({locationId}:{
    locationId: string
  }): React.ReactElement => {
    // console.log('delete',locationId);
    
    return <Button size="tiny" status="danger" appearance="outline">
      DELETE
    </Button>
  }
  const renderItemIcon = (props: any): IconElement => (
    <Icon {...props} name="person" />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: Location;
    index: number;
  }): React.ReactElement => (
    <ListItem
      key={item.locationId}
      // key={index + 1}/
      title={item.name}
      // title={`Location ${index + 1}`}
      // description={`latitider: hey `}
      description={`latitide: ${item.latitude?.substring(0,7)??"null"} longitude: ${item.longitude?.substring(0,7)??"null"} `}
      style={{borderRadius: 10,marginBottom: 10, paddingHorizontal: 15}}
      accessoryRight={() =><DeleteButton locationId={item.locationId}/>}
    />
  );

  return (
    <Layout style={styles.container} level="2">
      <Popover
        backdropStyle={styles.backdrop}
        visible={visible}
        anchor={() => (
          <Button  status="success" appearance="outline" size="giant" onPress={() => setVisible(true)}
          >
            Add Location
          </Button>
        )}
        style={{backgroundColor: 'rgba(0, 0, 0, 0)',borderWidth: 0}}
      >
        <Layout style={styles.addLocationContainer}>
        {/* <Text category='h5' 
         >
            Enter Coordinates
          </Text> */}
          <Input placeholder='name' value={name} onChangeText={setName}           />
          <Input placeholder='co-ordinates' value={coordinates} onChangeText={setCoordinates}
          />
          <Layout style={styles.addLocationContainerButtons}>
          <Button status="danger" appearance="ghost" size="medium" onPress={() => setVisible(false)}>
            CANCEL
          </Button>
          <Button  appearance="ghost" size="medium" onPress={() => {
            console.log('name',name);
            console.log('coordinates',coordinates.split(','));
            
            setVisible(false)}}>
            SUBMIT
          </Button>
          </Layout>
        </Layout>
        {/* <Layout style={styles.content}>        
          <Text category='h1'>Loading</Text>
          <Spinner  size='giant'/>
        </Layout> */}
      </Popover>

      <Layout level="3" style={styles.lowerDiv}>
        <List
          style={{ borderRadius: 11 }}
          data={locations}
          renderItem={renderItem}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 100,
    gap: 30,
  },
  upperDiv: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  details: {},
  upperDivRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lowerDiv: {
    // flex: 4,
    // borderRadius: 10,
    // borderWidth: 0.5,
    maxHeight: Dimensions.get('window').height * 0.65,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    paddingHorizontal: 12,
    paddingVertical: 14,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 20,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  addLocationContainer: {
    paddingHorizontal: 20,
    gap: 15,
    paddingTop: 20,
    paddingBottom: 7,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: Dimensions.get('window').height * 0.2,

  },
  addLocationContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
  }
});

export default Page;
