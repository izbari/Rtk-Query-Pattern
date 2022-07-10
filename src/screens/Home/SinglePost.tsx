import {
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectPostById,
  useAddNewPostMutation,
  useAddReactionMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../features/posts/postsSlice";
import Loading from "../../components/Loading";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  Button,
  Box,
  Divider,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  TextArea,
  VStack,
  Modal,
  KeyboardAvoidingView,
  Center,
  Spinner,
} from "native-base";
import { useSelector } from "react-redux";
interface post {
  title: string;
  body: string;
  id: any;
  userId: string;
  reactions: any;
}
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
};
type SinglePostRouteType = RouteProp<HomeStackParamList, "SinglePost">;
const SinglePost: FC = () => {
  const {
    params: { postId },
  } = useRoute<SinglePostRouteType>();
  const post = useSelector(state=> selectPostById(state,postId))
  console.log(post)
  const [addReaction] = useAddReactionMutation();
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
  const LoadingModal = () => {
    return (
      <Center>
        <Modal
          isOpen={loading.status}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.Header textAlign={"center"}>
              {"Post updating..."}
            </Modal.Header>
            <Modal.Body>
              <Spinner size="lg" />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  const onChangeText = (key: string, text: string) => {
    setUpdatedPost({
      ...updatedPost,
      [key]: text,
    });
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
              <Box style={{ transform: [{ scale: isPressed ? 0.9 : 1 }] }}>
                <Text>
                  {emoji} {item.reactions[name]}
                </Text>
              </Box>
            )}
          </Pressable>
        );
      }
    );

    return (
      <HStack space={2} alignSelf={"center"}>
        {reactionButtons}
      </HStack>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView>
          {loading.status && <LoadingModal />}
          <Box bg={"lightgrey"} m={5} p="5" rounded="lg">
            <VStack space="5" alignItems={"center"}>
              <Heading textAlign={"center"} size="md">
                {post.title}
              </Heading>
              <Image
                resizeMode="cover"
                width={Dimensions.get("window").width * 0.8}
                height={150}
                source={{
                  uri: post.photo,
                }}
                alt="image"
              />
              <Text>{post.body}</Text>
            </VStack>
            <Divider mt={4} mb={4} />
            <ReactionButtons item={post} />
          </Box>
          <Stack
            space={2.5}
            alignSelf="center"
            px="4"
            mt="4"
            w={{
              base: "100%",
              md: "25%",
            }}
          >
            <Box>
              <Heading textAlign={"center"}>Edit</Heading>
              <FormControl mb="5">
                <FormControl.Label>Post Title</FormControl.Label>
                <TextArea
                  h={10}
                  placeholder="Give a nice title"
                  w="100%"
                  autoCompleteType={undefined}
                  onChangeText={(text) => onChangeText("title", text)}
                  value={updatedPost.title}
                />
              </FormControl>
              <FormControl mb="5">
                <FormControl.Label>Post Description</FormControl.Label>
                <TextArea
                  h={20}
                  placeholder="Say something about your post"
                  w="100%"
                  autoCompleteType={undefined}
                  onChangeText={(text) => onChangeText("body", text)}
                  value={updatedPost.body}
                />
              </FormControl>
            </Box>
          </Stack>
          <VStack>
            <Button
              onPress={async () => {
                await updatePost(updatedPost);

                navigation.goBack();
              }}
              leftIcon={
                <Icon
                  name="save-outline"
                  type="Ionicons"
                  color="white"
                  size={14}
                />
              }
              colorScheme="success"
            >
              Save
            </Button>

            <Button
              colorScheme="error"
              onPress={async () => {
                await deletePost(post);
                navigation.goBack();
              }}
              leftIcon={
                <Icon
                  name="trash-outline"
                  type="Ionicons"
                  color="white"
                  size={16}
                />
              }
            >
              Delete
            </Button>
           
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SinglePost;
