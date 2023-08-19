import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  homeLayout: undefined;
  login: undefined;
  profileDetails: {empId: string, isManager: number};
};
export type RootStackParams = NativeStackScreenProps<RootStackParamList>

export type LoginParams = NativeStackScreenProps<RootStackParamList,'login'>
export type ProfileDetailsParams = NativeStackScreenProps<RootStackParamList,'profileDetails'>
export type HomeLayoutParams = NativeStackScreenProps<RootStackParamList,'homeLayout'>

export interface LoginState {
  empId: string;
  isManager: number;
  name: string;
  email: string;
  status: number;
}
