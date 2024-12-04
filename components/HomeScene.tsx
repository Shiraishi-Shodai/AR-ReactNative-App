import { Comment } from "@/classies/Comment";
import {
  ViroARScene,
  ViroBox,
  ViroButton,
  ViroMaterials,
  ViroNode,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { distanceBetweenCoordinates } from "@/lib";

// 現在の座標のインターフェース
interface currentLocationInterface {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

// 現在地からオブジェクトの位置を計算したインターフェース
interface ViroPositionInterface {
  viroX: number;
  viroY: number;
  viroZ: number;
}

function HomeScene() {
  // 蛍光色のマテリアルを作成
  ViroMaterials.createMaterials({
    fluorescent: {
      diffuseColor: "#00FF00", // 蛍光グリーンの色
    },
  });
  // カメラの状態
  const [initialText, setInitialText] = useState("");

  //真北と現在向いている方角の差の角度
  const [heading, setHeading] = useState(0);

  // 位置情報緒のパーミッションエラーメッセージ
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //   viroのポジション
  const [commentPosition, setCommentPosition] = useState<ViroPositionInterface>(
    { viroX: 0, viroY: 10, viroZ: -10 }
  );

  // 表示するオブジェクトのサンプルデータ
  const comment = new Comment("id1", "Hello World", 33.8344104, 132.7659512);

  //   カメラ初期化
  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialText("tracking normal");
    } else {
      setInitialText("camera not found");
    }
  };

  const getCurrentLocationPermission = async () => {
    //   位置情報のリクエスト
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was deniend");
      return;
    }
  };

  //現在地の座標を取得しsetCurrentLocationにセットする
  const getCurrentLocation = async () => {
    // 現在地の緯度、経度、高度を取得
    const { latitude, longitude, altitude } = (
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
        timeInterval: 2000,
      })
    ).coords;

    const currentLocation: currentLocationInterface = {
      latitude,
      longitude,
      altitude,
    };

    return currentLocation;
  };

  const viewComment = async () => {
    // 現在の位置情報を取得
    const currentLocation: currentLocationInterface =
      await getCurrentLocation();
    if (
      currentLocation.altitude === null ||
      currentLocation.latitude === null ||
      currentLocation.longitude === null
    )
      return;
    // 現在地からサンプルデータまでの距離を計算
    const viroX = distanceBetweenCoordinates(
      currentLocation.latitude,
      comment.longitude,
      0,
      currentLocation.latitude,
      currentLocation.longitude
    );

    const viroZ = distanceBetweenCoordinates(
      comment.latitude,
      currentLocation.longitude,
      0,
      currentLocation.latitude,
      currentLocation.longitude
    );

    console.log(
      currentLocation.altitude,
      currentLocation.latitude,
      currentLocation.longitude
    );

    setCommentPosition({
      viroX: viroX,
      viroY: 0,
      viroZ: -viroZ,
    });
  };
  useEffect(() => {
    getCurrentLocationPermission();
    let headingListener: Location.LocationSubscription | null = null;

    const fetchHeading = async () => {
      // 権限をリクエスト
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.error("コンパスへのアクセスが許可されていません。");
        return;
      }

      // 初期の方位を取得
      const headingData = await Location.getHeadingAsync();
      setHeading(headingData.trueHeading);

      viewComment();

      // 方位の変更を監視
      // headingListener = await Location.watchHeadingAsync((headingData) => {
      //   setHeading(headingData.trueHeading);
      // });
    };

    fetchHeading();

    // コンポーネントのクリーンアップでリスナーを削除
    // return () => {
    //   if (headingListener) {
    //     headingListener.remove();
    //   }
    // };
  }, []);

  useEffect(() => {
    console.log(
      `コメントの位置: ${commentPosition.viroX}, ${commentPosition.viroY}, ${commentPosition.viroZ}`
    );
  }, [commentPosition]);

  useEffect(() => {
    console.log(`現在の方位: ${heading}`);
  }, [heading]);

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroButton
        source={require("../assets/images/favicon.png")}
        position={[0, 0, -3]}
        onClick={viewComment}
      />
      <ViroNode rotation={[0, -heading, 0]}>
        <ViroText
          text="This is Object"
          style={{ fontSize: 200, color: "red" }}
          position={[0, 0, -5]}
        ></ViroText>
        <ViroBox
          scale={[0.5, 0.5, 0.5]}
          position={[
            -commentPosition.viroX,
            commentPosition.viroY,
            commentPosition.viroZ,
          ]}
          materials={["fluorescent"]}
        />
      </ViroNode>
    </ViroARScene>
  );
}

export default HomeScene;
