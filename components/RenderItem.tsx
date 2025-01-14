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
    <Animated.View
      style={[
        styles.rowFrontContainer,
        { width: width * 0.95 },
        {
          height: animatedValue.interpolate({
            inputRange: [0, 1], // animatedValueは0~1の入力を受け取る
            outputRange: [0, height * 0.1], // 0を入力したとき高さは0, 1のとき高さは70
          }),
        },
      ]}
    >
      <TouchableHighlight
        style={[styles.rowFront, { height: height * 0.09 }]}
        underlayColor={"#AAA"}
      >
        <View style={{ backgroundColor: "white", flexDirection: "row" }}>
          <Image
            source={{
              uri: "https://placehold.co/100x100",
            }}
            style={{ width: 20, height: 20 }}
            resizeMode={"cover"}
          />
          <View style={styles.description}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <FeatherIcon name="map-pin" size={width * 0.05} />
              <Text>I am {item.text} in a SwipeListView</Text>
            </View>
            <Text>35.1122, 137.1039</Text>
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
    backgroundColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
  },
  description: {},
});
