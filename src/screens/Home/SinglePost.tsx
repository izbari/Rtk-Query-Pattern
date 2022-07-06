import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../features/posts/postsSlice";
import Loading from "../../components/Loading";
interface post {
  title: string;
  body: string;
  id: any;
  userId: string;
}
type SinglePostRouteType = RouteProp<HomeStackParamList, "SinglePost">;
const SinglePost: FC = () => {
  const {
    params: { post },
  } = useRoute<SinglePostRouteType>();
  const navigation = useNavigation();
  const [updatePost, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] =
    useUpdatePostMutation();
  const [deletePost, { isLoading: isLoadingDelete, isError: isErrorDelete }] =
    useDeletePostMutation();
  const [addNewPost, { isLoading: isLoadingNew, isError: isErrorAddNew }] =
    useAddNewPostMutation();
  const [updatedPost, setUpdatedPost] = useState<post>(post);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState({ status: false, message: "" });
  useEffect(() => {
    isErrorAddNew
      ? setError({ status: true, message: "Error adding new post" })
      : isErrorDelete
      ? setError({ status: true, message: "Error deleting post" })
      : isErrorUpdate
      ? setError({ status: true, message: "Error updating post" })
      : setError({ status: false, message: "" });

    return () => {};
  }, [isErrorAddNew, isErrorDelete, isErrorUpdate]);
  useEffect(() => {
    isLoadingNew
      ? setLoading({ status: true, message: "Adding new post" })
      : isLoadingDelete
      ? setLoading({ status: true, message: "Deleting post" })
      : isLoadingUpdate
      ? setLoading({ status: true, message: "Updating post" })
      : setLoading({ status: false, message: "" });

    return () => {};
  }, [isLoadingDelete, isLoadingUpdate, isLoadingNew]);

  if (error.status) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          {error.message}
        </Text>
      </SafeAreaView>
    );
  }
  if (loading.status) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          {loading.message}
        </Text>
      </SafeAreaView>
    );
  }
  const onChangeText = (key: string, text: string) => {
    setUpdatedPost({
      ...updatedPost,
      [key]: text,
    });
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width / 2,
        }}
      >
        <Button title="<--" onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Post Edit
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#aaaa",
          padding: 20,
          margin: 10,
          borderRadius: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{post.title}</Text>
        <Text>{post.body}</Text>
      </View>
      <View style={{ marginTop: 50, paddingLeft: 15 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            padding: 5,
          }}
        >
          Edit
        </Text>
        <TextInput
          placeholder="Title"
          onChangeText={(text) => onChangeText("title", text)}
          value={updatedPost.title}
          style={{
            backgroundColor: "#aaaa",
            marginBottom: 20,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholder="Body"
          onChangeText={(text) => onChangeText("body", text)}
          value={updatedPost.body}
          style={{
            backgroundColor: "#aaaa",
            marginBottom: 20,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <Button
          title="Save"
          onPress={async () => {
            await updatePost(updatedPost);

            navigation.navigate("SingleUser", { userId: post.userId });
          }}
        ></Button>
        <Button
          title="Delete"
          onPress={async () => {
            await deletePost(post);
            navigation.navigate("SingleUser", { userId: post.userId });
          }}
        ></Button>
        <Button
          title="New Todo"
          onPress={async () => {
            await addNewPost({
              photo:
                "https://avatars.githubusercontent.com/u/73957984?s=40&v=4",
              title: "New Todo",
              body: "New Todo",
              userId: post.userId,
            });
            navigation.navigate("SingleUser", { userId: post.userId });
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default SinglePost;
