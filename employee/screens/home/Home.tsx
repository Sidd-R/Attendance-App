import {
  Button,
  Card,
  Divider,
  Layout,
  List,
  ListItem,
  Modal,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { StyleSheet, Alert } from "react-native";
import React from "react";
import checkAttendenceState from "../../functions/chechAttendenceState";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import Loading from "../Loading";
import checkLocation from "../../functions/checkLocation";

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: "Item",
  description: "Description for Item",
});

export default function Home() {
  console.log("Home");
  const [punchState, setPunchState] = React.useState<number>(0); // 0 for start, 1 for puch in, 2 for punch out
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [visible, setVisible] = React.useState(false);

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      style={{ backgroundColor: "transparent", paddingLeft: 20 }}
    />
  );

  const checkState = async () => {
    await getItemAsync("loginState")
      .then(async (res) => {
        var state = res ? JSON.parse(res) : { empid: "null" };
        console.log(state);

        await axios
          .post(process.env.EXPO_PUBLIC_BASE_URL + "attendance/status.php", {
            empid: state.empid,
          })
          .then((res) => {
            if (res.data.status === 0) {
              setPunchState(0);
            } else if (res.data.status === 1) {
              setPunchState(1);
            } else if (res.data.status === 2) {
              setPunchState(2);
            }
            console.log("punch status", res.data);
          })
          .catch((err) => {
            Alert.alert("Error", err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    checkState();
  }, []);

  const punchIn = async () => {
    setSubmitted(true);
    setLoading(true);
    let submitTimeOut = setTimeout(() => {
      setLoading(false);
      setSubmitted(false);
      alert("Punchin Failed");
    }, 2000);
    await getItemAsync("loginState")
      .then(async (res) => {
        var state = res ? JSON.parse(res) : { empid: "null" };

        await checkLocation(state.empid)
          .then(async (res) => {
            if (res === true) {
              console.log("correct location");

              await axios
                .post(
                  process.env.EXPO_PUBLIC_BASE_URL + "attendance/punchIn.php",
                  {
                    empid: state.empid,
                  }
                )
                .then((res) => {
                  console.log("punchIn result", res.data); //!!!!!!!!!!!!!!!!!!!!!!!

                  if (res.data.status === 1) {
                    //1 success and 0 error
                    setPunchState(1);
                  } else if (res.data.status === 2) {
                    setPunchState(1);
                    Alert.alert("Info", res.data.message);
                  } else {
                    Alert.alert("Error 1", res.data.message);
                  }
                })
                .catch((err) => {
                  Alert.alert("Error 2", err.message);
                  console.log(err);
                });
            } else {
              // setSubmitted(false);

              Alert.alert("Error", "You are not at assigned location");
            }
          })
          .catch((err) => {
            Alert.alert("Error 3", err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        Alert.alert("Error 4", err.message);
      })
      .finally(() => {
        clearTimeout(submitTimeOut);
        setLoading(false);
        setSubmitted(false);
      });
  };

  const punchOut = async () => {
    setSubmitted(true);
    setLoading(true);
    let submitTimeOut = setTimeout(() => {
      setLoading(false);
      setSubmitted(false);
      alert("Punchout Failed");
    }, 2000);
    
      
    await getItemAsync("loginState")
      .then(async (res) => {
        var state = res ? JSON.parse(res) : { empid: "null" };

        await checkLocation(state.empid)
          .then(async (res) => {

            if (res === false) {
              throw new Error("You are not at assigned location");
            }

            await axios
              .post(
                process.env.EXPO_PUBLIC_BASE_URL + "attendance/punchOut.php",
                {
                  empid: state.empid
                }
              )
              .then((res) => {
                console.log("PunchOut status", res.data);

                if (res.data.status === 1) {
                  //1 success and 0 error
                  setPunchState(2);
                } else if (res.data.status === 2) {
                  setPunchState(2);
                  Alert.alert("Info", res.data.message);
                } else {
                  Alert.alert("Error 1", res.data.message);
                }
              })
              .catch((err) => {
                Alert.alert("Error 2", err.message);
                console.log(err);
              });
          })
          .catch((err) => {
            Alert.alert("Error", err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        Alert.alert("Error 3", err.message);
        console.log(err);
      })
      .finally(() => {
        clearTimeout(submitTimeOut);
        setLoading(false);
        setSubmitted(false);

      });
  };

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text category="h6" style={{marginVertical:10}}>Alert</Text>
          <Text category="p1">Are you sure you want to punch out?</Text>
          <Layout style={styles.modalLayout}>
          <Button
            appearance="ghost"
            size="large"
            onPress={() => {
              setVisible(false);
              punchOut();
            }}
          >
            Yes
          </Button>
          <Button appearance="ghost" size="large" status="danger" onPress={() => setVisible(false)}>No</Button>
          </Layout>
          
        </Card>
      </Modal>
      {loading ? (
        <Loading />
      ) : (
        <Layout style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}>
          <Text category="h3">HOME</Text>
          {punchState === 0 ? (
            <Button
              appearance="outline"
              size="giant"
              status="danger"
              style={styles.punchInButton}
              onPress={punchIn}
              disabled={submitted}
            >
              Punch In
            </Button>
          ) : (
            <Button
              appearance="outline"
              size="giant"
              status="danger"
              style={styles.punchInButton}
              disabled={punchState === 2 || submitted}
              onPress={() => setVisible(true)}
            >
              Punch Out
            </Button>
          )}
          <Layout style={styles.listLayout} level="2">
            <Text category="h5" style={styles.listTitle}>
              Assigned Locations:
            </Text>
            <List
              style={{ maxHeight: 250 }}
              data={data}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          </Layout>
        </Layout>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  punchInButton: {
    width: "70%",
    height: 90,
    marginVertical: 60,
  },
  listLayout: {
    height: 350,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  listTitle: {
    textAlign: "center",
    marginVertical: 25,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalLayout: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 25
  }
});
