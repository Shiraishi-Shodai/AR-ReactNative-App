import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import MyStampList from "./MyStampList";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import InputStamp from "./InputStamp";

const StampModal = () => {
  // Modalの表示非表示をコントロールするステート
  const [modlaVisible, setModalVisible] = useState<boolean>(true);
  // デバイスの画面の幅と高さを取得
  const { width, height } = useWindowDimensions();
  // このモーダル内で自分が投稿したリストを表示するのかそれともスタンプ追加画面を表示するのかを管理するState。
  // デフォルトでは投稿一覧を表示するためModalModeEnum.MyListとする
  const [modalMode, setModalMode] = useState<ModalModeEnum>(
    ModalModeEnum.MyList
  );

  return (
    <Modal
      transparent={true}
      visible={modlaVisible}
      statusBarTranslucent={true}
    >
      {/* 背景をタップするとモーダルを閉じる */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={[styles.overlay]}>
          {/* modalModeがMyListなら投稿一覧ビューを、Inputなら追加ビューを表示 */}
          {modalMode == ModalModeEnum.MyList ? (
            <MyStampList
              width={width}
              height={height}
              setModalMode={setModalMode}
            />
          ) : (
            <InputStamp
              width={width}
              height={height}
              setModalMode={setModalMode}
            />
          )}
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
