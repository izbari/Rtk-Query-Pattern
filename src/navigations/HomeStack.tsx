import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../screens/Home/UserList";
import SingleUser from "../screens/Home/SingleUser";
import { HomeStackParamList } from "../../types/navigationTypes";
import SinglePost from "../screens/Home/SinglePost";
const AuthStack = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="UserList" component={UserList} />
      <HomeStack.Screen name="SingleUser" component={SingleUser} />
      <HomeStack.Screen name="SinglePost" component={SinglePost} />

    </HomeStack.Navigator>
  );
};

export default AuthStack;
