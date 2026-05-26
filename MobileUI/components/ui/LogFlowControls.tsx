import { View, type ViewProps } from "react-native";

import { Button } from "@/components/ui/Button";

export interface LogFlowControlsProps extends ViewProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function LogFlowControls({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
  className,
  ...props
}: LogFlowControlsProps & { className?: string }) {
  return (
    <View className={["flex-row gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      {!isFirstStep ? (
        <View className="flex-1">
          <Button label="Back" variant="secondary" onPress={onBack} />
        </View>
      ) : null}
      <View className="flex-1">
        <Button label={isLastStep ? "Submit" : "Next"} onPress={isLastStep ? onSubmit : onNext} />
      </View>
    </View>
  );
}
