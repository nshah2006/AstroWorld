import { View, type ViewProps } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";

export interface LogReviewStepProps extends ViewProps {
  note: string;
  shareToCommunity: boolean;
  onNoteChange: (value: string) => void;
  onToggleShareToCommunity: () => void;
}

export function LogReviewStep({
  note,
  shareToCommunity,
  onNoteChange,
  onToggleShareToCommunity,
  className,
  ...props
}: LogReviewStepProps & { className?: string }) {
  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Input label="Session note (optional)" value={note} onChangeText={onNoteChange} />
      <View className="gap-space-2">
        <ThemedText tone="muted" size="sm">
          Share to community
        </ThemedText>
        <Button
          label={shareToCommunity ? "Sharing enabled" : "Sharing disabled"}
          variant={shareToCommunity ? "primary" : "secondary"}
          onPress={onToggleShareToCommunity}
        />
      </View>
    </View>
  );
}
