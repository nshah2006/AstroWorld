import { Pressable, type PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { ThemedText } from "@/components/ui/ThemedText";
import { redLightColors, useThemeMode } from "@/theme";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: "primary" | "secondary";
}

const buttonVariantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent-teal",
  secondary: "bg-accent-lavender",
};

export function Button({
  label,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps & { className?: string }) {
  const { isRedLightMode } = useThemeMode();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const baseClasses =
    "min-h-[44px] items-center justify-center rounded-radius-md px-space-4 py-space-2 active:opacity-80";
  const variantClasses = isRedLightMode
    ? variant === "primary"
      ? "bg-red-700"
      : "bg-red-900"
    : buttonVariantClasses[variant];
  const disabledClasses = disabled ? "opacity-50" : "";

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={[baseClasses, variantClasses, disabledClasses, className ?? ""].join(" ").trim()}
        style={isRedLightMode ? { borderColor: redLightColors.border, borderWidth: 1 } : undefined}
        disabled={disabled}
        onPressIn={(event) => {
          scale.value = withTiming(0.97, { duration: 120 });
          props.onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.value = withTiming(1, { duration: 180 });
          props.onPressOut?.(event);
        }}
        {...props}
      >
        <ThemedText size="sm" weight="semibold" className={isRedLightMode ? "text-red-200" : "text-bg"}>
          {label}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}
