"use client";

import { createContext, useContext, useEffect } from "react";
import { refreshScroll } from "@/lib/lenis";

const MotionReadyContext = createContext(true);

type MotionReadyProviderProps = {
  ready: boolean;
  children: React.ReactNode;
};

export function MotionReadyProvider({
  ready,
  children,
}: MotionReadyProviderProps) {
  useEffect(() => {
    if (!ready) return;

    refreshScroll();

    const frameId = requestAnimationFrame(() => {
      refreshScroll();
    });
    const timeoutId = window.setTimeout(refreshScroll, 150);
    const lateTimeoutId = window.setTimeout(refreshScroll, 450);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(lateTimeoutId);
    };
  }, [ready]);

  return (
    <MotionReadyContext.Provider value={ready}>
      {children}
    </MotionReadyContext.Provider>
  );
}

export function useMotionReady(): boolean {
  return useContext(MotionReadyContext);
}
