import React, { createContext, ReactNode } from "react";
import { useARObjectContextDefaultValue } from "./useARObjectContextDefaultValue";

export const ARObjectModalContext = createContext<ReturnType<
  typeof useARObjectContextDefaultValue
> | null>(null);

interface ARObjectModalProps {
  children: ReactNode;
}

const ARObjectModalProvider = ({ children }: ARObjectModalProps) => {
  return (
    <ARObjectModalContext.Provider value={useARObjectContextDefaultValue()}>
      {children}
    </ARObjectModalContext.Provider>
  );
};

export default ARObjectModalProvider;
