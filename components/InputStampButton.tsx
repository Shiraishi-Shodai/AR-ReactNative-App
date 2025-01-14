import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";

interface InputStampButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  width: number;
  text: string;
  disabled?: boolean; // ボタンを無効にする場合はtrueを受け取る。
}
const InputStampButton = ({
  onPress,
  width,
  text,
  disabled,
}: InputStampButtonProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled} // このpropsが渡されていればボタンを無効に、そうでなければボタンを有効にする
      underlayColor="#CCCCCC" // 押下時の色
      style={[
        styles.inputStampView,
        { borderRadius: width * 0.02, opacity: disabled ? 0.3 : 1 },
      ]}
    >
      <Text>{text}</Text>
    </TouchableHighlight>
  );
};

export default InputStampButton;

const styles = StyleSheet.create({
  inputStampView: {
    backgroundColor: "#EEEEEE",
    height: "45%",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
