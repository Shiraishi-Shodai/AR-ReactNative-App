import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  MutableRefObject,
} from "react";
import {
  ActivityIndicator,
  Animated,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import RenderItem from "./RenderItem";
import RenderHiddenItem from "./RenderHiddenItem";
import { ARObject } from "@/classies/ARObject";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { StampManager } from "@/classies/StampManager";
import { CommentManager } from "@/classies/CommentManager";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";

interface SwipeToDeleteProps {
  arObjectList: ARObject[];
}
const SwipeToDelete: React.FC<SwipeToDeleteProps> = ({ arObjectList }) => {
  // アニメーションを制御するref
  const ref: MutableRefObject<{
    [id: string]: Animated.Value;
  }> = useRef({});
  // デフォルトで全てのキーのアニメーションの値を1に設定
  for (let item of arObjectList) {
    ref.current[`${item.id}`] = new Animated.Value(1);
  }
  const { height, width } = useWindowDimensions();
  // アニメーションが実行中か管理する
  const animationIsRunning = useRef(false);

  // 表示しているモーダルの種類を取得するコンテキスト
  const { ARObjectModalType, setARObjectModalType } = useARObjectModalContext();
  //データを取得する際に使用するマネージャーをコンテキストのARObjectModalTypeによってどの型を使用するか選択する
  const arObjectManager: ARObjectManager =
    ARObjectModalType == ARObjectModalEnum.Stamp
      ? new StampManager()
      : new CommentManager();

  const { user }: { user: User } = useContext(AuthContext) as { user: User };

  // アイテムをスワイプ中に実行する関数
  const onSwipeValueChange = (swipeData: {
    key: string; // アイテムのキー
    value: number; // スワイプの距離
    isOpen: boolean; // スワイプが開かれているか
  }) => {
    const { key, value } = swipeData;
    if (
      // スワイプした幅がwindowよりも大きいかつ、アニメーション中のとき
      value < -width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true; // アニメーション中フラグをtrueにしてアニメーションの二重実行を防止
      Animated.timing(ref.current[key], {
        toValue: 0, // アニメーションの最終値
        duration: 200, // アニメーションの時間
        useNativeDriver: false,
      }).start(() => {
        arObjectManager.deleteARObjects(key, user.id);
        animationIsRunning.current = false; // アニメーションが終わることを宣言
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* データベースから取得したデータをarObjectListに代入出来たらビューを表示そうでないならローディングを表示 */}
      <SwipeListView
        disableRightSwipe
        data={arObjectList}
        keyExtractor={(item) => item.id.toString()} // arObjectLlstの各オブジェクトはkeyプロパティを含まないため明示的にidをkeyとして扱う
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            animatedValue={ref.current[item.id]}
            width={width}
            height={height}
          />
        )}
        // 後ろに隠れている削除アイコンが表示されたビュー
        renderHiddenItem={(rowData: ListRenderItemInfo<ARObject>, rowMap) => (
          <RenderHiddenItem
            rowData={rowData}
            rowMap={rowMap}
            width={width}
            height={height}
          />
        )}
        rightOpenValue={-width}
        previewRowKey={"0"}
        previewOpenValue={-100}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange} // 行のtranslateX値が変更されたときに呼び出されるコールバック。
        useNativeDriver={false}
      />
    </View>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  rowFrontContainer: {
    backgroundColor: "white",
  },
});
