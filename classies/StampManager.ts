import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Stamp } from "./Stamp";
import { User } from "./User";

export class StampManager implements ARObjectManager {
  async listAllARObjects(): Promise<Stamp[]> {
    const ref = database().ref("/Stamp");
    const stampArray: Stamp[] = [];
    try {
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let key of Object.keys(data)) {
          const {
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            img_path,
          } = data[key];
          const stamp = new Stamp(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            img_path
          );

          stampArray.push(stamp);
        }

        return stampArray; // データを返す
      } else {
        console.log('No data available in "Stamp"');
        return stampArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return stampArray;
    }
  }
  async inputARObjects(object: ARObject): Promise<void> {}
  async deleteARObjects(object_id: string, user_id: string): Promise<void> {}
  async listMyARObjects(user: User): Promise<Stamp[]> {
    const ref = database().ref("/Stamp");
    const stampArray: Stamp[] = [];
    try {
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let key of Object.keys(data)) {
          const {
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            img_path,
          } = data[key];
          const stamp = new Stamp(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            img_path
          );

          stampArray.push(stamp);
        }

        return stampArray; // データを返す
      } else {
        console.log('No data available in "Stamp"');
        return stampArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return stampArray;
    }
  }
}
