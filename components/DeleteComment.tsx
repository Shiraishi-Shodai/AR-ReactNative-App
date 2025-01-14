import React from "react";
import { Button } from "react-native";
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

const DeleteComment = ({ comment }: { comment: Comment }) => {
    const commentManager = new CommentManager();

    const handleDeleteComment = () => {
        const commentRef = database().ref(`/Comment/${comment.id}`);
        commentRef.remove();
        commentManager.deleteARObjects(comment);
    };

    return <Button title="削除" onPress={handleDeleteComment} />;
};

export default DeleteComment;
