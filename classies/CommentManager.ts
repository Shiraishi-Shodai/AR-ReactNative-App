import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Comment } from "./Comment";

class CommentManager implements ARObjectManager {
  async getARObjects(): Promise<Comment[]> {
    const ref = database().ref("/Comment");
    const stampArray: Comment[] = [];
    try {
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let key of Object.keys(data)) {
          const { user_id, latitude, longitude, altitude, text } = data[key];
          const comment = new Comment(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            text
          );

          stampArray.push(comment);
        }

        return stampArray; // データを返す
      } else {
        console.log('No data available in "Comment"');
        return stampArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return stampArray;
    }
  }
  async inputARObjects(object: ARObject): Promise<void> {}
  async deleteARObjects(object: ARObject): Promise<void> {}
  async listMyARObjects(user_id: string): Promise<Comment[]> {
    const ref = database().ref("/Comment");
    const stampArray: Comment[] = [];
    try {
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let key of Object.keys(data)) {
          const { user_id, latitude, longitude, altitude, text } = data[key];
          const comment = new Comment(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            text
          );

          stampArray.push(comment);
        }

        return stampArray; // データを返す
      } else {
        console.log('No data available in "Comment"');
        return stampArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return stampArray;
    }
  }
}
