import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Stamp } from "./Stamp";

export class StampManager implements ARObjectManager {
  async getARObjects(): Promise<Stamp[] | null> {
    const ref = database().ref("/Stamp");
    try {
      const snapshot = await ref.once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched data:", data); // データをログ出力
        return data; // データを返す
      } else {
        console.log('No data available in "Stamp"');
        return null; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      throw error;
    }
  }
  public addARObjects(object: ARObject): void {}
  public deleteARObjects(object: ARObject): void {}
  public listMyARObjects(): ARObject[] {}
}
