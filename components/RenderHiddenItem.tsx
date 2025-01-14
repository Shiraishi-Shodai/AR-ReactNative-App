import { Stamp } from "@/classies/Stamp";
import React, { useContext } from "react";
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { RowMap } from "react-native-swipe-list-view";
interface RenderHiddenItemProps {
  rowData: ListRenderItemInfo<{ key: string; text: string }>;
  rowMap: RowMap<{ key: string; text: string }>;
}

const RenderHiddenItem = (
  rowData: ListRenderItemInfo<{ key: string; text: string }>, // 正しい型を使用
  rowMap: RowMap<{ key: string; text: string }> // rowMapの型も正しいものを使用
) => {
  const { item } = rowData;
  return (
    <View style={styles.rowBack}>
      <TouchableHighlight
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => console.log("Delete pressed")}
        underlayColor={"#AAA"}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableHighlight>
    </View>
  );
};

export default RenderHiddenItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
