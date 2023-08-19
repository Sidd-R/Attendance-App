import React from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import LoadingIndicator from "../../components/LoadingIndicator";
import { ProfileDetailsParams } from "../../types";
import { Alert } from "react-native";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";
import * as Application from "expo-application";

export default function ProfileDetails({
  navigation,
  route,
}: ProfileDetailsParams) {
  console.log("profile details");

  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const submit = () => {
    if (name === "" || email === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setSubmitted(true);

    axios
      .post(process.env.EXPO_PUBLIC_BASE_URL + "login/firstLogin.php", {
        name,
        email,
        empid: route.params.empId,
        deviceid: Application.androidId
      })
      .then((res) => {
        if (res.data.status === "success") {
          var userData = {
            isManager: route.params.isManager,
            ...res.data,
          };
          console.log(userData);

          setItemAsync("loginState", JSON.stringify(userData));
          navigation.replace("homeLayout");
        } else if (res.data.status === "error") {
          Alert.alert("Error", res.data.message);
        } else {
          console.log(res.data);
          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.message);
      })
      .finally(() => {
        setSubmitted(false);
      });

    //   setSubmitted(false)
    //   navigation.replace("homeLayout");
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
      <Text category="h1">PROFILE INFO</Text>
      <Input
        placeholder="Name"
        size="large"
        onChangeText={(val) => setName(val)}
        value={name}
        status="primary"
        disabled={submitted}
      />
      <Input
        placeholder="Email"
        size="large"
        onChangeText={(val) => setEmail(val)}
        value={email}
        status="primary"
        disabled={submitted}
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
