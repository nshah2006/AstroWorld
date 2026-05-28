import { View, type ViewProps } from "react-native";
import { redLightColors, useThemeMode } from "@/theme";

export interface TabIconProps extends ViewProps {
  focused?: boolean;
  emphasized?: boolean;
}

export function TabIcon({
  focused = false,
  emphasized = false,
  className,
  ...props
}: TabIconProps & { className?: string }) {
  const { isRedLightMode } = useThemeMode();
  const base = "rounded-radius-pill";
  const regularSize = "h-space-4 w-space-4";
  const emphasizedSize = "h-space-10 w-space-10 items-center justify-center";
  const iconColor = focused ? "bg-accent-teal" : "bg-muted";
  const emphasizedContainer = emphasized ? "bg-surface border border-border -mt-space-3" : "";

  return (
    <View
      className={[base, emphasized ? emphasizedSize : regularSize, emphasizedContainer, className ?? ""].join(" ").trim()}
      style={isRedLightMode && emphasized ? { backgroundColor: redLightColors.surface, borderColor: redLightColors.border, borderWidth: 1 } : undefined}
      {...props}
    >
      <View
        className={[base, emphasized ? "h-space-4 w-space-4" : regularSize, iconColor].join(" ").trim()}
        style={isRedLightMode ? { backgroundColor: redLightColors.accent } : undefined}
      />
    </View>
  );
}
