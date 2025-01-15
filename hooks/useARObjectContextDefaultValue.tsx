import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { useState } from "react";

// デフォルト値を返す関数
export const useARObjectContextDefaultValue = () => {
  const [ARObjectModalType, setARObjectModalType] = useState<ARObjectModalEnum>(
    ARObjectModalEnum.None
  );

  return {
    ARObjectModalType,
    setARObjectModalType,
  };
};
