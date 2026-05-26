import { Pressable, type PressableProps } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";

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
  const baseClasses =
    "min-h-[44px] items-center justify-center rounded-radius-md px-space-4 py-space-2 active:opacity-80";
  const variantClasses = buttonVariantClasses[variant];
  const disabledClasses = disabled ? "opacity-50" : "";

  return (
    <Pressable
      className={[baseClasses, variantClasses, disabledClasses, className ?? ""].join(" ").trim()}
      disabled={disabled}
      {...props}
    >
      <ThemedText size="sm" weight="semibold" className="text-bg">
        {label}
      </ThemedText>
    </Pressable>
  );
}
