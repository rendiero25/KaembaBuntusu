"use client";

import { createContext, useContext } from "react";

const MotionReadyContext = createContext(true);

type MotionReadyProviderProps = {
  ready: boolean;
  children: React.ReactNode;
};

export function MotionReadyProvider({
  ready,
  children,
}: MotionReadyProviderProps) {
  return (
    <MotionReadyContext.Provider value={ready}>
      {children}
    </MotionReadyContext.Provider>
  );
}

export function useMotionReady(): boolean {
  return useContext(MotionReadyContext);
}
