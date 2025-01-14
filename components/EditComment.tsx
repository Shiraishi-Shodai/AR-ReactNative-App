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

const EditComment = ({ comment }: { comment: Comment }) => {
    const [text, setText] = useState(comment.text);
    const [latitude, setLatitude] = useState(comment.latitude);
    const [longitude, setLongitude] = useState(comment.longitude);
    const commentManager = new CommentManager();

    const handleEditComment = () => {
        const commentRef = database().ref(`/Comment/${comment.id}`);
        commentRef.update({
            text,
            latitude,
            longitude,
        });
        comment.text = text;
        comment.latitude = latitude;
        comment.longitude = longitude;
        commentManager.addARObjects(comment);
    };

    return (
        <View>
            <TextInput
                placeholder="コメントを編集"
                value={text}
                onChangeText={setText}
            />
            <TextInput
                placeholder="緯度を編集"
                value={latitude.toString()}
                onChangeText={(value) => setLatitude(parseFloat(value))}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="経度を編集"
                value={longitude.toString()}
                onChangeText={(value) => setLongitude(parseFloat(value))}
                keyboardType="numeric"
            />
            <Button title="編集" onPress={handleEditComment} />
        </View>
    );
};

export default EditComment;
