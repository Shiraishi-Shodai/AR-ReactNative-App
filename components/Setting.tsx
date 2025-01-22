import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import UserIcon from "./UserIcon";
import { AuthContext } from "./AuthProvider";
import { User } from "@/classies/User";
import LogOutButton from "./LogoutButton";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const iconBaseSize = SCREEN_HEIGHT * 0.15;

interface SettingInterface {
  settingModalVisible: boolean;
  setSettingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Setting = ({
  settingModalVisible,
  setSettingModalVisible,
}: SettingInterface) => {
  const { user }: { user: User } = useContext(AuthContext) as { user: User };
  // Modalの表示非表示をコントロールするステート
  return (
    <Modal
      transparent={true}
      visible={settingModalVisible}
      statusBarTranslucent={true}
    >
      {/* 背景をタップするとモーダルを閉じる */}
      <TouchableWithoutFeedback onPress={() => setSettingModalVisible(false)}>
        <View style={styles.overlay}>
          {/* モーダルコンテンツ */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalContentInside}>
                <UserIcon userIconStyles={userIconStyles} />

                <View style={styles.displayNameEmail}>
                  <View>
                    <Text style={styles.displayName}>{user.displayName}</Text>
                  </View>
                  <View>
                    <Text style={styles.email}>{user.email}</Text>
                  </View>
                </View>

                <LogOutButton />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Setting;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: SCREEN_HEIGHT * 0.5, // 画面の半分の高さに設定
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalContentInside: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  displayNameEmail: {
    alignItems: "center",
  },
  displayName: {
    fontSize: 25,
  },
  email: {
    fontSize: 15,
  },
});

const userIconStyles = StyleSheet.create({
  iconContainer: {
    top: "10%",
  },
  iconSize: {
    width: iconBaseSize,
    height: iconBaseSize,
    borderRadius: iconBaseSize / 2,
  },
});
