import React from "react";
import { LoginParams } from "../../types";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { StyleSheet, ImageProps, View, Alert } from "react-native";
import LoadingIndicator from "../../components/LoadingIndicator";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";
import * as Application from "expo-application";

// import DeviceInfo from 'react-native-device-info';

// const getDeviceId = async () => {
// //   if (Platform.OS === 'android') {
// //     return Application.androidId;
// //   } else {
// //     let deviceId = await SecureStore.getItemAsync('deviceId');

// //     if (!deviceId) {
// //       deviceId = Constants.deviceId; //or generate uuid
// //       await SecureStore.setItemAsync('deviceId', deviceId);
// //     }

// //     return deviceId;
// //   }
// // }
// //
export default function Login({ navigation, route }: LoginParams) {
  console.log("login");
  // navigation.replace("homeLayout")
  // const [isAuthDone, setIsAuthDone] = React.useState<boolean>(false);
  // React.useEffect(()=>{
  //   if(isAuthDone) {
  //     console.log("ff");

  //   }
  // },[isAuthDone])

  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [employeeId, setEmployeeId] = React.useState<string>("");

  const submit = async () => {
    if (employeeId === "") {
      alert("Please enter employee id");
      return;
    }

    setSubmitted(true);

    
    await axios.post(process.env.EXPO_PUBLIC_BASE_URL+"login/login.php", {empid:employeeId, deviceid:Application.androidId})
      // .then((response) => response.text())
      .then(async (res) => {
        // console.log(res);
        
        if (res.data.status === 0) {
            await setItemAsync("loginState", JSON.stringify(res.data))
                .then(() => {
                  navigation.replace("homeLayout");
                })
                .catch((err) => {
                  console.log(err);
                  Alert.alert("Error", err.message);
                });
        } else if (res.data.status === 1) {
              navigation.push("profileDetails",{empId:employeeId, isManager:res.data.isManager});
           
        } else if (res.data.status === 2) {
          Alert.alert("Error", res.data.message);
        } else if (res.data.status === 3) {
          Alert.alert("Error", res.data.message);
        } else {
          console.log(res.data,employeeId);

          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch((err) => {
        console.log("1", err);
        alert("Network Error");
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "15%",
        gap: 60,
      }}
      level="2"
    >
      <Text category="h1">LOGIN</Text>
      <Input
        placeholder="Employee Id"
        size="large"
        disabled={submitted}
        onChangeText={(val) => setEmployeeId(val)}
        value={employeeId}
        status="primary"
      />
      {submitted ? (
        <Button
          style={{ margin: 2 }}
          appearance="filled"
          // accessoryLeft={LoadingIndicator}
          size="large"
        >
          LOADING
        </Button>
      ) : (
        <Button
          onPress={submit}
          style={{ margin: 2 }}
          appearance="filled"
          size="large"
        >
          SUBMIT
        </Button>
      )}
    </Layout>
  );
}
