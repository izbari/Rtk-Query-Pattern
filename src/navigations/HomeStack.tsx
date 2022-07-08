import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../screens/Home/UserList";
import SingleUser from "../screens/Home/SingleUser";
import { HomeStackParamList } from "../types/navigationTypes";
import SinglePost from "../screens/Home/SinglePost";
const AuthStack = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
        },
      }}
    >
      <HomeStack.Screen
        name="UserList"
        component={UserList}
        options={{ title: "Users" }}
      />
      <HomeStack.Screen
        name="SingleUser"
        component={SingleUser}
        options={({ route }) => ({ title: `${route.params.userName}'s Posts` })}
      />
      <HomeStack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{ title: "Post Edit" }}
      />
    </HomeStack.Navigator>
  );
};

export default AuthStack;
