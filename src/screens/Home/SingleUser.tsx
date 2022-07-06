import {
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersSlice";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useGetPostsByUserIdQuery } from "../../features/posts/postsSlice";
import { HomeStackParamList } from "../../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
type UserPageRouteProp = RouteProp<HomeStackParamList, "SingleUser">;
const UserPage: React.FC<{}> = () => {
  const {
    params: { userId },
  } = useRoute<UserPageRouteProp>();
  const navigation = useNavigation();
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsByUserIdQuery(userId);
  useLayoutEffect(() => {
    console.log("calisti ?? ")
    refetch();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Posts fetching...
        </Text>
      </View>
    );
  }
  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width / 2,
        }}
      >
        <Button title="<--" onPress={() => navigation.goBack()} color="grey" />

        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          User's posts
        </Text>
      </View>
      <FlatList
        data={posts ? Object.values(posts.entities ?? []) : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("SinglePost", { post: item })}
              style={{
                backgroundColor: "#aaaa",
                padding: 20,
                margin: 10,
                borderRadius: 15,
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ height: 200, width: window.innerWidth, padding: 15 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text>{item.body}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default UserPage;
