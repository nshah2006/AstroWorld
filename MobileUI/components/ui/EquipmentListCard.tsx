import { View, type ViewProps } from "react-native";

import type { EquipmentItem } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface EquipmentListCardProps extends ViewProps {
  equipment: EquipmentItem[];
}

export function EquipmentListCard({ equipment, className, ...props }: EquipmentListCardProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="lg" weight="semibold">
        Equipment
      </ThemedText>
      {equipment.map((equipmentItem) => (
        <View key={equipmentItem.id} className="gap-space-1 rounded-radius-md border border-border p-space-3">
          <ThemedText weight="semibold">
            {equipmentItem.brand} {equipmentItem.model}
          </ThemedText>
          <View className="flex-row">
            <Tag label={equipmentItem.category} />
          </View>
          {equipmentItem.notes ? (
            <ThemedText size="sm" tone="muted">
              {equipmentItem.notes}
            </ThemedText>
          ) : null}
        </View>
      ))}
    </Card>
  );
}
