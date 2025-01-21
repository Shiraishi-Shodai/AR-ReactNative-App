import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import SwipeToDelete from "./SwipeToDelete";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { StampManager } from "@/classies/StampManager";
import { CommentManager } from "@/classies/CommentManager";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";
import { ARObject } from "@/classies/ARObject";

interface ViewARObjectListProps {
  width: number;
  height: number;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeEnum>>;
}
const MyARObjectList = ({
  width,
  height,
  setModalMode,
}: ViewARObjectListProps) => {
  // モーダルを表示する高さ
  const [modalHeight, setModalHeight] = useState<number>(height * 0.5);
  // あなたの投稿とみんなの投稿のどちらを表示するのか？
  const [yourPosts, setYourPosts] = useState(true);

  // 表示しているモーダルの種類を取得するコンテキスト
  const { ARObjectModalType, setARObjectModalType } = useARObjectModalContext();
  //データを取得する際に使用するマネージャーをコンテキストのARObjectModalTypeによってどの型を使用するか選択する
  const arObjectManager: ARObjectManager =
    ARObjectModalType == ARObjectModalEnum.Stamp
      ? new StampManager()
      : new CommentManager();
  // 取得したデータを配列で保持
  const [arObjectList, setARObjectList] = useState<ARObject[]>([]);
  const { user }: { user: User } = useContext(AuthContext) as { user: User };
  // ローディングアイコンを表示するかどうかのref
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 即時実行関数(IIFE)を使用し、自分が投稿したスタンプまたはコメントの一覧データを取得
    (async () => {
      const result = yourPosts
        ? await arObjectManager.listMyARObjects(user)
        : await arObjectManager.listAllARObjects();
      // 何もデータが帰ってこなけらばこの処理は中断する
      if (!result) return;

      setARObjectList([...result]);
      setIsLoading(false);
    })();
  }, [yourPosts]);

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
            <View style={styles.tabsView}>
              <Pressable
                onPress={() => {
                  setYourPosts(true);
                  // ローディングのActivityIndicatorコンポーネントを表示するためにARObjectListとisLoadingをリセット
                  setARObjectList([]);
                  setIsLoading(true);
                }}
                style={[
                  styles.tabView,
                  {
                    opacity: yourPosts ? 0.3 : 1,
                    paddingVertical: height * 0.015,
                    paddingHorizontal: width * 0.01,
                  },
                ]}
              >
                <Text style={styles.modalText}>あなたの投稿</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  // ローディングのActivityIndicatorコンポーネントを表示するためにARObjectListとisLoadingをリセット
                  setYourPosts(false);
                  setARObjectList([]);
                  setIsLoading(true);
                }}
                style={[
                  styles.tabView,
                  {
                    opacity: yourPosts ? 1 : 0.3,
                    paddingVertical: height * 0.015,
                    paddingHorizontal: width * 0.01,
                  },
                ]}
              >
                <Text style={styles.modalText}>みんなの投稿</Text>
              </Pressable>
            </View>

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
          {/* リストの要素が0このとき、ローディング画面を表示 */}
          {arObjectList.length > 0 ? (
            <SwipeToDelete arObjectList={arObjectList} />
          ) : isLoading ? (
            <ActivityIndicator
              animating={true}
              color="gray"
              size="large"
              style={styles.activityIndicator}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>No Data</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default MyARObjectList;

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
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  swipeListWrapper: {
    justifyContent: "center",
  },
  tabsView: {
    backgroundColor: "#EEEEEE",
    flexDirection: "row",
    position: "relative",
    height: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
  tabView: {
    borderRightWidth: 1,
    borderColor: "black",
  },
  activityIndicator: {
    position: "relative",
    top: "40%",
    transform: [{ scale: 2 }], // 要素を2倍大きく表示する
  },
});
