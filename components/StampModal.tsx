import { Stamp } from "@/classies/Stamp";
import { StampManager } from "@/classies/StampManager";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  useWindowDimensions,
  ListRenderItemInfo,
} from "react-native";
import SwipeToDelete from "./SwipeToDelete";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";

const StampModal = () => {
  // Modalの表示非表示をコントロールするステート
  const [modlaVisible, setModalVisible] = useState<boolean>(true);
  const stampManager = new StampManager();
  const [stampArray, setStampArray] = useState<Stamp[]>([]);
  const { width, height } = useWindowDimensions();
  const [modalHeight, setModalHeight] = useState<number>(height * 0.5);

  useEffect(() => {
    // 即時実行関数(IIFE)を使用する
    (async () => {
      const result = await stampManager.getARObjects();
      setStampArray([...result]);
    })();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={modlaVisible}
      statusBarTranslucent={true}
    >
      {/* 背景をタップするとモーダルを閉じる */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={[styles.overlay]}>
          <Pressable
            style={[styles.plusView, { top: height * 0.43, left: width * 0.8 }]}
          >
            <AntIcon name="pluscircle" color="#2C7CFF" size={width * 0.15} />
            <AntIcon
              name="plus"
              size={width * 0.15}
              color="white"
              style={{ position: "absolute" }}
            />
          </Pressable>
          {/* モーダルコンテンツ */}
          <TouchableWithoutFeedback>
            <View
              style={[
                { width: width, height: modalHeight },
                styles.modalContent,
              ]}
            >
              <View style={styles.modalHead}>
                <Text style={styles.modalText}>投稿画像一覧</Text>
                {/* 上矢印を押すとリストを高さいっぱいまで表示 */}
                {modalHeight == height * 0.5 ? (
                  <Pressable
                    onPress={() => {
                      setModalHeight(height);
                    }}
                  >
                    <EntypoIcon
                      name="chevron-small-up"
                      size={40}
                      color="#444444"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      setModalHeight(height * 0.5);
                    }}
                  >
                    <EntypoIcon
                      name="chevron-small-down"
                      size={40}
                      color="#444444"
                    />
                  </Pressable>
                )}
              </View>

              <SwipeToDelete />
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  plusView: {
    position: "absolute",
  },
  modalContent: {
    backgroundColor: "white",
  },
  modalHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
  },
  swipeListWrapper: {
    justifyContent: "center",
  },
});
