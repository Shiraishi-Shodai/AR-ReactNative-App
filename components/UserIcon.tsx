import React, { useContext } from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { AuthContext } from "./AuthProvider";
import { User } from "@/classies/User";
interface UserIconProps {
  userIconStyles: {
    iconContainer: StyleProp<ViewStyle>;
    iconSize: StyleProp<ImageStyle>;
  };
}
// Googleアカウントのアイコンを表示
const UserIcon = ({ userIconStyles }: UserIconProps) => {
  const { user }: { user: User } = useContext(AuthContext) as { user: User };
  return (
    <View style={userIconStyles.iconContainer}>
      <Image
        style={userIconStyles.iconSize}
        source={
          user
            ? { uri: user.photoURL }
            : require("@/assets/images/react-logo.png")
        }
      />
    </View>
  );
};

export default UserIcon;
