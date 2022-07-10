import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../screens/Home/UserList";
import SingleUser from "../screens/Home/SingleUser";
import { HomeStackParamList } from "../types/navigationTypes";
import SinglePost from "../screens/Home/SinglePost";
import { Box, Icon, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useAddNewPostMutation } from "../features/posts/postsSlice";
const AuthStack = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamList>();
  const [addNewPost] = useAddNewPostMutation()
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
        options={({ route }) => ({
          title: `${route.params.userName}'s Posts`,
          headerRight: () => (
            <Box alignItems="center">
              <IconButton
                onPress={async () => {
                  await addNewPost({
                    createdAt: new Date(),
                    title: "Deneme Title" + Math.random(),
                    photo: "http://loremflickr.com/640/480/fashion",
                    userId: route.params.userId,
                    body: "Fugit incidunt consequatur. Minima ut consequatur consectetur qui quis excepturi inventore soluta enim. Sit aut enim in dolorem et impedit aut expedita et. Accusamus consequatur et est.\nQui quaerat quos. Laboriosam facilis nisi animi molestiae qui illo ipsam quaerat. Nulla veritatis sed. Dolores ut vero placeat fuga numquam doloremque accusantium. Dicta facilis mollitia. Praesentium molestiae occaecati laborum debitis tempore dolor.\nA dolorem porro et est voluptatem consequatur inventore est. Deleniti praesentium magni. Voluptatem nostrum vel ut autem maiores. Aut reprehenderit dolor iste.",
                    reactions: {
                      thumbsUp: 0,
                      wow: 0,
                      heart: 0,
                      rocket: 0,
                      coffee: 0,
                    },
                    id: (Math.random()*100000).toFixed(0).toString(),
                  }).unwrap();
                }}
                icon={<Icon as={Ionicons} name="add-outline" />}
                borderRadius="full"
                _icon={{
                  color: "white",
                  size: "3xl",
                }}
              />
            </Box>
          ),
        })}
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
