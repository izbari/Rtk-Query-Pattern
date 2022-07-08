import {
  Alert,
  FlatList,
  TouchableOpacity,
  Button,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  Text,
  Pressable,
  Box,
  Image,
  Heading,
  VStack,
  HStack,
  Stack,
  Divider,
} from "native-base";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersSlice";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  useAddReactionMutation,
  useGetPostsByUserIdQuery,
} from "../../features/posts/postsSlice";
import { HomeStackParamList } from "../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
type UserPageRouteProp = RouteProp<HomeStackParamList, "SingleUser">;
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
};
const UserPage: React.FC<{}> = () => {
  const {
    params: { userId, userName },
  } = useRoute<UserPageRouteProp>();
  const navigation = useNavigation();
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  const [addReaction] = useAddReactionMutation();
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
  const postCard = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
         navigation.navigate("SinglePost", { post: item })
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Box
            mb={7}
            bg={isPressed ? "#ededed" : "white"}
            p="7"
            rounded="lg"
            style={{ transform: [{ scale: isPressed ? 0.99 : 1 }] }}
          >
            <VStack space="5" alignItems={"center"}>
              <Heading textAlign={"center"} size="md">
                {item.title}
              </Heading>
              <Image
                resizeMode="cover"
                width={Dimensions.get("window").width * 0.8}
                height={150}
                source={{
                  uri: item.photo,
                }}
                alt="image"
              />
              <Text>{item.body}</Text>
            </VStack>
            <Divider mt={4} mb={4} />
            <ReactionButtons item={item} />
          </Box>
        )}
      </Pressable>
    );
  };

  const ReactionButtons = ({ item }) => {
    const reactionButtons = Object.entries(reactionEmoji).map(
      ([name, emoji]) => {
        return (
          <Pressable
            style={{ marginRight: 10 }}
            key={name}
            onPress={() => {
              const newValue = item.reactions[name] + 1;
              addReaction({
                ...item,
                reactions: { ...item.reactions, [name]: newValue },
              });
            }}
          >
           {({ isHovered, isFocused, isPressed }) => (
          <Box style={{transform:[{scale:isPressed ? .9 : 1}]}}>
               <Text>
             {emoji} {item.reactions[name]}
           </Text>
          </Box>
           )}
          </Pressable>
        );
      }
    );

    return <HStack space={2} alignSelf={"center"} >{reactionButtons}</HStack>;
  };
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <FlatList
        data={posts ? Object.values(posts.entities ?? []) : []}
        keyExtractor={(item) => item.id}
        renderItem={postCard}
      />
    </SafeAreaView>
  );
};

export default UserPage;
