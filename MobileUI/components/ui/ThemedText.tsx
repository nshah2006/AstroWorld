import { Text, type TextProps } from "react-native";
import { useThemeMode } from "@/theme";

export interface ThemedTextProps extends TextProps {
  tone?: "primary" | "muted" | "teal" | "lavender";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}

const toneClasses: Record<NonNullable<ThemedTextProps["tone"]>, string> = {
  primary: "text-primary",
  muted: "text-muted",
  teal: "text-accent-teal",
  lavender: "text-accent-lavender",
};

const sizeClasses: Record<NonNullable<ThemedTextProps["size"]>, string> = {
  xs: "text-type-xs",
  sm: "text-type-sm",
  base: "text-type-base",
  lg: "text-type-lg",
  xl: "text-type-xl",
};

const weightClasses: Record<NonNullable<ThemedTextProps["weight"]>, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses: Record<NonNullable<ThemedTextProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function ThemedText({
  tone = "primary",
  size = "base",
  weight = "regular",
  align = "left",
  className,
  ...props
}: ThemedTextProps & { className?: string }) {
  const { isRedLightMode } = useThemeMode();
  const redToneClasses: Record<NonNullable<ThemedTextProps["tone"]>, string> = {
    primary: "text-red-200",
    muted: "text-red-400",
    teal: "text-red-300",
    lavender: "text-red-400",
  };
  const classes = [
    isRedLightMode ? redToneClasses[tone] : toneClasses[tone],
    sizeClasses[size],
    weightClasses[weight],
    alignClasses[align],
    className ?? "",
  ]
    .join(" ")
    .trim();

  return <Text className={classes} {...props} />;
}
