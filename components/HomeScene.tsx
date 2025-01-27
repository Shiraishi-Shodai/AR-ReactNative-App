import { ARObject } from "@/classies/ARObject";
import { Comment } from "@/classies/Comment";
import { CommentManager } from "@/classies/CommentManager";
import { Stamp } from "@/classies/Stamp";
import { StampManager } from "@/classies/StampManager";
import {
  ViroARScene,
  ViroBox,
  ViroButton,
  ViroImage,
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
  const commentManager = new CommentManager();
  const stampManager = new StampManager();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [stampList, setStampList] = useState<Stamp[]>([]);

  // 全オブジェクトを取得
  const listARObject = async () => {
    const commentResponse = (await commentManager.listAllARObjects()).map(
      (stamp) => setXYZ(stamp)
    );
    const stampResponse = (await stampManager.listAllARObjects()).map(
      (comment) => setXYZ(comment)
    );
    setCommentList(commentResponse as Comment[]);
    setStampList(stampResponse as Stamp[]);
    console.log(commentResponse, stampResponse);
  };

  const getRandomXYZ = () => {
    const max = 5;
    const x = Math.floor(Math.random() * max) + 1;
    const y = Math.floor(Math.random() * max) + 1;
    const z = -(Math.floor(Math.random() * max) + 1);
    return { x, y, z };
  };

  // 各オブジェクトにxyzのポジションを設定
  const setXYZ = (ARObject: ARObject) => {
    const { x, y, z } = getRandomXYZ();
    ARObject.x = x;
    ARObject.y = y;
    ARObject.z = z;
    return ARObject;
  };
  //   カメラ初期化
  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialText("tracking normal");
    } else {
      setInitialText("camera not found");
    }
  };

  useEffect(() => {
    listARObject();
  }, []);

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {commentList ? (
        commentList.map((item, index) => (
          <ViroText
            text={item.text}
            key={index}
            position={[item.x, item.y, item.z]}
            style={{ fontSize: 100 }}
            color={"red"}
          />
        ))
      ) : (
        <ViroText
          text="Stamp Found"
          position={[0, 0, -1]}
          style={{ fontSize: 20 }}
          color={"red"}
        />
      )}

      {stampList ? (
        stampList.map((item, index) => (
          <ViroImage
            source={{ uri: `data:image/png;base64,${item.source}}` }}
            placeholderSource={require("../assets/images/a.png")}
            key={index}
            position={[item.x, item.y, item.z]}
            // width={2}
            // height={2}
          />
        ))
      ) : (
        <ViroText
          text="Stamp Found"
          position={[0, 0, -1]}
          style={{ fontSize: 20 }}
          color={"red"}
        />
      )}
    </ViroARScene>
  );
}

export default HomeScene;
