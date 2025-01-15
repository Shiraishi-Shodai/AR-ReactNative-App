import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  MutableRefObject,
} from "react";
import {
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
import { StampManager } from "@/classies/StampManager";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { CommentManager } from "@/classies/CommentManager";
import { ARObject } from "@/classies/ARObject";

const SwipeToDelete: React.FC = () => {
  // アニメーションを制御するref
  const ref: MutableRefObject<{
    [id: string]: Animated.Value;
  }> = useRef({});

  // 表示しているモーダルの種類を取得するコンテキスト
  const { ARObjectModalType, setARObjectModalType } = useARObjectModalContext();
  //
  const arObjectManager: ARObjectManager =
    ARObjectModalType == ARObjectModalEnum.Stamp
      ? new StampManager()
      : new CommentManager();
  const [arObjectLlst, setARObjectList] = useState<ARObject[]>([]);
  const { user }: { user: User } = useContext(AuthContext) as { user: User };

  useEffect(() => {
    // 即時実行関数(IIFE)を使用し、自分が投稿したスタンプ一覧データを取得
    (async () => {
      const result = await arObjectManager.listMyARObjects(user.id);
      // 何もデータが帰ってこなけらばこの処理は中断する
      if (!result) return;

      for (let item of result) {
        ref.current[`${item.id}`] = new Animated.Value(1);
      }

      setARObjectList([...result]);
    })();
  }, []);

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
      Animated.timing(ref.current[key], {
        toValue: 0, // アニメーションの最終値
        duration: 200, // アニメーションの時間
        useNativeDriver: false,
      }).start(() => {
        // アニメーション終了後の処理(アイテムの削除処理)
        const newData = [...arObjectLlst];
        const prevIndex = arObjectLlst.findIndex((item) => item.id === key);
        newData.splice(prevIndex, 1);
        setARObjectList(newData);
        animationIsRunning.current = false; // アニメーションが終わることを宣言
      });
    }
  };

  return (
    <View style={styles.container}>
      {ref.current ? (
        <SwipeListView
          disableRightSwipe
          data={arObjectLlst}
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
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange} // 行のtranslateX値が変更されたときに呼び出されるコールバック。
          useNativeDriver={false}
        />
      ) : (
        <View style={{ justifyContent: "center" }}>
          <Text>now loading</Text>
        </View>
      )}
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
