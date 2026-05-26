import { View, type ViewProps } from "react-native";

import type { WeatherCondition } from "@/lib/types";
import { Input } from "@/components/ui/Input";

export interface LogConditionEditorProps extends ViewProps {
  weather: WeatherCondition;
  onChange: (weather: WeatherCondition) => void;
}

export function LogConditionEditor({
  weather,
  onChange,
  className,
  ...props
}: LogConditionEditorProps & { className?: string }) {
  const updateNumberField = (field: keyof WeatherCondition, rawValue: string) => {
    const parsedValue = Number(rawValue);
    if (!Number.isNaN(parsedValue)) {
      onChange({
        ...weather,
        [field]: parsedValue,
      });
    }
  };

  const updateScaledField = (field: "seeingScale" | "transparencyScale", rawValue: string) => {
    const parsedValue = Number(rawValue);
    if (parsedValue >= 1 && parsedValue <= 5) {
      onChange({
        ...weather,
        [field]: parsedValue as 1 | 2 | 3 | 4 | 5,
      });
    }
  };

  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Input
        label="Cloud Cover (%)"
        keyboardType="numeric"
        value={String(weather.cloudCoverPercent)}
        onChangeText={(value) => updateNumberField("cloudCoverPercent", value)}
      />
      <Input
        label="Seeing (1-5)"
        keyboardType="numeric"
        value={String(weather.seeingScale)}
        onChangeText={(value) => updateScaledField("seeingScale", value)}
      />
      <Input
        label="Transparency (1-5)"
        keyboardType="numeric"
        value={String(weather.transparencyScale)}
        onChangeText={(value) => updateScaledField("transparencyScale", value)}
      />
      <Input
        label="Temperature (C)"
        keyboardType="numeric"
        value={String(weather.temperatureC)}
        onChangeText={(value) => updateNumberField("temperatureC", value)}
      />
      <Input
        label="Humidity (%)"
        keyboardType="numeric"
        value={String(weather.humidityPercent)}
        onChangeText={(value) => updateNumberField("humidityPercent", value)}
      />
    </View>
  );
}
