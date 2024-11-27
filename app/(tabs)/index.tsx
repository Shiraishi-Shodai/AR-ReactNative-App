import "@/lib/firebase";
import React, { useEffect, useState } from "react";
import CalcLocation from "@/components/CalcLocation";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { OBJTest } from "@/components/OBJTest";

const LocationTest = () => {
    return (
        <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: CalcLocation,
            }}
        />
    );
};

export default LocationTest;
