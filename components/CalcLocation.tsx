import React, { useEffect, useState } from "react";
import {
    ViroARScene,
    ViroText,
    ViroNode,
    ViroAmbientLight,
    ViroBox,
    ViroMaterials,
} from "@reactvision/react-viro";
import * as Location from "expo-location";
import { View, Button } from "react-native";

// 蛍光色のマテリアルを作成
ViroMaterials.createMaterials({
    fluorescent: {
        diffuseColor: "#00FF00", // 蛍光グリーンの色
    },
});

const CalcLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [xyz, setXyz] = useState<[number, number, number]>([0, 0, 0]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [heading, setHeading] = useState<number | null>(null);

    useEffect(() => {
        const startWatching = async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("位置情報の許可が拒否されました");
                    return;
                }

                await Location.watchPositionAsync(
                    {
                        // 精度を最高に設定
                        accuracy: Location.Accuracy.Highest,
                        timeInterval: 5000,
                        distanceInterval: 1,
                    },
                    async (location) => {
                        const { accuracy, latitude, longitude, altitude } =
                            location.coords;

                        if (altitude === null) {
                            console.log("高度がわかりません");
                            return;
                        }

                        console.log("Accuracy: " + accuracy);

                        if (accuracy === null || accuracy < 30) {
                            console.log(
                                "**精度が低いため、位置情報を除外しました**\n"
                            );
                            return;
                        }

                        setLocation(location);

                        const heading = await Location.getHeadingAsync();
                        setHeading(heading.trueHeading);

                        // オブジェクトの緯度経度（例）
                        const objectLat = 33.8344157;
                        const objectLon = 132.7659304;
                        const objectAlt = 0; // 高度がわからない場合は0とする

                        const xyzCoords = convertLatLonToXYZ(
                            objectLat,
                            objectLon,
                            objectAlt,
                            latitude,
                            longitude,
                            altitude,
                            heading.trueHeading
                        );
                        setXyz(xyzCoords);
                    }
                );
            } catch (error) {
                setErrorMsg("位置情報の取得に失敗しました");
            }
        };

        startWatching();
    }, []);

    const convertLatLonToXYZ = (
        objLat: number,
        objLon: number,
        objAlt: number,
        devLat: number,
        devLon: number,
        devAlt: number,
        heading: number
    ): [number, number, number] => {
        const R = 6378137; // 地球の半径（メートル）
        const latDiff = (objLat - devLat) * (Math.PI / 180);
        const lonDiff = (objLon - devLon) * (Math.PI / 180);
        const devLatRad = devLat * (Math.PI / 180);
        const headingRad = (heading * Math.PI) / 180;

        // 北を基準にした���標変換
        const xNorth = R * lonDiff * Math.cos(devLatRad);
        const zNorth = R * latDiff;

        // デバイスの方位を考慮して座標を回転
        const x = xNorth * Math.cos(headingRad) - zNorth * Math.sin(headingRad);
        const z = xNorth * Math.sin(headingRad) + zNorth * Math.cos(headingRad);
        // const y = objAlt - devAlt; // 高度の差
        const y = 0;

        console.log("x: " + x + " y: " + y + " z: " + z);
        return [x, y, z];
    };

    return (
        <View style={{ flex: 1 }}>
            <ViroARScene>
                <ViroAmbientLight color="#ffffff" intensity={200} />
                <ViroNode position={xyz}>
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
            </ViroARScene>
        </View>
    );
};

export default CalcLocation;
