import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import { AuthStackParamList } from "../../types/navigationTypes";

const AuthStack = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthStack;
