import { View, type ViewProps } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";

export interface TagProps extends ViewProps {
  label: string;
  tone?: "teal" | "lavender" | "muted";
}

const toneClasses: Record<NonNullable<TagProps["tone"]>, string> = {
  teal: "border-accent-teal bg-accent-teal",
  lavender: "border-accent-lavender bg-accent-lavender",
  muted: "border-border bg-surface",
};

const textToneByTag: Record<NonNullable<TagProps["tone"]>, "primary" | "muted"> = {
  teal: "primary",
  lavender: "primary",
  muted: "muted",
};

export function Tag({ label, tone = "muted", className, ...props }: TagProps & { className?: string }) {
  return (
    <View
      className={[
        "rounded-radius-pill border px-space-3 py-space-1",
        toneClasses[tone],
        className ?? "",
      ].join(" ").trim()}
      {...props}
    >
      <ThemedText size="xs" weight="medium" tone={textToneByTag[tone]} align="center">
        {label}
      </ThemedText>
    </View>
  );
}
