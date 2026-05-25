import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-black px-5">
        <Text className="text-lg font-semibold text-white">This screen does not exist.</Text>

        <Link href="/" className="mt-4 py-2">
          <Text className="text-sm text-zinc-300">Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}
