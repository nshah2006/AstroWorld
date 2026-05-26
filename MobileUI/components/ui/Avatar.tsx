import { View, type ViewProps } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";

export interface AvatarProps extends ViewProps {
  initials: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-space-8 w-space-8",
  md: "h-space-10 w-space-10",
  lg: "h-space-12 w-space-12",
};

const textSizeByAvatar: Record<NonNullable<AvatarProps["size"]>, "sm" | "base" | "lg"> = {
  sm: "sm",
  md: "base",
  lg: "lg",
};

export function Avatar({
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps & { className?: string }) {
  return (
    <View
      className={[
        "items-center justify-center rounded-radius-pill border border-border bg-surface",
        sizeClasses[size],
        className ?? "",
      ].join(" ").trim()}
      {...props}
    >
      <ThemedText tone="teal" size={textSizeByAvatar[size]} weight="semibold">
        {initials.toUpperCase().slice(0, 2)}
      </ThemedText>
    </View>
  );
}
