import React from 'react'
import { Button, Icon, IconElement, Layout, List, ListItem, Text } from '@ui-kitten/components'
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Detail from '../../components/Detail';
import { router } from 'expo-router';
import axios from 'axios';

interface IListItem {
  empId: string;
  name: string;
}

const Page = () => {
  const [employees, setEmployees] = React.useState<Array<IListItem>>([])
  React.useEffect(() => {
    (async () => {
      
    await axios.get(process.env.EXPO_PUBLIC_BASE_URL + 'employee/all.php').then((res) => {
      console.log('res', res.data
      );
      setEmployees(res.data)
    }
    ).catch((err) => {
      console.log('err', err);
    }
    )
    })()
  }, []);
  
  const renderItemIcon = (props:any): IconElement => (
    <Icon
      {...props}
      name='person'
    />
  );

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.name}`}
      description={`Employee Id: ${item.empId} `}
      accessoryLeft={renderItemIcon}
      style={{borderRadius: 10,marginBottom: 10}}
      onPress={() => {router.push('/(employee)/99')}}
    />
  );

  return (
    <Layout style={styles.container} level='2'>
      <Button status='success' appearance='outline' size='giant' accessoryRight={<Icon name='person-add' />}>
        Add Employee
      </Button>
      <Layout level='3' style={styles.lowerDiv}
      >
         <List
      // style={{maxHeight: 192}}
      data={employees}
      renderItem={renderItem}
    />
      </Layout>
    </Layout>
  )
}

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
  details: {
    
  },
  upperDivRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lowerDiv: {
    flex: 4,
    // borderRadius: 10,
    // borderWidth: 0.5,
  },
});

export default Page;