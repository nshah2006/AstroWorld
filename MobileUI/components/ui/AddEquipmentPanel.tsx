import { View, type ViewProps } from "react-native";

import type { EquipmentItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface AddEquipmentPanelProps extends ViewProps {
  query: string;
  searchResults: EquipmentItem[];
  onQueryChange: (value: string) => void;
  onAddEquipment: (equipmentItem: EquipmentItem) => void;
}

export function AddEquipmentPanel({
  query,
  searchResults,
  onQueryChange,
  onAddEquipment,
  className,
  ...props
}: AddEquipmentPanelProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="lg" weight="semibold">
        Add equipment
      </ThemedText>
      <Input
        label="Search equipment catalog"
        value={query}
        onChangeText={onQueryChange}
        placeholder="Search by brand or model"
      />
      <View className="gap-space-2">
        {searchResults.slice(0, 6).map((equipmentItem) => (
          <View key={equipmentItem.id} className="gap-space-2 rounded-radius-md border border-border p-space-3">
            <ThemedText weight="semibold">
              {equipmentItem.brand} {equipmentItem.model}
            </ThemedText>
            <View className="flex-row items-center justify-between">
              <Tag label={equipmentItem.category} />
              <Button label="Add" onPress={() => onAddEquipment(equipmentItem)} />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}
