import { ViroARScene, ViroText } from "@reactvision/react-viro";

const ARView = ({ onTrackingUpdated }) => {
  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroText text="Hello World" position={[0, 0, -4]} width={9} height={2} />
    </ViroARScene>
  );
};

export default ARView;
