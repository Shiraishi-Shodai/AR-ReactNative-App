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

function HomeScene() {
  // カメラの状態
  const [initialText, setInitialText] = useState("");

  //   カメラ初期化
  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialText("tracking normal");
    } else {
      setInitialText("camera not found");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroNode rotation={[0, -5, 0]}></ViroNode>
    </ViroARScene>
  );
}

export default HomeScene;
