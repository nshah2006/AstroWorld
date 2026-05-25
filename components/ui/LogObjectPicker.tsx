import { View, type ViewProps } from "react-native";

import type { ObservationObject } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface LogObjectPickerProps extends ViewProps {
  objects: ObservationObject[];
  selectedObjectIds: string[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onToggleObject: (objectId: string) => void;
}

export function LogObjectPicker({
  objects,
  selectedObjectIds,
  searchQuery,
  onSearchQueryChange,
  onToggleObject,
  className,
  ...props
}: LogObjectPickerProps & { className?: string }) {
  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Input label="Search objects" value={searchQuery} onChangeText={onSearchQueryChange} />
      <View className="flex-row flex-wrap gap-space-2">
        {objects.map((observationObject) => {
          const isSelected = selectedObjectIds.includes(observationObject.id);
          return (
            <Card key={observationObject.id} padding="sm" className="w-full">
              <View className="gap-space-2">
                <ThemedText weight="semibold">{observationObject.name}</ThemedText>
                <View className="flex-row items-center justify-between">
                  <Tag label={observationObject.catalogLabel} />
                  <Button
                    label={isSelected ? "Selected" : "Select"}
                    variant={isSelected ? "secondary" : "primary"}
                    onPress={() => onToggleObject(observationObject.id)}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
}
