import axios from "axios";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { Alert } from "react-native";

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Convert distance to meters
  return distance;
}

type Coordinate = {
  latitude: number;
  longitude: number;
};

type Location = Coordinate & { name: string; locationId: string };

function isWithinRadius(
  location: Coordinate,
  coordinate: Coordinate,
  radiusMeters: number
) {
  const distance = haversineDistance(
    location.latitude,
    location.longitude,
    coordinate.latitude,
    coordinate.longitude
  );
  return distance <= radiusMeters;
}

const radius = 1000; // Radius in meters

export default async function checkLocation(empid: string): Promise<boolean> {
  console.log("checking location");

  var result = false;
  let { status } = await requestForegroundPermissionsAsync();
  console.log("got location Status");

  if (status !== "granted") {
    Alert.alert("Error", "Location permission not granted");
    return false;
  }
  console.log("got location permission");
  let location: Coordinate;
  try {
    location = await getCurrentPositionAsync({}).then((res) => {
      console.log(res, "fck");
      return { longitude: res.coords.longitude, latitude: res.coords.latitude };
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getting location");

  console.log("got location");
  await axios
    .get(process.env.EXPO_PUBLIC_BASE_URL + `location.php?empid=${empid}`)
    .then((res) => {
      console.log(JSON.stringify(location), JSON.stringify(res.data));

      if (res.data.status == 0) {
        result = true;
        console.log("no location assigned");
      } else if (res.data.status == 1) {
        // console.log("assigned locations", res.data);
        // console.log(res.data.locations);
        // console.log("current location", location.coords);
        const locationArray: Array<Location> = res.data.locations;
        console.log("loc array", locationArray);

        const coordinatesWithinRadius = locationArray.filter(
          ({ latitude, longitude }) =>
            isWithinRadius(location, { latitude, longitude }, radius)
        );

        if (coordinatesWithinRadius.length > 0) {
          result = true;
        } else {
          result = false;
        }
      } else {
        Alert.alert("Error", "Something went wrong");
        console.log(res.data);
      }
    })
    .catch((err) => {
      Alert.alert("Error", "Something went wrong");
      console.log(err);
      result = false;
    });
  console.log("location check  result", result);

  return result;
}
