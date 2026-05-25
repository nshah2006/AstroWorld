import { TextInput, type TextInputProps, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";
import { semanticColors } from "@/theme";

export interface InputProps extends TextInputProps {
  label: string;
}

export function Input({ label, className, ...props }: InputProps & { className?: string }) {
  return (
    <View className={["gap-space-2", className ?? ""].join(" ").trim()}>
      <ThemedText size="sm" tone="muted">
        {label}
      </ThemedText>
      <TextInput
        className="min-h-[44px] rounded-radius-md border border-border bg-surface px-space-3 py-space-2 text-type-base text-primary"
        placeholderTextColor={semanticColors.muted}
        {...props}
      />
    </View>
  );
}
