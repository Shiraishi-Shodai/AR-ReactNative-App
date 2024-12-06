import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Comment } from "../classies/Comment";
// ...Firebaseの初期化と設定...
import database from "@react-native-firebase/database";

const GetCommentList = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const reference = database().ref("/Comment");
        const onValueChange = reference.on("value", (snapshot) => {
            const data = snapshot.val();
            const commentList: Comment[] = [];
            // ...既存コード...
            for (let id in data) {
                const item = data[id];
                commentList.push(
                    new Comment(id, item.text, item.latitude, item.longitude)
                );
            }
            setComments(commentList);
            console.log(commentList);
        });

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
