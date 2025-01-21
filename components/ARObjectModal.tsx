import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import ViewARObjcetList from "./ViewARObjectList";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import InputStamp from "./InputStamp";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import InputComment from "./InputComment";

const ARObjectModal = () => {
  // Modalの表示非表示をコントロールするステート
  const [modlaVisible, setModalVisible] = useState<boolean>(true);
  // デバイスの画面の幅と高さを取得
  const { width, height } = useWindowDimensions();
  // このモーダル内で自分が投稿したリストを表示するのかそれともスタンプ追加画面を表示するのかを管理するState。
  // デフォルトでは投稿一覧を表示するためModalModeEnum.ARObjectListとする
  const [modalMode, setModalMode] = useState<ModalModeEnum>(
    ModalModeEnum.ARObjectList
  );

  // 表示しているモーダルの種類を取得するコンテキスト
  const { ARObjectModalType, setARObjectModalType } = useARObjectModalContext();

  return (
    <Modal
      transparent={true}
      visible={modlaVisible}
      statusBarTranslucent={true}
    >
      {/* 背景をタップするとモーダルを閉じる */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          {/* modalModeがMyListなら投稿一覧ビューを、Inputなら追加ビューを表示 */}
          {modalMode == ModalModeEnum.ARObjectList ? (
            <ViewARObjcetList
              width={width}
              height={height}
              setModalMode={setModalMode}
            />
          ) : // コンテキストがスタンプならスタンプ追加画面を
          ARObjectModalType == ARObjectModalEnum.Stamp ? (
            <InputStamp
              width={width}
              height={height}
              setModalMode={setModalMode}
            />
          ) : (
            // それ以外の場合はコンテキストがコメントなのでコメント追加画面を
            <InputComment
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

export default ARObjectModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "flex-end",
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
