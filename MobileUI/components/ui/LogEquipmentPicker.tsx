import { View, type ViewProps } from "react-native";

import type { EquipmentItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface LogEquipmentPickerProps extends ViewProps {
  equipment: EquipmentItem[];
  selectedEquipmentIds: string[];
  onToggleEquipment: (equipmentId: string) => void;
}

export function LogEquipmentPicker({
  equipment,
  selectedEquipmentIds,
  onToggleEquipment,
  className,
  ...props
}: LogEquipmentPickerProps & { className?: string }) {
  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      {equipment.map((equipmentItem) => {
        const isSelected = selectedEquipmentIds.includes(equipmentItem.id);
        return (
          <Card key={equipmentItem.id} padding="sm">
            <View className="gap-space-2">
              <ThemedText weight="semibold">
                {equipmentItem.brand} {equipmentItem.model}
              </ThemedText>
              <View className="flex-row items-center justify-between">
                <Tag label={equipmentItem.category} />
                <Button
                  label={isSelected ? "Selected" : "Pick"}
                  variant={isSelected ? "secondary" : "primary"}
                  onPress={() => onToggleEquipment(equipmentItem.id)}
                />
              </View>
            </View>
          </Card>
        );
      })}
    </View>
  );
}
