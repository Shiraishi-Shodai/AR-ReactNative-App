import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { ARObject } from "@/classies/ARObject";

interface RenderItemCommonProps {
  item: ARObject;
  width: number;
  height: number;
}

const RenderItemCommonComponent = ({
  item,
  width,
  height,
}: RenderItemCommonProps) => {
  return (
    <View style={{ paddingLeft: width * 0.02 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
        I am {item.id} in a SwipeListView
      </Text>

      <View style={styles.location}>
        {/* マップアイコン */}
        <FeatherIcon name="map-pin" size={width * 0.05} />
        {/* 緯度、軽度、高度を表示 */}
        <Text>35.1122, 137.1039, 50.111</Text>
      </View>
      <View style={styles.postTime}>
        <Text>2025/01/15</Text>
      </View>
    </View>
  );
};

export default RenderItemCommonComponent;

const styles = StyleSheet.create({
  location: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  postTime: {
    position: "absolute",
    top: "70%",
    right: "-12%",
  },
});
