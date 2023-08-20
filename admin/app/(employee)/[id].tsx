import React from 'react';
import {
  Button,
  Datepicker,
  Divider,
  Icon,
  IconElement,
  Input,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Detail from '../../components/Detail';
import { router, useLocalSearchParams } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const CalendarIcon = (props: any): IconElement => (
  <Icon {...props} name="calendar" />
);

const markAttendance = () => {};

const deleteLocation = () => {};

const deleteAssignedEmp = () => {};

// const

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(2).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const renderItemAccessory = (): React.ReactElement => (
  <Button size="tiny" status="danger" appearance="ghost">
    REMOVE
  </Button>
);

const renderItem = ({
  item,
  index,
}: {
  item: IListItem;
  index: number;
}): React.ReactElement => {
  return (
    <>
      <Divider />
      <ListItem
        key={index + 1}
        title={`Location 1`}
        description={`latitide: 2878 longitude: 2878 `}
        accessoryRight={renderItemAccessory}
      />
    </>
  );
};

const Page = () => {
  const { id } = useLocalSearchParams();
  // const [date, setDate] = React.useState(new Date());
  const [deleteLocation, setDeleteLocation] = React.useState(false);
  const [deleteAssignedEmp, setDeleteAssignedEmp] = React.useState(false);

  const [date, setDate] = React.useState(new Date());
  const [inTime, setInTime] = React.useState(new Date());
  const [outTime, setOutTime] = React.useState(new Date());
  const onChangeIn = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setInTime(currentDate);
  };

  const onChangeOut = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setOutTime(currentDate);
  };

  const showModeIn = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: inTime,
      onChange: onChangeIn,
      mode: currentMode,
      is24Hour: true,
    });
  };


  const showModeOut = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: outTime,
      onChange:onChangeOut,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showTimepickerIn = () => {
    showModeIn('time');
  };
  const showTimepickerOut = () => {
    showModeOut('time');
  };


  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Layout style={styles.container}>
          <Layout level="3" style={styles.upperDiv}>
            <Detail attribute="Name" value="Siddhant Rao" />
            <Divider style={{ backgroundColor: 'black' }} />

            <Detail attribute="Email" value="sidd.@ts.com" />
            <Divider style={{ backgroundColor: 'black' }} />

            <Detail attribute="Employee Id" value={String(id)} />
            <Divider style={{ backgroundColor: 'black' }} />

            <Detail attribute="Manager" value="Not assigned" />
            <Divider style={{ backgroundColor: 'black' }} />

            {/* make arragements for multiple manager case*/}
            <Detail attribute="Last Updated" value="9:30 pm" />
          </Layout>
          <Button
            status="info"
            appearance="outline"
            size="giant"
            onPress={() => router.push('/(employee)/employeeLocation?id=100')}
          >
            Last Updated Location
          </Button>
          <Layout level="2" style={styles.attendanceContainer}>
            <Layout style={styles.attendance} level="2">
              <Layout
                level="2"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text category="s1">IN TIME</Text>
                <Input
                  onFocus={() => showTimepickerIn()}
                  placeholder="Time"
                  value={String(inTime.toLocaleTimeString())}
                />
              </Layout>
              <Layout
                level="2"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text category="s1">OUT TIME</Text>
                <Input
                  onFocus={() => showTimepickerOut()}
                  placeholder="Time"
                  value={String(outTime.toLocaleTimeString())}
                />
              </Layout>
            </Layout>
            <Layout style={styles.attendance} level="2">
              <Button status="primary" size="medium">
                Mark Attendance
              </Button>
              <Datepicker
                size="large"
                placeholder="Pick Date"
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
                accessoryRight={CalendarIcon}
              />
            </Layout>
          </Layout>

          <Layout
            level="2"
            style={styles.assignedLocation}
            pointerEvents={deleteLocation ? 'none' : 'auto'}
          >
            <Layout style={styles.assignedLocationTop} level="2">
              <Text category="s1">Assigned Locations</Text>
              <Button accessoryLeft={<Icon name="plus" />} appearance="ghost" />
            </Layout>
            <Divider style={{ backgroundColor: 'darkgray' }} />
            <Layout style={styles.assignedLocationBottom} level="2">
              {data.map((item, index) => renderItem({ item, index }))}
            </Layout>
          </Layout>

          <Layout
            level="2"
            style={styles.assignedLocation}
            pointerEvents={deleteAssignedEmp ? 'none' : 'auto'}
          >
            <Layout style={styles.assignedLocationTop} level="2">
              <Text category="s1">Assigned Emloyees To Manage</Text>
              <Button accessoryLeft={<Icon name="plus" />} appearance="ghost" />
            </Layout>
            <Divider style={{ backgroundColor: 'darkgray' }} />
            <Layout style={styles.assignedLocationBottom} level="2">
              {data.map((item, index) => renderItem({ item, index }))}
            </Layout>
          </Layout>

          <Button status="warning" appearance="outline" size="giant">
            Reset Device Id
          </Button>

          <Button status="danger" appearance="outline" size="giant">
            Delete Employee
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingVertical: 30,
    gap: 30,
  },
  upperDiv: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  lowerDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    borderRadius: 10,
  },
  assignedLocation: {
    // alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    position: 'relative',
  },
  assignedLocationTop: {
    flexDirection: 'row',
    // height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  assignedLocationBottom: {
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    overflow: 'hidden',
  },
  attendanceContainer: {
    gap: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
  },
});

export default Page;
