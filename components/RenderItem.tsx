import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

interface RenderItemProps {
  item: {
    key: string;
    text: string;
  };
  animatedValue: Animated.Value;
}
const RenderItem = ({ item, animatedValue }: RenderItemProps) => (
  <Animated.View
    style={[
      styles.rowFrontContainer,
      {
        height: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
    ]}
  >
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text>I am {item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  </Animated.View>
);

export default RenderItem;

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
