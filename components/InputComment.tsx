import { ModalModeEnum } from "@/constants/ModalModeEnum";
import React, { useContext, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import InputStampButton from "./InputStampButton";
import UserIcon from "./UserIcon";
import { User } from "@/classies/User";
import { AuthContext } from "./AuthProvider";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Comment } from "@/classies/Comment";
import uuid from "react-native-uuid";
import { CommentManager } from "@/classies/CommentManager";
import useARObjectBaseInfomation from "@/hooks/useARObjectBaseInfomation";

interface InputCommentProps {
  width: number;
  height: number;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeEnum>>;
}
const InputComment = ({ width, height, setModalMode }: InputCommentProps) => {
  const { user }: { user: User } = useContext(AuthContext) as { user: User };
  const textRef = useRef<string>("");
  const { id, post_time, latitude, longitude, altitude } =
    useARObjectBaseInfomation();

  // コメントオブジェクトを作成し、CommentManagerに挿入処理を委託する
  const handleInputComment = async () => {
    console.log(id, post_time, latitude, longitude, altitude);
    const comment: Comment = new Comment(
      id,
      user.id,
      latitude,
      longitude,
      altitude,
      post_time,
      textRef.current
    );
    const commentManager: CommentManager = new CommentManager();
    try {
      await commentManager.inputARObjects(comment);
    } catch (e) {
      console.log("コメント追加エラー発生");
    } finally {
      setModalMode(ModalModeEnum.ARObjectList);
    }
  };
  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            width: width,
            height: height * 0.5,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.modalHead}
            onPress={() => setModalMode(ModalModeEnum.ARObjectList)}
          >
            <EntypoIcon
              name="chevron-thin-left"
              size={width * 0.07}
              color="#4169E1"
            />
            <View>
              <Text style={styles.modalHeadText}>投稿一覧に戻る</Text>
            </View>
          </Pressable>
          <View style={styles.modalContent}>
            <View
              style={[
                styles.modalItem,
                {
                  width: width * 0.95,
                  borderRadius: width * 0.04,
                },
              ]}
            >
              <View style={styles.inputView}>
                <View style={styles.inputViewHead}>
                  <UserIcon userIconStyles={userIconStyles} />
                  <View>
                    <Text style={{ fontSize: width * 0.05 }}>
                      {user.displayName}
                    </Text>
                  </View>
                </View>
                <View style={styles.inputViewItem}>
                  <TextInput
                    placeholder="コメントを入力してください"
                    multiline={true}
                    onChangeText={(text: string) => {
                      textRef.current = text;
                    }}
                  />
                </View>
                <View style={styles.post_timeView}>
                  <Text>YYYY/MM/DD</Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            onPress={handleInputComment}
            style={[styles.buttonView, { borderRadius: width * 0.02 }]}
          >
            <Text style={styles.buttonText}>AR上にコメントを追加</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default InputComment;

const styles = StyleSheet.create({
  modalHead: {
    flexDirection: "row",
    position: "relative",
    right: "25%",
    bottom: "3%",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    height: "70%",
  },
  modalItem: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  modalHeadText: {
    color: "#4169E1",
    fontSize: 18,
  },
  inputView: {
    height: "100%",
    padding: 10,
  },
  inputViewHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  inputViewItem: {
    backgroundColor: "#EEEEEE",
    height: "70%",
  },
  post_timeView: {
    position: "absolute",
    bottom: 0,
    right: "1%",
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCCCCC",
    position: "relative",
    top: "3%",
    height: "10%",
    width: "95%",
  },
  buttonText: {
    fontSize: 20,
  },
});

const userIconStyles = StyleSheet.create({
  iconContainer: {
    paddingRight: 20,
  },
  iconSize: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});
