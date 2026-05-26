import { SafeAreaView } from "react-native-safe-area-context";
import { View, type ViewProps } from "react-native";

export interface ScreenProps extends ViewProps {
  padded?: boolean;
  spaced?: boolean;
}

export function Screen({ padded = true, spaced = false, className, ...props }: ScreenProps & { className?: string }) {
  const paddingClass = padded ? "px-space-4 py-space-4" : "";
  const spacingClass = spaced ? "gap-space-4" : "";
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className={["flex-1 bg-bg", paddingClass, spacingClass, className ?? ""].join(" ").trim()} {...props} />
    </SafeAreaView>
  );
}
