import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import database from "@react-native-firebase/database";
import { Comment } from "../classies/Comment";
import { ARObjectManager } from "../interfaces/ARObjectManager";

class CommentManager implements ARObjectManager {
    private comments: Comment[] = [];

    getARObjects(): Comment[] {
        return this.comments;
    }

    addARObjects(comment: Comment): void {
        this.comments.push(comment);
    }

    deleteARObjects(comment: Comment): void {
        this.comments = this.comments.filter((c) => c.id !== comment.id);
    }

    listMyARObjects(): Comment[] {
        return this.comments;
    }
}

const AddComment = () => {
    const [text, setText] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const commentManager = new CommentManager();

    const handleAddComment = () => {
        const newCommentRef = database().ref("/Comment").push();
        const commentKey = newCommentRef.key ?? "";
        const user_id = "default_user_id"; // 実際にログインユーザーのIDを取得する
        const altitude = 0; // 高度
        const newComment = new Comment(
            commentKey,
            user_id,
            latitude,
            longitude,
            altitude,
            text
        );
        newCommentRef.set({
            text: newComment.text,
            latitude: newComment.latitude,
            longitude: newComment.longitude,
        });
        commentManager.addARObjects(newComment);
        setText("");
        setLatitude(0);
        setLongitude(0);
    };

    return (
        <View>
            <TextInput
                placeholder="コメントを入力"
                value={text}
                onChangeText={setText}
            />
            <TextInput
                placeholder="緯度を入力"
                value={latitude.toString()}
                onChangeText={(value) => setLatitude(parseFloat(value))}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="経度を入力"
                value={longitude.toString()}
                onChangeText={(value) => setLongitude(parseFloat(value))}
                keyboardType="numeric"
            />
            <Button title="テスト追加" onPress={handleAddComment} />
        </View>
    );
};

export default AddComment;
