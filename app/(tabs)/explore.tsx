import {
    ViroARScene,
    ViroARSceneNavigator,
    ViroText,
} from "@reactvision/react-viro";
import database from "@react-native-firebase/database";
import { useEffect } from "react";

export default () => {
    const getData = async () => {
        await database()
            .ref("/users/123")
            .set({
                name: "Ada Lovelace",
                age: 31,
            })
            .then(() => console.log("Data set."))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ViroARScene>
            <ViroText text="hh" />
        </ViroARScene>
    );
};
