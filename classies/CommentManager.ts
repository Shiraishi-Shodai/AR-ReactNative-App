import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Comment } from "./Comment";
import { User } from "./User";

export class CommentManager implements ARObjectManager {
  async listAllARObjects(): Promise<Comment[]> {
    const ref = database().ref("/comments");
    // 帰り値となるコメントオブジェクト配列
    const commentArray: Comment[] = [];
    // コメントを投稿したユーザーid情報を管理するインデックス(key: user_id: value userオブジェクト)
    const userIndex: { [K: string]: User | undefined } = {};
    const now = new Date();
    try {
      // ①全コメントオブジェクトを取得
      const comments_snapshot = await ref
        .orderByChild("post_time")
        .once("value");
      if (comments_snapshot.exists()) {
        const comment_data = comments_snapshot.val();

        Object.entries(comment_data).map(([key, value]) => {
          const { user_id, latitude, longitude, altitude, post_time, text } =
            comment_data[key];
          const comment = new Comment(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            text
          );

          // ②userIndexのキーに保存していないuser_idがあればuserIndexのキーに保存.キーに対応する値はundefinedとする
          if (!Object.keys(userIndex).includes(user_id)) {
            userIndex[`${user_id}`] = undefined;
          }
          commentArray.push(comment);
        });

        // ③全ユーザー情報を取得
        const users_snapshot = await database().ref("/users").once("value");
        if (users_snapshot.exists()) {
          const user_data = users_snapshot.val();
          // ④全ユーザー情報からコメントを投稿したユーザー情報のみuserIndexのvalueにuserオブジェクトとして保存
          Object.entries(user_data)
            .filter(([key, value]) => Object.keys(userIndex).includes(key))
            .map(([key, value]) => {
              const { photoURL, displayName, email } = user_data[key];
              const user: User = new User(key, displayName, photoURL, email);
              userIndex[key] = user;
            });
        }

        // ⑤user_photoURLとuser_displayNameをcommentArrayの中のコメントオブジェクトに追加
        for (const comment of commentArray) {
          for (const [user_key, user_value] of Object.entries(userIndex)) {
            // ユーザーidが等しく、user_valueがundefinedでないとき
            if (comment.user_id === user_key && user_value) {
              comment.user_displayName = user_value.displayName as string;
              comment.user_photoURL = user_value.photoURL as string;
              break;
            }
          }
        }

        return commentArray; // ⑥データを返す
      } else {
        console.log('No data available in "Comment"');
        return commentArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return commentArray;
    }
  }
  async inputARObjects(object: Comment): Promise<void> {
    const userRef: string = `users/${object.user_id}/comments/${object.id}`;
    const commentsRef: string = `comments/${object.id}`;
    const updateObject = {
      [userRef]: true,
      [commentsRef]: {
        user_id: object.user_id,
        latitude: object.latitude,
        altitude: object.altitude,
        longitude: object.longitude,
        post_time: object.post_time,
        text: object.text,
        user_id_post_time: `${object.user_id}_${object.post_time}`,
      },
    };

    try {
      await database().ref("/").update(updateObject);
      console.log("コメント追加完了");
    } catch (e) {
      console.log("コメント追加時にエラー発生");
    }
  }
  async deleteARObjects(object: ARObject): Promise<void> {}
  async listMyARObjects(user: User): Promise<Comment[]> {
    const commentArray: Comment[] = [];
    try {
      // ①全コメントオブジェクトを取得
      const snapshot = await database()
        .ref("/comments")
        .orderByChild("user_id_post_time")
        .startAt(`${user.id}_0000/01/01`)
        .endAt(`${user.id}_9999/12/31`)
        .once("value");
      if (snapshot.exists()) {
        const comment_data = snapshot.val();

        // ②コメントオブジェクトにログイン中のユーザーの名前と画像のURLを追加
        Object.entries(comment_data).map(([key, _]) => {
          const { latitude, longitude, altitude, post_time, text } =
            comment_data[key];
          const comment = new Comment(
            key,
            user.id,
            latitude,
            longitude,
            altitude,
            post_time,
            text,
            user.displayName as string,
            user.photoURL as string
          );
          commentArray.push(comment);
        });

        return commentArray; // ③データを返す
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
