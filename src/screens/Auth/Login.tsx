import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../navigations/navActions";
const Login = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="To Register"
        onPress={() => navigation.navigate("Register")}
      ></Button>
    </View>
  );
};

export default Login;
