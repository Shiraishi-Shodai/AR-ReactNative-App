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
  // スクリーンのサイズを取得
  const { height, width } = useWindowDimensions();

  // 長押しの状態が変化したときの処理
  const handleStateChange = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { absoluteX, absoluteY } = event.nativeEvent;
      setPosition({ x: absoluteX, y: absoluteY }); // 座標を更新
      setModalVisible(true);
    } else if (event.nativeEvent.state === State.END) {
      setModalVisible(false);
    } else if (event.nativeEvent.state === State.CANCELLED) {
      setModalVisible(false);
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
