import React, { useState } from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import HomeScene from "@/components/HomeScene";
import {
  Gesture,
  GestureDetector,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";
import ControllerModal from "@/components/ControllerModal";
import { AbsoluteAreaEnum } from "@/constants/AbsoluteAreaEnum";
import TextInputModal from "@/components/TextInputModal";
import StampModal from "@/components/ARObjectModal";
import UserIcon from "@/components/UserIcon";
import { useRouter } from "expo-router";
import { runOnJS } from "react-native-reanimated";
import Setting from "@/components/Setting";
import ARObjectModal from "@/components/ARObjectModal";

const HomeScreen = () => {
  const router = useRouter();

  // ControllModalの表示非表示をコントロールするステート
  const [controllModalVisible, setControllModalVisible] =
    useState<boolean>(false);
  // SettingModalの表示非表示をコントロールするステート
  const [settingModalVisible, setSettingModalVisible] =
    useState<boolean>(false);
  // 押した場所を保持
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // スクリーンのサイズを取得(ピクセル単位)
  const { height, width } = useWindowDimensions();
  const screenHeight = height;
  const screenWidth = width;

  // 指が今どこにいるか？
  const [absoluteArea, setAbsoluteArea] = useState<AbsoluteAreaEnum>(
    AbsoluteAreaEnum.Upper
  );
  // 長押しが解除されたか？
  const [isLongPressEND, setIsLongPressEND] = useState(false);

  // コントロールを表示するエリアの大きさ(直径をデバイスの幅の0)
  const controllAreaDiameter = screenWidth * 0.5;
  const controllArea = {
    width: controllAreaDiameter,
    height: controllAreaDiameter,
    radius: controllAreaDiameter / 2,
  };

  // ユーザーアイコンをタップするジェスチャー
  const showSettingModal = () => {
    setSettingModalVisible(true);
  };
  const tap = Gesture.Tap().onEnd(runOnJS(showSettingModal));

  // 指がどこにコントロールエリアのどこに置かれているかを返却
  const whereAbsoluteArea = (absoluteX: number, absoluteY: number) => {
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
      // エリア内
      // 円の上半分で指を離したか？
      if (absoluteY <= controllAreaCenter.y) {
        // 上半分
        return AbsoluteAreaEnum.Upper;
      } else {
        // 下半分
        return AbsoluteAreaEnum.Lower;
      }
    } else {
      // エリア外
      return AbsoluteAreaEnum.Out;
    }
  };

  // 長押しの状態が変化したときの処理
  const handleStateChange = (event: any) => {
    // isLongPressENDがtrueの時、falseにする
    if (isLongPressEND) setIsLongPressEND(false);
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
        setControllModalVisible(true);
        break;
      case State.END: // 長押しをして指を離したとき
        const res: AbsoluteAreaEnum = whereAbsoluteArea(absoluteX, absoluteY);
        setAbsoluteArea(res);
        // 長押しが終わったという状態に更新
        setIsLongPressEND(true);
        // モーダルを閉じる
        setControllModalVisible(false);
        break;
      case State.CANCELLED: // 長押し中に移動可能な範囲を超えた時
        // モーダルを閉じる
        setControllModalVisible(false);
        break;
      default:
    }
  };

  // 長押し中に指が移動するたびに発火する処理
  const handleActiveGesture = (event: any) => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    // コントロールエリアのどの位置に指を置いているかを取得
    const res: AbsoluteAreaEnum = whereAbsoluteArea(absoluteX, absoluteY);
    // 現在の状態と変更があれば状態を更新する
    if (res != absoluteArea) setAbsoluteArea(res);
  };

  return (
    <LongPressGestureHandler
      maxDist={screenHeight} // スクリーンの高さに調整することで実質どこに指を動かしてもキャンセルにならないようにする
      onHandlerStateChange={handleStateChange} // 長押ししている状態が変わるたびに発火する
      minDurationMs={500} // 長押しとみなす時間（ミリ秒）
      onGestureEvent={handleActiveGesture} // 長押し中に指が移動するたびに発火する
    >
      <View style={styles.container}>
        <GestureDetector gesture={tap}>
          <UserIcon userIconStyles={userIconStyles} />
        </GestureDetector>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HomeScene,
          }}
          style={{ flex: 1 }}
        />

        <ControllerModal
          modlaVisible={controllModalVisible}
          x={position.x}
          y={position.y}
          width={controllArea.width}
          height={controllArea.height}
          radius={controllArea.radius}
          absoluteArea={absoluteArea}
        />

        {/* //設定モーダルを表示 */}
        <Setting
          settingModalVisible={settingModalVisible}
          setSettingModalVisible={setSettingModalVisible}
        />
        {isLongPressEND && absoluteArea === AbsoluteAreaEnum.Upper && (
          // スタンプ追加モーダルを表示
          <ARObjectModal />
        )}
        {isLongPressEND && absoluteArea === AbsoluteAreaEnum.Lower && (
          // テキスト追加モーダルを表示
          <ARObjectModal />
        )}
      </View>
    </LongPressGestureHandler>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const userIconStyles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: "7%",
    left: "83%",
    zIndex: 1,
  },
  iconSize: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
