import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../features/users/usersSlice";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../../types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <TouchableOpacity
        onPress={() => navigation.navigate("SingleUser", { userId: item.id })}
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          backgroundColor: "#eeee",
          padding: 5,
          borderRadius: 15,
          width: Dimensions.get("window").width * 0.9,
          margin: 10,
        }}
      >
        <Image
          source={{
            uri: `https://randomuser.me/api/portraits/men/${index}.jpg`,
          }}
          style={{
            width: 100,
            height: 75,
            borderRadius: 10,
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <Text>Id: {item.id}</Text>
          <Text>Name {item.name}</Text>
          <Text>Email {item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (isError) return <Text>Error!</Text>;
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          color: "#000",
          margin: 10,
          padding: 10,
        }}
      >
        Users
      </Text>
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
    justifyContent: "center",
  },
});
