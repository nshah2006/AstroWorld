import { SafeAreaView } from "react-native-safe-area-context";
import { type ViewProps } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { redLightColors, useThemeMode } from "@/theme";

export interface ScreenProps extends ViewProps {
  padded?: boolean;
  spaced?: boolean;
}

export function Screen({ padded = true, spaced = false, className, ...props }: ScreenProps & { className?: string }) {
  const paddingClass = padded ? "px-space-4 py-space-4" : "";
  const spacingClass = spaced ? "gap-space-4" : "";
  const { isRedLightMode } = useThemeMode();
  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      style={isRedLightMode ? { backgroundColor: redLightColors.bg } : undefined}
    >
      <Animated.View
        entering={FadeIn.duration(260)}
        className={["flex-1 bg-bg", paddingClass, spacingClass, className ?? ""].join(" ").trim()}
        style={isRedLightMode ? { backgroundColor: redLightColors.bg } : undefined}
        {...props}
      />
    </SafeAreaView>
  );
}
