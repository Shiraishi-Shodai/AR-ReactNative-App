import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Comment } from "./Comment";

export class CommentManager implements ARObjectManager {
    // コメントを管理するためのクラス
    async getARObjects(): Promise<Comment[]> {
        const ref = database().ref("/Comment");
        const commentArray: Comment[] = [];
        try {
            const snapshot = await ref.once("value");
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (let key of Object.keys(data)) {
                    const { user_id, latitude, longitude, altitude, text } =
                        data[key];
                    const comment = new Comment(
                        key,
                        user_id,
                        latitude,
                        longitude,
                        altitude,
                        text
                    );

                    commentArray.push(comment);
                }

                return commentArray; // データを返す
            } else {
                console.log('No data available in "Comment"');
                return commentArray; // データがない場合は null を返す
            }
        } catch (error) {
            console.error("Error fetching data from Realtime Database:", error);
            return commentArray;
        }
    }
    // コメントを追加するメソッド
    async inputARObjects(object: ARObject): Promise<void> {
        const newCommentRef = database().ref("/Comment").push();
        const commentKey = newCommentRef.key ?? "";
        const comment = object as Comment;
        newCommentRef.set({
            text: comment.text,
            latitude: comment.latitude,
            longitude: comment.longitude,
            altitude: comment.altitude,
            user_id: comment.user_id,
        });
        return Promise.resolve();
    }
    // コメントを削除するメソッド
    async deleteARObjects(object: ARObject): Promise<void> {}
    // 自分のコメントをリストするメソッド
    async listMyARObjects(user_id: string): Promise<Comment[]> {
        const ref = database().ref("/Comment");
        const commentArray: Comment[] = [];
        try {
            const snapshot = await ref.once("value");
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (let key of Object.keys(data)) {
                    const { user_id, latitude, longitude, altitude, text } =
                        data[key];
                    const comment = new Comment(
                        key,
                        user_id,
                        latitude,
                        longitude,
                        altitude,
                        text
                    );

                    commentArray.push(comment);
                }

                return commentArray; // データを返す
            } else {
                console.log('No data available in "Comment"');
                return commentArray; // データがない場合は null を返す
            }
        } catch (error) {
            console.error("Error fetching data from Realtime Database:", error);
            return commentArray;
        }
    }
}
