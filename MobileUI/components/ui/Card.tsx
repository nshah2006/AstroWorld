import { View, type ViewProps } from "react-native";
import { redLightColors, useThemeMode } from "@/theme";

export interface CardProps extends ViewProps {
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-space-3",
  md: "p-space-4",
  lg: "p-space-5",
};

export function Card({ padding = "md", className, ...props }: CardProps & { className?: string }) {
  const { isRedLightMode } = useThemeMode();
  const classes = ["rounded-radius-lg border border-border bg-surface", paddingClasses[padding], className ?? ""]
    .join(" ")
    .trim();

  return (
    <View
      className={classes}
      style={
        isRedLightMode
          ? { backgroundColor: redLightColors.surface, borderColor: redLightColors.border }
          : undefined
      }
      {...props}
    />
  );
}
