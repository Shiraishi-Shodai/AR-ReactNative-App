import { ARObjectModalContext } from "@/components/ARObjectModalProvider";
import { useARObjectContextDefaultValue } from "@/components/useARObjectContextDefaultValue";
import { useContext } from "react";

// ✅ useContextで受け取る値がnullならデフォルト値を返す
export const useARObjectModalContext = () => {
  const context = useContext(ARObjectModalContext);
  if (!context) {
    return useARObjectContextDefaultValue();
  }
  return context;
};
