import { Stamp } from "@/classies/Stamp";
import React, { useContext } from "react";
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { RowMap } from "react-native-swipe-list-view";
interface RenderHiddenItemProps {
  rowData: ListRenderItemInfo<{ key: string; text: string }>;
  rowMap: RowMap<{ key: string; text: string }>;
  width: number;
  height: number;
}

const RenderHiddenItem = ({
  rowData,
  rowMap,
  width,
  height,
}: RenderHiddenItemProps) => {
  return (
    <View style={[styles.rowBack, { width: width * 0.95 }]}>
      <TouchableHighlight
        style={[
          styles.backRightBtn,
          styles.backRightBtnRight,
          { height: height * 0.09, backgroundColor: "red" },
        ]}
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
  backTextWhite: {
    color: "#FFF",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
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
    width: "100%",
    borderRadius: 5,
  },
  backRightBtnRight: {
    right: 0,
  },
});
