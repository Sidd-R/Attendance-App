import { Spinner } from "@ui-kitten/components";
import { View,ImageProps } from "react-native";

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, 
    {justifyContent: 'center',
    alignItems: 'center',
  },]}>
    <Spinner size='small' status='control'/>
  </View>
);

export default LoadingIndicator