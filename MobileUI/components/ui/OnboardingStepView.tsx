import { View, type ViewProps } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";

export type OnboardingStepKind = "value-plan" | "value-log" | "value-connect" | "location-priming" | "first-telescope";

export interface OnboardingStepViewProps extends ViewProps {
  stepIndex: number;
  totalSteps: number;
  stepKind: OnboardingStepKind;
  telescopeName: string;
  onTelescopeNameChange: (value: string) => void;
  onPrimaryAction: () => void;
  onBack?: () => void;
}

const stepCopy: Record<OnboardingStepKind, { title: string; description: string; primaryLabel: string }> = {
  "value-plan": {
    title: "Plan your nights",
    description: "Preview tonight's sky and prepare sessions ahead, even when offline.",
    primaryLabel: "Continue",
  },
  "value-log": {
    title: "Log observations",
    description: "Capture conditions, objects, and notes quickly in the field.",
    primaryLabel: "Continue",
  },
  "value-connect": {
    title: "Connect locally",
    description: "Share progress with nearby observers and learn from real sessions.",
    primaryLabel: "Sign up with Apple",
  },
  "location-priming": {
    title: "Location helps planning",
    description: "We use location to suggest realistic viewing windows and nearby observing sites.",
    primaryLabel: "Allow location access",
  },
  "first-telescope": {
    title: "Add your first telescope",
    description: "Start with one setup so logs and community tips fit your gear.",
    primaryLabel: "Finish onboarding",
  },
};

export function OnboardingStepView({
  stepIndex,
  totalSteps,
  stepKind,
  telescopeName,
  onTelescopeNameChange,
  onPrimaryAction,
  onBack,
  className,
  ...props
}: OnboardingStepViewProps & { className?: string }) {
  const copy = stepCopy[stepKind];

  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="sm" tone="muted">
        Step {stepIndex} of {totalSteps}
      </ThemedText>
      <ThemedText size="xl" weight="semibold">
        {copy.title}
      </ThemedText>
      <ThemedText tone="muted">{copy.description}</ThemedText>

      {stepKind === "first-telescope" ? (
        <Input label="Telescope name" value={telescopeName} onChangeText={onTelescopeNameChange} />
      ) : null}

      <View className="gap-space-2">
        <Button label={copy.primaryLabel} onPress={onPrimaryAction} />
        {onBack ? <Button label="Back" variant="secondary" onPress={onBack} /> : null}
      </View>
    </Card>
  );
}
