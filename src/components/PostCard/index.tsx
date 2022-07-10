import { View, Text, Pressable, Dimensions } from "react-native";
import React, { FC } from "react";
import { Box, Divider, Heading, Image, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../../types/Models";
import ReactionButtons from "../ReactionButtons";
import { useSelector } from "react-redux";
import { selectPostById } from "../../features/posts/postsSlice";

const PostCard: FC<{ postId: string }> = ({ postId }) => {
  const navigation = useNavigation();
  const item: Post = useSelector((state) => selectPostById(state, postId));
  return (
    <View>
      {!!item && (
        <Pressable
          onPress={() => {
            navigation.navigate("SinglePost", { postId: item.id });
          }}
        >
          <Box mb={7} bg={"#ededed"} p="7" rounded="lg">
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
        </Pressable>
      )}
    </View>
  );
};
export default React.memo(PostCard);
