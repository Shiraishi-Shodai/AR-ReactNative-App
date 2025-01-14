import React, { useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import RenderItem from "./RenderItem";
import RenderHiddenItem from "./RenderHiddenItem";

const rowTranslateAnimatedValues: { [key: string]: Animated.Value } = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

const SwipeToDelete: React.FC = () => {
  const [listData, setListData] = useState(
    Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const { height, width } = useWindowDimensions();

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = (swipeData: {
    key: string; // アイテムのキー
    value: number; // スワイプの距離
    isOpen: boolean; // スワイプが開かれているか
  }) => {
    const { key, value } = swipeData;
    if (
      // スワイプした幅がwindowよりも大きいかつ、アニメーション中のとき
      value < -Dimensions.get("window").width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true; // アニメーション中フラグをtrueにして二重実行を防止
      //
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0, // アニメーションの最終位置
        duration: 200, // アニメーションの時間
        useNativeDriver: false,
      }).start(() => {
        // アニメーション終了後の処理(アイテムの削除処理)
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        animationIsRunning.current = false;
      });
    }
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            animatedValue={rowTranslateAnimatedValues[item.key]}
            width={width}
            height={height}
          />
        )}
        // ListRenderItemInfo<{ key: string; text: string; }>
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
