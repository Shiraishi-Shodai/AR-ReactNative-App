import { StampManager } from "@/classies/StampManager";
import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { ModalModeEnum } from "@/constants/ModalModeEnum";
import * as ImagePicker from "expo-image-picker";
import InputStampButton from "./InputStampButton";
import uuid from "react-native-uuid";
import { AuthContext } from "./AuthProvider";
import { User } from "@/classies/User";
import { Stamp } from "@/classies/Stamp";
import { TextInput } from "react-native-gesture-handler";

interface InputStampProps {
  width: number;
  height: number;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeEnum>>;
}
const InputStamp = ({ width, height, setModalMode }: InputStampProps) => {
  const stampManager = new StampManager();
  const [imgBase64, setImgBase64] = useState<string | undefined | null>(null);
  const { user }: { user: User } = useContext(AuthContext) as { user: User };
  // 画像の名前
  const [imgName, setImgName] = useState<string>("");

  // スタンプを選択しbase64形式でデータをbase64変数に格納する
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    // スタンプ画像の選択をキャンセルしたとき、処理を終了
    if (!result.canceled) {
      setImgBase64(result.assets[0].base64);
    }
  };

  const handleInputStamp = async () => {
    try {
      const stamp_id: string = uuid.v4();
      const name = imgName;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_RSPIADDRESS}/inputStamp`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            user_id: user.id,
            stamp_id: stamp_id,
            imgBase64: imgBase64,
          }),
        }
      );
      const json = await response.json();

      const stampManager = new StampManager();

      const id: string = uuid.v4();
      const post_time = new Date().toISOString().slice(0, 19);
      const latitude = 100;
      const longitude = 100;
      const altitude = 100;
      const stamp: Stamp = new Stamp(
        stamp_id,
        user.id,
        latitude,
        longitude,
        altitude,
        post_time,
        name
      );

      await stampManager.inputARObjects(stamp);
    } catch (e) {
      console.log(e);
    } finally {
      setModalMode(ModalModeEnum.ARObjectList);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding">
        <View
          style={[{ width: width, height: height * 0.5 }, styles.modalContent]}
        >
          <Pressable
            style={styles.modalHead}
            onPress={() => setModalMode(ModalModeEnum.ARObjectList)}
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
            <Pressable style={styles.imageView} onPress={pickImage}>
              <Image
                source={
                  imgBase64
                    ? { uri: `data:image/png;base64,${imgBase64}` }
                    : require("../assets/images/no-image.png")
                }
                style={{ width: width * 0.5, height: width * 0.5 }}
              />
            </Pressable>

            <View
              style={[
                { width: width * 0.9, height: height * 0.15 },
                styles.buttonView,
              ]}
            >
              <View style={styles.imgNameview}>
                <TextInput
                  placeholder="スタンプの名前を入力してください"
                  onChangeText={(text: string) => {
                    setImgName(text);
                  }}
                />
              </View>
              <InputStampButton
                onPress={handleInputStamp}
                width={width}
                text={"AR上にスタンプを追加"}
                disabled={
                  imgBase64 == null || imgBase64 == undefined || imgName == ""
                }
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  imgNameview: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
