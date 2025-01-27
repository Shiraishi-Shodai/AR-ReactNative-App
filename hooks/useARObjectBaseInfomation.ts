import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import * as Location from "expo-location";

const useARObjectBaseInfomation = () => {
  type customLocationObject = {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  const [location, setLocation] = useState<customLocationObject>({
    latitude: 100,
    longitude: 100,
    altitude: 100,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const id: string = uuid.v4();
  const post_time = new Date().toISOString().slice(0, 19);

  // 緯度経度高度を小数点第5桁で四捨五入(末尾の0は省略されるため、必ずしも小数点5桁になるとは限らない)
  const raundingHalfUp = (x: number) => {
    const standart = 10000;
    let tmp = x * standart;
    tmp = Math.floor(tmp);
    tmp = tmp / standart;
    return tmp;
  };
  //   現在地を取得
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw Error("位置情報にアクセス出来ません");
      }

      let { coords } = await Location.getCurrentPositionAsync();
      let { latitude, longitude, altitude } = coords;
      console.log(latitude, longitude, altitude);
      //   緯度経度高度のどれかがnullまたはundefinedだったとき
      if (!latitude || !longitude || !altitude) {
        throw Error("位置情報を取得できませんでした");
      }
      setLocation({
        latitude: raundingHalfUp(latitude),
        longitude: raundingHalfUp(longitude),
        altitude: raundingHalfUp(altitude),
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  // 副作用として現在地を取得
  useEffect(() => {
    getCurrentLocation();
  }, []); // 初回レンダリング時に一度だけ実行

  return {
    id: id,
    post_time: post_time,
    latitude: location.latitude,
    longitude: location.longitude,
    altitude: location.altitude,
  };
};

export default useARObjectBaseInfomation;
