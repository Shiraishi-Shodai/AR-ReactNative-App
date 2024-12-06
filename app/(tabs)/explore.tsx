import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
} from "@reactvision/react-viro";

export default () => {
  return (
    <ViroARScene>
      <ViroText text="hh" />
    </ViroARScene>
  );
};

// import database from "@react-native-firebase/database";

// database()
//     .ref("/users/123")
//     .set({
//         name: "Ada Lovelace",
//         age: 31,
//     })
//     .then(() => console.log("Data set."));
