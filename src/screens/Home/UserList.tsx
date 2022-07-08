import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../features/users/usersSlice";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  Center,
  Button,
  Divider,
  Stack,
  Heading,
} from "native-base";

type UserListScreenNavigationType = NativeStackNavigationProp<
  HomeStackParamList,
  "UserList"
>;

export default function App() {
  const navigation = useNavigation<UserListScreenNavigationType>();
  const { data: users, isLoading, isError } = useGetUsersQuery("User");
  const UserCard = ({
    item,
    index,
  }: {
    name: string;
    email: string;
    id: number;
  }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("SingleUser", { userId: item.id,userName:item.name })}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Stack
              bg={
                isPressed
                  ? "coolGray.300"
                  : isHovered
                  ? "coolGray.200"
                  : "coolGray.100"
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.98 : 1,
                  },
                ],
              }}
              mb={5}
              direction={["row", "column", "row"]}
              rounded="lg"
              overflow="hidden"
              width={Dimensions.get("window").width * 0.95}
              shadow="1"
              _light={{
                backgroundColor: "coolGray.50",
              }}
              _dark={{
                backgroundColor: "gray.700",
              }}
            >
              <Image
                size={"lg"}
                source={{
                  uri: item.avatar,
                }}
                alt="image"
              />

              <Stack flex="1" p="4" space={[3, 3, 1.5]}>
                <Heading size="xs">{item.name}</Heading>

                <Text isTruncated fontWeight="400">
                  Email : {item.email}
                </Text>
              </Stack>
            </Stack>
          );
        }}
      </Pressable>
    );
  };
  if (isError) return <Text>Error!</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={styles.container}>
  
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(users?.entities) ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={UserCard}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
