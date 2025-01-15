import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Animated,
  ListRenderItemInfo,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import RenderItem from "./RenderItem";
import RenderHiddenItem from "./RenderHiddenItem";
import { StampManager } from "@/classies/StampManager";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { CommentManager } from "@/classies/CommentManager";
import { ARObject } from "@/classies/ARObject";

const rowTranslateAnimatedValues: { [key: string]: Animated.Value } = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

const SwipeToDelete: React.FC = () => {
  // 表示しているモーダルの種類を取得するコンテキスト
  const { ARObjectModalType, setARObjectModalType } = useARObjectModalContext();
  console.log(ARObjectModalType);
  const arObjectManager: ARObjectManager =
    ARObjectModalType == ARObjectModalEnum.Stamp
      ? new StampManager()
      : new CommentManager();
  const [arObjectArray, setARObjectArray] = useState<ARObject[]>([]);
  const { user }: { user: User } = useContext(AuthContext) as { user: User };

  useEffect(() => {
    // 即時実行関数(IIFE)を使用し、自分が投稿したスタンプ一覧データを取得
    (async () => {
      const result = await arObjectManager.listMyARObjects(user.id);
      console.log(result);
      setARObjectArray([...result]);
    })();
  }, []);

  const [listData, setListData] = useState(
    Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const { height, width } = useWindowDimensions();

  // アニメーションが実行中か管理する
  const animationIsRunning = useRef(false);

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
      //
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0, // アニメーションの最終値
        duration: 200, // アニメーションの時間
        useNativeDriver: false,
      }).start(() => {
        // アニメーション終了後の処理(アイテムの削除処理)
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        animationIsRunning.current = false; // アニメーションが終わることを宣言
      });
    }
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={({ item }) => (
          // 前に表示されるビュー
          <RenderItem
            item={item}
            animatedValue={rowTranslateAnimatedValues[item.key]}
            width={width}
            height={height}
          />
        )}
        // 後ろに隠れている削除アイコンが表示されたビュー
        renderHiddenItem={(
          rowData: ListRenderItemInfo<{ key: string; text: string }>,
          rowMap
        ) => (
          <RenderHiddenItem
            rowData={rowData}
            rowMap={rowMap}
            width={width}
            height={height}
          />
        )}
        rightOpenValue={-width}
        previewRowKey={"0"}
        previewOpenValue={-40}
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
