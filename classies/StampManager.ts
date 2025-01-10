import {firebase} from "@react-native-firebase/database";

export class StampManager {
    async getARojects() {
      const ref = firebase.database().ref('/Stamp');
      try {
        const snapshot = await ref.once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Fetched data:', data); // データをログ出力
          return data; // データを返す
        } else {
          console.log('No data available in "Stamp"');
          return null; // データがない場合は null を返す
        }
      } catch (error) {
        console.error('Error fetching data from Realtime Database:', error);
        throw error;
      }
    }
  }