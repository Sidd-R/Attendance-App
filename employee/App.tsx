import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/auth/Login";
import ProfileDetails from "./screens/auth/ProfileDetails";
import HomeLayout from "./screens/home/HomeLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList, LoginState } from "./types";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
  Spinner,
} from "@ui-kitten/components";
import { Alert, useColorScheme } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import axios from "axios";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorscheme = useColorScheme();

  const [initialRouteName, setInitialRouteName] = React.useState<
    "login" | "homeLayout"
  >("login");

  const [loading, setLoading] = React.useState<boolean>(true);

  const checkAuth = async () => {
    await getItemAsync("loginState").then(async (res) => {
      
      if (res) {
        var state = await JSON.parse(res);
        
        await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "profile.php", {empid:state.empId}).then((res) => {
          
          if (res.data.status === 1) {
            setItemAsync("loginState", JSON.stringify(res.data));
            setInitialRouteName("homeLayout");
          } 
        }).catch((err) => {
          Alert.alert("Error", err.message);
        })
      } else {
        return
      }
    
    }).catch((err) => {
      Alert.alert("Error", err.message);
    }).finally(() => {
      setLoading(false);
    })

    
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorscheme === "light" ? eva.light : eva.dark}
      >
        {!loading ? (
          <>
            <NavigationContainer>
              <StatusBar style="light" />
              <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName={initialRouteName}>
                  <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="profileDetails"
                    component={ProfileDetails}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="homeLayout"
                    component={HomeLayout}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </SafeAreaView>
            </NavigationContainer>
          </>
        ) : (
          <Layout
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner size="giant" />
            <Text category="h1">Loading</Text>
          </Layout>
        )}
      </ApplicationProvider>
    </>
  );
}
