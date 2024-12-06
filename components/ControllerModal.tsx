import React, { SetStateAction } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface ControllerModalProps {
  modlaVisible: boolean;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  x: number;
  y: number;
}
const ControllerModal = ({
  modlaVisible,
  setModalVisible,
  x,
  y,
}: ControllerModalProps) => {
  return (
    <Modal transparent={true} visible={modlaVisible}>
      <View
        style={[
          styles.popup,
          {
            top: y, // 長押しされたY座標
            left: x, // 長押しされたX座標
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => console.log("ここで離されました")}
        onResponderTerminate={() => console.log("onResponderTerminate")}
      >
        <Text style={styles.popupText}>ここを長押ししました！</Text>
      </View>
    </Modal>
  );
};

export default ControllerModal;

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  popupText: {
    color: "white",
    fontSize: 16,
  },
});
