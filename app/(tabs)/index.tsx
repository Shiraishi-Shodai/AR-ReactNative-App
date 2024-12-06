import React, { useContext, useState } from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from "react-native";
import HomeScene from "@/components/HomeScene";
import { AuthContext } from "@/components/AuthProvider";
import LogOutButton from "@/components/LogoutButton";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import ControllerModal from "@/components/ControllerModal";

export default () => {
  const { user } = useContext(AuthContext);
  // モーダルの表示非表示をコントロールするステート
  const [modlaVisible, setModalVisible] = useState<boolean>(false);
  // 押した場所を保持
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 座標を管理
  // スクリーンのサイズを取得(ピクセル単位)
  const { height, width } = useWindowDimensions();
  // コントロールを表示するエリア
  const controllArea = {
    width: 200,
    height: 200,
    radius: 100,
  };

  // 長押しの状態が変化したときの処理
  const handleStateChange = (event: any) => {
    // 指の状態、指の位置のX座標、指の位置のY座標
    const { state, absoluteX, absoluteY } = event.nativeEvent;

    switch (state) {
      case State.ACTIVE: // 長押しをしたとき
        // タップをした位置にビューの中心がくるような位置を求めてセットする
        setPosition({
          x: absoluteX - controllArea.width / 2,
          y: absoluteY - controllArea.height / 2,
        });
        // モーダルを表示する
        setModalVisible(true);
        break;
      case State.END: // 長押しをして指を離したとき
        // ビューの中心の座標 = タップをした位置 を求める
        const controllAreaCenter = {
          x: position.x + controllArea.width / 2,
          y: position.y + controllArea.height / 2,
        };
        // 円の中心から指を離した位置までのユーグリッド距離を求める
        const distance = Math.sqrt(
          Math.pow(absoluteX - controllAreaCenter.x, 2) +
            Math.pow(absoluteY - controllAreaCenter.y, 2)
        );
        // 円の内側で指を離したか？
        if (distance <= controllArea.radius) {
          console.log("エリア内で指が離されました");
          // 円の上半分で指を離したか？
          if (absoluteY <= controllAreaCenter.y) {
            console.log("上半分で指を離しました");
          } else {
            console.log("下半分で指を離しました");
          }
        }
        // モーダルを閉じる
        setModalVisible(false);
        break;
      case State.CANCELLED: // 長押し中に移動可能な範囲を超えた時
        // モーダルを閉じる
        setModalVisible(false);
        break;
      default:
    }
  };

  return (
    <LongPressGestureHandler
      maxDist={height} // スクリーンの高さに調整することで実質どこに指を動かしてもキャンセルにならないようにする
      onHandlerStateChange={handleStateChange}
      minDurationMs={500} // 長押しとみなす時間（ミリ秒）
    >
      <View style={styles.container}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HomeScene,
          }}
          style={{ flex: 1 }}
        />

        <ControllerModal
          modlaVisible={modlaVisible}
          setModalVisible={setModalVisible}
          x={position.x}
          y={position.y}
          width={controllArea.width}
          height={controllArea.height}
          radius={controllArea.radius}
        />
      </View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
