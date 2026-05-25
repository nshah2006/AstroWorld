import { Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-2xl font-semibold text-white">AstroWorld</Text>
      <Text className="mt-3 text-center text-base text-zinc-300">
        Expo Router + TypeScript + NativeWind scaffold is running.
      </Text>
    </View>
  );
}
