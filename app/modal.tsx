import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-5">
      <Text className="text-lg font-semibold text-white">AstroWorld modal placeholder</Text>
      <StatusBar style="light" />
    </View>
  );
}
