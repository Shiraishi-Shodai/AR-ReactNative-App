import React, { SetStateAction } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

interface ControllerModalProps {
  modlaVisible: boolean;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}
const ControllerModal = ({
  modlaVisible,
  setModalVisible,
  x,
  y,
  width,
  height,
  radius,
}: ControllerModalProps) => {
  return (
    <Modal transparent={true} visible={modlaVisible}>
      <View
        style={[
          styles.popup,
          {
            top: y, // 長押しされたY座標
            left: x, // 長押しされたX座標
            width: width, // ビューの幅
            height: height, // ビューの高さ
            borderRadius: radius, // 四つ角の丸み
          },
        ]}
      ></View>
    </Modal>
  );
};

export default ControllerModal;

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
  },
  popupText: {
    color: "white",
    fontSize: 16,
  },
});
