import { createContext, useContext, type ReactNode } from "react";

import { redLightColors } from "@/theme";
import { useUIStore } from "@/store";

export interface ThemeModeContextValue {
  isRedLightMode: boolean;
}

const defaultThemeModeValue: ThemeModeContextValue = {
  isRedLightMode: false,
};

export const ThemeModeContext = createContext<ThemeModeContextValue>(defaultThemeModeValue);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const isRedLightModeEnabled = useUIStore((state) => state.isRedLightModeEnabled);
  return <ThemeModeContext.Provider value={{ isRedLightMode: isRedLightModeEnabled }}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export { redLightColors };
