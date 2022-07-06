import { View, Text, Button } from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AllScreenParamList,
  AuthStackParamList,
} from "../../../types/navigationTypes";
// type RegisterRouteProp = RouteProp<AuthStackParamList, "Register">;
const Register = () => {
  //   const route = useRoute<RegisterRouteProp>();
  const navigation = useNavigation();
  //   console.warn(name);
  return (
    <View>
      <Text>Register </Text>
      <Button
        title="To Forget Password"
        onPress={() =>
          navigation.navigate("UserList")
        }
      />
    </View>
  );
};

export default Register;
