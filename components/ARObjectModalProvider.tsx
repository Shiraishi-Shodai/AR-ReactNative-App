import React, { createContext, ReactNode, useState } from "react";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { useARObjectContextDefaultValue } from "@/hooks/useARObjectContextDefaultValue";

export const ARObjectModalContext = createContext<ReturnType<
  typeof useARObjectContextDefaultValue
> | null>(null);

interface ARObjectModalProps {
  children: ReactNode;
}

const ARObjectModalProvider = ({ children }: ARObjectModalProps) => {
  const [ARObjectModalType, setARObjectModalType] = useState<ARObjectModalEnum>(
    ARObjectModalEnum.None
  );
  return (
    <ARObjectModalContext.Provider
      value={{ ARObjectModalType, setARObjectModalType }}
    >
      {children}
    </ARObjectModalContext.Provider>
  );
};

export default ARObjectModalProvider;
