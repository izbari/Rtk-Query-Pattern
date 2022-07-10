import { FlatList, ActivityIndicator, Text, View } from "react-native";

import React from "react";
import { useSelector } from "react-redux";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  useAddReactionMutation,
  useGetPostsByUserIdQuery,
} from "../../features/posts/postsSlice";
import { HomeStackParamList } from "../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../../components/PostCard";
import { Post } from "../../types/Models";
type UserPageRouteProp = RouteProp<HomeStackParamList, "SingleUser">;

const UserPage: React.FC<{}> = () => {
  const {
    params: { userId },
  } = useRoute<UserPageRouteProp>();
  console.log("user ıd", userId);
  // const posts : Post[] = useSelector((state: any) => select(state));
  // const filteredPosts=  posts.filter(post => post.userId == userId);
  // console.log(posts);
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostsByUserIdQuery(userId);
  console.log("userposts", data ? Object.values(data.entities ?? []) : []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
      <FlatList
        data={
          data
            ? Object.values(data.entities ?? []).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
            : []
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard postId={item.id} />}
      />
    </SafeAreaView>
  );
};

export default UserPage;
