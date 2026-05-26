import { View, type ViewProps } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";

export interface LogFlowStepHeaderProps extends ViewProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export function LogFlowStepHeader({
  currentStep,
  totalSteps,
  title,
  subtitle,
  className,
  ...props
}: LogFlowStepHeaderProps & { className?: string }) {
  return (
    <View className={["gap-space-2", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="sm" tone="muted">
        Step {currentStep} of {totalSteps}
      </ThemedText>
      <ThemedText size="lg" weight="semibold">
        {title}
      </ThemedText>
      <ThemedText size="sm" tone="muted">
        {subtitle}
      </ThemedText>
    </View>
  );
}
