import { ARObject } from "@/classies/ARObject";

// ハバーサイン
export function distanceBetweenCoordinates(
  latitude: number,
  longitude: number,
  altitude: number,
  referenceLatitude: number,
  referenceLongitude: number
) {
  const EARTH_RADIUS = 6371000; // 地球の半径（メートル）
  const latRad = (latitude * Math.PI) / 180;
  const lonRad = (longitude * Math.PI) / 180;
  const refLatRad = (referenceLatitude * Math.PI) / 180;
  const refLonRad = (referenceLongitude * Math.PI) / 180;

  const deltaLat = refLatRad - latRad;
  const deltaLon = refLonRad - lonRad;
  // ハバーサインの公式
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(latRad) * Math.cos(refLatRad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 距離を計算 (m)
  const distance = EARTH_RADIUS * c;
  return distance;
}

// 緯度経度を x, y, z 座標に変換する関数
const convertLatLonToXYZ = (
  objLat: number, // オブジェクトの緯度
  objLon: number, // オブジェクトの経度
  objAlt: number, // オブジェクトの高度
  devLat: number, // デバイスの緯度
  devLon: number, // デバイスの経度
  devAlt: number // デバイスの高度
): [number, number, number] => {
  const R = 6378137; // 地球の半径（メートル）
  const latDiff = (objLat - devLat) * (Math.PI / 180);
  const lonDiff = (objLon - devLon) * (Math.PI / 180);
  const devLatRad = devLat * (Math.PI / 180);

  const x = R * lonDiff * Math.cos(devLatRad);
  const y = objAlt - devAlt; // 高度の差
  const z = R * latDiff;

  console.log("x: " + x + " y: " + y + " z: " + z);
  return [x, y, z];
};

// ランダムなカラーコードを返す
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 各オブジェクトに設定するxyzを計算
export const getRandomXYZ = () => {
  const max = 5;
  const min = -5;
  const x = Math.floor(Math.random() * (max - min + 1) + min);
  const y = Math.floor(Math.random() * (max - min + 1) + min);
  const z = Math.floor(Math.random() * (max - min + 1) + min);
  return { x, y, z };
};

// 各オブジェクトにxyzのポジションを設定
export const setXYZ = (ARObject: ARObject) => {
  const { x, y, z } = getRandomXYZ();
  ARObject.x = x;
  ARObject.y = y;
  ARObject.z = z;
  return ARObject;
};
