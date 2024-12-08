import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";

const StampModal = () => {
  // Modalの表示非表示をコントロールするステート
  const [modlaVisible, setModalVisible] = useState<boolean>(true);
  return (
    <Modal transparent={true} visible={modlaVisible}>
      {/* 背景をタップするとモーダルを閉じる */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          {/* モーダルコンテンツ */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Hello, Stamp Modal!</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StampModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
