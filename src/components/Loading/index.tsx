import React from "react";
import { View, Dimensions } from "react-native";
import Lottie from "lottie-react-native";
const { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Lottie
        source={require("../../assets/loading.json")}
        style={{ width: width / 4, height: height / 6 }}
        autoPlay
        loop
      />
    </View>
  );
}
