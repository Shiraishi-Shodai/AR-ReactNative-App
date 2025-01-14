import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Comment } from "../classies/Comment";
import { ARObjectManager } from "../interfaces/ARObjectManager";
import database from "@react-native-firebase/database";

// CommentManagerクラスはコメントを管理するためのクラス
class CommentManager implements ARObjectManager {
    private comments: Comment[] = [];

    // コメントを取得するメソッド
    getARObjects(): Comment[] {
        return this.comments;
    }

    // コメントを追加するメソッド
    addARObjects(comment: Comment): void {
        this.comments.push(comment);
    }

    // コメントを削除するメソッド
    deleteARObjects(comment: Comment): void {
        this.comments = this.comments.filter((c) => c.id !== comment.id);
    }

    // 自分のコメントをリストするメソッド
    listMyARObjects(): Comment[] {
        return this.comments;
    }
}

const GetCommentList = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const commentManager = new CommentManager();

    useEffect(() => {
        const reference = database().ref("/Comment");
        const onValueChange = reference.on("value", (snapshot) => {
            const data = snapshot.val();
            const commentList: Comment[] = [];
            for (let id in data) {
                const item = data[id];
                // Firebaseから取得したデータをCommentクラスのインスタンスに変換
                const comment = new Comment(
                    id,
                    item.user_id,
                    item.latitude,
                    item.longitude,
                    item.altitude,
                    item.text
                );
                // CommentManagerにコメントを追加
                commentManager.addARObjects(comment);
                commentList.push(comment);
            }
            // コメントの状態を更新
            setComments(commentList);
        });

        // クリーンアップ関数でリスナーを解除
        return () => reference.off("value", onValueChange);
    }, []);

    return (
        <View>
            {comments.map((comment) => (
                <Text key={comment.id}>{comment.text}</Text>
            ))}
        </View>
    );
};

export default GetCommentList;
