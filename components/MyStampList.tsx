import { Stamp } from "@/classies/Stamp";
import { StampManager } from "@/classies/StampManager";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import SwipeToDelete from "./SwipeToDelete";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";

interface MyStampListProps {
  width: number;
  height: number;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeEnum>>;
}
const MyStampList = ({ width, height, setModalMode }: MyStampListProps) => {
  const stampManager = new StampManager();
  const [stampArray, setStampArray] = useState<Stamp[]>([]);
  const [modalHeight, setModalHeight] = useState<number>(height * 0.5);
  const { user }: { user: User } = useContext(AuthContext) as { user: User };

  useEffect(() => {
    // 即時実行関数(IIFE)を使用し、自分が投稿したスタンプ一覧データを取得
    (async () => {
      const result = await stampManager.listMyARObjects(user.id);
      setStampArray([...result]);
    })();
  }, []);

  return (
    <>
      <Pressable
        onPress={() => setModalMode(ModalModeEnum.Input)}
        style={[styles.plusView, { top: height * 0.43, left: width * 0.8 }]}
      >
        {/* plusのアイコンを2つ重ねている。こうすることで、十字の部分とその周りの色を指定できるようになる */}
        {/* 十字の周りを表示するアイコン*/}
        <AntIcon name="pluscircle" color="#2C7CFF" size={width * 0.15} />
        {/* 十字を表示するアイコン*/}
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
          style={[{ width: width, height: modalHeight }, styles.modalContent]}
        >
          <View style={styles.modalHead}>
            <Text style={styles.modalText}>投稿スタンプ一覧</Text>

            {/* 投稿一覧ビューの高さを変化させる上または下アイコンの実装*/}
            {modalHeight == height * 0.5 ? (
              <Pressable
                onPress={() => {
                  setModalHeight(height); // 上矢印を押すとリストを高さいっぱいまで投稿一覧ビューを表示
                }}
              >
                {/* // 上矢印アイコン  */}
                <EntypoIcon name="chevron-small-up" size={40} color="#444444" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setModalHeight(height * 0.5); // 下矢印を押すとリストをデバイスの高さの半分の高さで投稿一覧ビューを表示
                }}
              >
                {/* 下矢印アイコン */}
                <EntypoIcon
                  name="chevron-small-down"
                  size={40}
                  color="#444444"
                />
              </Pressable>
            )}
          </View>

          {/* 投稿一覧をリストで表示 */}
          <SwipeToDelete />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default MyStampList;

const styles = StyleSheet.create({
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
