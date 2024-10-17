import React, { useEffect, useState } from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { Platform, Text, View } from "react-native";
import ARView from "@/components/ARView";
import { Camera } from "expo-camera";

const Home = () => {
  const [isNavigatorReady, setNavigatorReady] = useState(false);
  const [trackingState, setTrackingState] = useState("");

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("カメラへのアクセスが必要です");
        }
      }
    };
    requestPermissions();
  }, []);

  const handleTrackingUpdated = (state) => {
    if (state === "TRACKING") {
      setTrackingState("トラッキング中");
      setNavigatorReady(true); // 初期化完了を示す
    } else if (state === "NOT_AVAILABLE") {
      setTrackingState("トラッキング不可");
    } else {
      setTrackingState("トラッキング初期化中");
      console.log(trackingState);
    }
  };

  return (
    <View>
      {isNavigatorReady ? (
        <ViroARSceneNavigator
          initialScene={{
            scene: () => <ARView onTrackingUpdated={handleTrackingUpdated} />,
          }}
        />
      ) : (
        <Text>AR初期化中...</Text>
      )}
      <Text>ARトラッキング状態: {trackingState}</Text>
    </View>
  );
};

export default Home;
