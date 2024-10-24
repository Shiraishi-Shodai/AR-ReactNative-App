import React, { useEffect, useState } from "react";
import {
    ViroARScene,
    ViroARSceneNavigator,
    ViroText,
    ViroTrackingReason,
    ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";

const HelloWorldSceneAR = () => {
    const [text, setText] = useState("Initializing AR...");

    function onInitialized(state: any, reason: ViroTrackingReason) {
        console.log("onInitialized", state, reason);
        if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
            setText("Hello Masumoto!");
        } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
            // Handle loss of tracking
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroText
                text={text}
                scale={[0.5, 0.5, 0.5]}
                position={[0, 0, -1]}
                style={styles.helloWorldTextStyle}
            />
        </ViroARScene>
    );
};

export default () => {
    return (
        <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: HelloWorldSceneAR,
            }}
            style={styles.f1}
        />
    );
};

var styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
        fontFamily: "Arial",
        fontSize: 30,
        color: "#ffffff",
        textAlignVertical: "center",
        textAlign: "center",
    },
});

// import React from "react";
// import { View, Text } from "react-native";

// const index = () => {
//     return (
//         <View>
//             <Text>Hello</Text>
//         </View>
//     );
// };

// export default index;
