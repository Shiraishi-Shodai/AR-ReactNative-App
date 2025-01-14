import { Image, useWindowDimensions } from "react-native";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";

interface RenderItemProps {
  item: {
    key: string;
    text: string;
  };
  animatedValue: Animated.Value;
  width: number;
  height: number;
}
const RenderItem = ({
  item,
  animatedValue,
  width,
  height,
}: RenderItemProps) => {
  return (
    // アニメーションが可能なビュー
    <Animated.View
      style={[
        styles.rowFrontContainer,
        { width: width * 0.95 },
        {
          // アニメーションの動きを定義
          height: animatedValue.interpolate({
            inputRange: [0, 1], // animatedValueは0~1の入力を受け取る
            outputRange: [0, height * 0.1], // 0を入力したとき高さは0すなわち見えなくなる, 1のとき高さはheight * 0.1。項目1つ分のデフォルトの高さ
          }),
        },
      ]}
    >
      <TouchableHighlight
        style={[styles.rowFront, { height: height * 0.09 }]}
        underlayColor={"#AAA"}
        onPress={() => console.log("Hello")}
      >
        <View style={styles.item}>
          <Image
            source={require("../assets/images/a.png")}
            style={{ width: width * 0.15, height: width * 0.15 }}
            resizeMode={"cover"}
          />
          <View style={{ paddingLeft: width * 0.02 }}>
            <Text>I am {item.text} in a SwipeListView</Text>

            <View style={styles.location}>
              {/* マップアイコン */}
              <FeatherIcon name="map-pin" size={width * 0.05} />
              {/* 緯度、軽度、高度を表示 */}
              <Text>35.1122, 137.1039, 50.111</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  rowFrontContainer: {
    backgroundColor: "white",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    width: "95%",
  },
  description: {},
  location: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
});
