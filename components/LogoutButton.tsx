import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LogOutButton = () => {
  const signOut = async () => {
    try {
      const oldUser = GoogleSignin.getCurrentUser();
      if (!oldUser)
        throw Error("認証済みのGoogleアカウントが見つかりませんでした");

      if (oldUser.idToken) {
        await GoogleSignin.clearCachedAccessToken(oldUser.idToken);
        await GoogleSignin.revokeAccess();
      }

      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (e: any) {
      console.error(e.code, e.message);
    }
  };

  return (
    <Pressable style={styles.button} onPress={signOut}>
      <Text style={styles.buttonText}>ログアウト</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    padding: 10,
    bottom: "8%",
    backgroundColor: "#0c0d0e",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default LogOutButton;
