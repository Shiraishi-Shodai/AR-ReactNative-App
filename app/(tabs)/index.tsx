import React, { useContext } from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";

import { StyleSheet, Text, View } from "react-native";
import HomeScene from "@/components/HomeScene";
import { AuthContext } from "@/components/AuthProvider";
import LogOutButton from "@/components/LogoutButton";
import { StampManager } from "@/classies/StampManager";
import StampView from "@/components/StampView";

export default () => {
  const sm = new StampManager()
  console.log(sm.getARojects())
  const { user } = useContext(AuthContext);
  return (
    // <ViroARSceneNavigator
    //   autofocus={true}
    //   initialScene={{
    //     scene: TMP,
    //   }}
    //   //   style={styles.f1}
    // />
    <View style={styles.f1}>
      <Text style={{ color: "white" }}>Hello {user?.displayName}</Text>
      <LogOutButton />
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1, alignItems: "center", justifyContent: "center" },
  helloWorldTextStyle: {
    color: "#ffffff",
    textAlign: "center",
  },
});
