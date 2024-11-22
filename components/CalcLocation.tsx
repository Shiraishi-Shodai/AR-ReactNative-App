import {
    ViroAmbientLight,
    ViroARScene,
    ViroARSceneNavigator,
    ViroBox,
    ViroButton,
    ViroNode,
    ViroText,
    ViroTrackingReason,
    ViroTrackingStateConstants,
    ViroMaterials,
} from "@reactvision/react-viro";

import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

// 蛍光色のマテリアルを作成
ViroMaterials.createMaterials({
    fluorescent: {
        diffuseColor: "#00FF00", // 蛍光グリーンの色
    },
});

const CalcLocation = () => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [xyz, setXyz] = useState<[number, number, number]>([0, 0, 0]);
    const [text, setText] = useState("Initializing AR...");
    const [heading, setHeading] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("位置情報の許可が拒否されました");
                return;
            }
        })();
    }, []);

    // setText("") で再レンダリング
    function onInitialized(state: any, reason: ViroTrackingReason) {
        console.log("onInitialized", state, reason);
        // 位置情報が取得できたら、テキストを更新
        if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
            console.log("トラッキング完了!!!");
            getLocation();
            setText(xyz.toString());
        } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
            console.log("トラッキング不能!!!");
            setText("");
        } else {
            console.log("Can't tracking");
            setText("");
        }
    }

    const getLocation = async () => {
        try {
            // 現在の位置情報を取得
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest, // 高精度な位置情報を取得
                timeInterval: 5000, // 位置情報の更新間隔（ミリ秒）
                distanceInterval: 1, // 位置情報の更新距離（メートル）
            });
            const heading = await Location.getHeadingAsync();
            // デバイスの向きを基準にするため、マイナスをかける
            setHeading(heading.trueHeading * -1);
            console.log("デバイスの向きは → " + heading.trueHeading + " です");
            setLocation(location);
            console.log("誤差は → " + location.coords.accuracy + "m です");
            setXyz(
                [
                    location.coords.latitude, // 緯度
                    // location.coords.altitude,            // 高度
                    0,
                    location.coords.longitude, // 経度
                ]
                // [0, 0, 0]
            );
            console.log("デバイスの緯度経度は → " + xyz + "です");
        } catch (error) {
            setErrorMsg("位置情報の取得に失敗しました");
        }
        console.log("error= " + errorMsg);
    };

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
        const y = 0; // 高度の差
        // const y = objAlt - devAlt; // 高度の差
        const z = R * latDiff;

        console.log("x: " + x + " y: " + y + " z: " + z);
        return [x, y, z];
    };

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroAmbientLight color="#ffffff" intensity={200} />
            <ViroNode
                position={convertLatLonToXYZ(
                    33.8344065,
                    132.7659656,
                    0,
                    xyz[0],
                    xyz[2],
                    xyz[1]
                )}
                rotation={[0, heading ?? 0, 0]} // 向きを固定
            >
                <ViroText
                    text={"hello"}
                    scale={[0.5, 0.5, 0.5]}
                    style={{ fontSize: 20, color: "#f5d" }}
                />
                <ViroBox
                    position={[0, 1, 0]}
                    scale={[0.5, 0.5, 0.5]}
                    materials={["fluorescent"]}
                />
            </ViroNode>
            <ViroButton
                source={{
                    uri: "https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg",
                }}
                onClick={async () => {
                    await getLocation();
                }}
                position={[-0, -1, -3]}
            ></ViroButton>
        </ViroARScene>
    );
};
export default CalcLocation;
