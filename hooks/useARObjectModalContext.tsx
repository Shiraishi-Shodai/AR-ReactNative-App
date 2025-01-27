import { ARObjectModalContext } from "@/components/ARObjectModalProvider";
import { useContext } from "react";
import { useARObjectContextDefaultValue } from "./useARObjectContextDefaultValue";

// ✅ useContextで受け取る値がnullならデフォルト値を返す
export const useARObjectModalContext = () => {
  const context = useContext(ARObjectModalContext);
  if (!context) {
    return useARObjectContextDefaultValue();
  }
  return context;
};
