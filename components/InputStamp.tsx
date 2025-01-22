import { StampManager } from "@/classies/StampManager";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  Image,
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import * as ImagePicker from "expo-image-picker";
import InputStampButton from "./InputStampButton";

interface InputStampProps {
  width: number;
  height: number;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeEnum>>;
}
const InputStamp = ({ width, height, setModalMode }: InputStampProps) => {
  const [image, setImage] = useState<string | null>(null);
  const stampManager = new StampManager();
  const [base64, setBase64] = useState("");

  // スタンプを選択しbase64形式でデータをbase64変数に格納する
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    // スタンプの選択をキャンセルされず、選択したスタンプをbase64形式に変換できたとき、変数base64を更新する
    if (!result.canceled && result.assets[0].base64) {
      setBase64(result.assets[0].base64);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback>
        <View
          style={[{ width: width, height: height * 0.5 }, styles.modalContent]}
        >
          <Pressable
            style={styles.modalHead}
            onPress={() => setModalMode(ModalModeEnum.MyList)}
          >
            <EntypoIcon
              name="chevron-thin-left"
              size={width * 0.08}
              color="#4169E1"
            />
            <View>
              <Text style={styles.modalHeadText}>投稿一覧に戻る</Text>
            </View>
          </Pressable>

          <View style={[styles.modalItem, { height: height * 0.36 }]}>
            <View style={styles.imageView}>
              <Image
                source={
                  base64
                    ? { uri: `data:image/png;base64,${base64}` }
                    : require("../assets/images/no-image.png")
                }
                style={{ width: width * 0.5, height: width * 0.5 }}
              />
            </View>

            <View
              style={[
                { width: width * 0.9, height: height * 0.15 },
                styles.buttonView,
              ]}
            >
              <InputStampButton
                onPress={pickImage}
                width={width}
                text={"スタンプを選択"}
              />
              <InputStampButton
                onPress={() => console.log("Hello")}
                width={width}
                text={"AR上にスタンプを追加"}
                disabled={base64 == ""}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default InputStamp;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modalHead: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: "2%",
    top: "2%",
  },
  modalHeadText: {
    color: "#4169E1",
    fontSize: 20,
    fontWeight: "400",
  },
  modalItem: {
    alignItems: "center",
  },
  imageView: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttonView: {
    justifyContent: "space-around",
    top: "3%",
  },

  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
  },
  swipeListWrapper: {
    justifyContent: "center",
  },
});
