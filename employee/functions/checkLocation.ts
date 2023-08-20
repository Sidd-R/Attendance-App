import axios from 'axios';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from 'expo-location';
import { Alert } from 'react-native';

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

interface LocationResponse {
  status: boolean;
  address?: string|null;
  latitude?: number;
  longitude?: number;
  message?: string;
}

export default async function checkLocation(
  empid: string
): Promise<LocationResponse> {
  console.log('checking location');

  var result: LocationResponse = {status:false,message:"Unknown error"};
  let { status } = await requestForegroundPermissionsAsync();
  console.log('got location Status');

  if (status !== 'granted') {
    Alert.alert('Error', 'Location permission not granted');
    return { status: false, message: 'Location permission not granted' };
  }
  console.log('got location permission');
  let location: Coordinate;
  try {
    location = await getCurrentPositionAsync({}).then((res) => {
      console.log(res, 'fck');
      return { longitude: res.coords.longitude, latitude: res.coords.latitude };
    });
  } catch (error) {
    console.log(error);
  }
  console.log('getting location');

  console.log('got location');
  await axios
    .get(process.env.EXPO_PUBLIC_BASE_URL + `location.php?empid=${empid}`)
    .then(async (res) => {
      console.log(JSON.stringify(location), JSON.stringify(res.data));

      if (res.data.status == 0) {
        const address = await reverseGeocodeAsync(location).then((res) => {
          console.log(res);
          return res[0].name;
        });
        result = {
          status: true,
          latitude: location.latitude,
          longitude: location.longitude,
          address,
        };
        console.log('no location assigned'); // geocode current location and send to server
      } else if (res.data.status == 1) {
        // console.log("assigned locations", res.data);
        // console.log(res.data.locations);
        // console.log("current location", location.coords);
        const locationArray: Array<Location> = res.data.locations;
        console.log('loc array', locationArray);

        const coordinatesWithinRadius = locationArray.filter(
          ({ latitude, longitude }) =>
            isWithinRadius(location, { latitude, longitude }, radius)
        );

        if (coordinatesWithinRadius.length > 0) {
          const address = "kk"
          result = {status:true,
            latitude: location.latitude,
            longitude: location.longitude,
            address,
          };
        } else {
          result = {status:false,message:"You are not in the assigned location"};
        }
      } else {
        Alert.alert('Error', 'Something went wrong');
        console.log(res.data);
        result = {status:false,message:"Unknown error1"};
      }
    })
    .catch((err) => {
      Alert.alert('Error', 'Something went wrong');
      console.log(err);
      result = {status:false,message:"Unknown error2"};
    });
  console.log('location check  result', result);

  return result;
}
