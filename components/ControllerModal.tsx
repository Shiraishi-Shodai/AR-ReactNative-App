import { AbsoluteAreaEnum } from "@/constants/AbsoluteAreaEnum";
import React, { SetStateAction } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface ControllerModalProps {
  modlaVisible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  absoluteArea: AbsoluteAreaEnum;
}
const ControllerModal = ({
  modlaVisible,
  x,
  y,
  width,
  height,
  radius,
  absoluteArea,
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
      >
        {/*  上半分 */}
        <View
          style={[
            styles.upperHalf,
            absoluteArea === AbsoluteAreaEnum.Upper && { opacity: 0.5 },
          ]}
        >
          <Text style={styles.text}>スタンプ</Text>
        </View>
        {/* 下半分 */}
        <View
          style={[
            styles.lowerHalf,
            absoluteArea === AbsoluteAreaEnum.Lower && { opacity: 0.5 },
          ]}
        >
          <Text style={styles.text}>テキスト</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ControllerModal;

const styles = StyleSheet.create({
  popup: {
    position: "absolute", // 画面全体を起点として位置を指定するためにabsoluteとする
    backgroundColor: "white",
    overflow: "hidden", // はみ出した子要素は表示しない
  },
  popupText: {
    color: "blue",
    fontSize: 16,
  },
  upperHalf: {
    // 親要素の左上を起点とする
    position: "absolute",
    top: 0, // 子ノードの上端を親ノードの上端に一致させる
    left: 0, // 子ノードの左端を親ノードの左端に一致させる
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(255, 0, 0, 0.5)", // 赤でデバッグ用
    justifyContent: "center",
    alignItems: "center",
  },
  lowerHalf: {
    // 親要素の左上を起点とする
    position: "absolute",
    bottom: 0, // 子ノードの下端を親ノードの下端に一致させる
    left: 0, // 子ノードの左端を親ノードの左端に一致させる
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(0, 255, 0, 0.5)", // 緑でデバッグ用
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
