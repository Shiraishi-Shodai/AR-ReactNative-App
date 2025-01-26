import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";
import database from "@react-native-firebase/database";
import { Stamp } from "./Stamp";
import { User } from "./User";

export class StampManager implements ARObjectManager {
  async listAllARObjects(): Promise<Stamp[]> {
    const ref = database().ref("/stamps");
    // 帰り値となるスタンプオブジェクト配列
    const stampArray: Stamp[] = [];
    // スタンプを投稿したユーザーid情報を管理するインデックス(key: user_id: value userオブジェクト)
    const userIndex: { [K: string]: User | undefined } = {};
    const now = new Date();
    try {
      // ①全スタンプオブジェクトを取得
      const stamps_snapshot = await ref.orderByChild("post_time").once("value");
      if (stamps_snapshot.exists()) {
        const stamp_data = stamps_snapshot.val();

        Object.entries(stamp_data).map(([key, value]) => {
          const {
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            name,
            source,
          } = stamp_data[key];
          const stamp = new Stamp(
            key,
            user_id,
            latitude,
            longitude,
            altitude,
            post_time,
            name,
            source
          );

          // ②userIndexのキーに保存していないuser_idがあればuserIndexのキーに保存.キーに対応する値はundefinedとする
          if (!Object.keys(userIndex).includes(user_id)) {
            userIndex[`${user_id}`] = undefined;
          }
          stampArray.push(stamp);
        });

        // ③全ユーザー情報を取得
        const users_snapshot = await database().ref("/users").once("value");
        if (users_snapshot.exists()) {
          const user_data = users_snapshot.val();
          // ④全ユーザー情報からスタンプを投稿したユーザー情報のみuserIndexのvalueにuserオブジェクトとして保存
          Object.entries(user_data)
            .filter(([key, value]) => Object.keys(userIndex).includes(key))
            .map(([key, value]) => {
              const { photoURL, displayName, email } = user_data[key];
              const user: User = new User(key, displayName, photoURL, email);
              userIndex[key] = user;
            });
        }

        // ⑤user_photoURLとuser_displayNameをcommentArrayの中のスタンプオブジェクトに追加
        for (const stamp of stampArray) {
          for (const [user_key, user_value] of Object.entries(userIndex)) {
            // ユーザーidが等しく、user_valueがundefinedでないとき
            if (stamp.user_id === user_key && user_value) {
              stamp.user_displayName = user_value.displayName as string;
              stamp.user_photoURL = user_value.photoURL as string;
              break;
            }
          }
        }

        // ⑥ラズパイから全ユーザーの画像を取得
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_RSPIADDRESS}/listAllStamp`
        );

        const { imgBase64List } = await response.json();
        for (const stamp of stampArray) {
          for (const imgBase64Obj of imgBase64List) {
            const { stamp_id, imgBase64 } = imgBase64Obj;
            if (stamp.id === stamp_id) {
              stamp.source = imgBase64;
              break;
            }
          }
        }

        return stampArray; // ⑥データを返す
      } else {
        console.log('No data available in "Stamp"');
        return stampArray; // データがない場合は null を返す
      }
    } catch (error) {
      console.error("Error fetching data from Realtime Database:", error);
      return stampArray;
    }
  }
  async inputARObjects(object: Stamp): Promise<void> {
    const usersRef: string = `users/${object.user_id}/stamps/${object.id}`;
    const stampsRef: string = `stamps/${object.id}`;
    const updateObject = {
      [usersRef]: true,
      [stampsRef]: {
        user_id: object.user_id,
        latitude: object.latitude,
        altitude: object.altitude,
        longitude: object.longitude,
        post_time: object.post_time,
        source: object.source,
        name: object.name,
        user_id_post_time: `${object.user_id}_${object.post_time}`,
      },
    };

    try {
      await database().ref("/").update(updateObject);
      console.log("スタンプ追加完了");
    } catch (e) {
      console.log("スタンプ追加時にエラー発生");
    }
  }
  async deleteARObjects(object_id: string, user_id: string): Promise<void> {
    const usersRef = `users/${user_id}/stamps/${object_id}`;
    const stampsRef = `stamps/${object_id}`;
    const updateObject = {
      [usersRef]: null,
      [stampsRef]: null,
    };

    try {
      await database().ref("/").update(updateObject);
      console.log("スタンプ削除完了");
    } catch (e) {
      console.log("スタンプ削除エラー");
    }
  }
  async listMyARObjects(user: User): Promise<Stamp[]> {
    const stampArray: Stamp[] = [];
    try {
      // ①全スタンプオブジェクトを取得
      const snapshot = await database()
        .ref("/stamps")
        .orderByChild("user_id_post_time")
        .startAt(`${user.id}_0000/01/01`)
        .endAt(`${user.id}_9999/12/31`)
        .once("value");
      if (snapshot.exists()) {
        const stamp_data = snapshot.val();

        // ②スタンプオブジェクトにログイン中のユーザーの名前と画像のURLを追加
        Object.entries(stamp_data).map(([key, _]) => {
          const { latitude, longitude, altitude, post_time, name, source } =
            stamp_data[key];
          const stamp = new Stamp(
            key,
            user.id,
            latitude,
            longitude,
            altitude,
            post_time,
            name,
            source
          );
          stampArray.push(stamp);
        });

        // ⑥ラズパイから全ユーザーの画像を取得
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_RSPIADDRESS}/listMyStamp`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              user_id: user.id,
            }),
          }
        );

        const { imgBase64List } = await response.json();
        for (const stamp of stampArray) {
          for (const imgBase64Obj of imgBase64List) {
            const { stamp_id, imgBase64 } = imgBase64Obj;
            if (stamp.id === stamp_id) {
              stamp.source = imgBase64;
              break;
            }
          }
        }

        return stampArray; // ③データを返す
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
