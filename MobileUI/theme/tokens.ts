export const auroraColors = {
  bg: "#000000",
  surface: "#23313e",
  teal: "#86cdc3",
  lavender: "#bb90e3",
  blue: "#52a5dc",
  text: "#ecf3f2",
  muted: "#bac7d2",
} as const;

export const redLightColors = {
  bg: "#120000",
  surface: "#240606",
  accent: "#ff4d4d",
  accentSoft: "#b63a3a",
  text: "#ff8a8a",
  muted: "#d46a6a",
  border: "#7a2f2f",
} as const;

export const semanticColors = {
  primary: auroraColors.text,
  muted: auroraColors.muted,
  "accent-teal": auroraColors.teal,
  "accent-lavender": auroraColors.lavender,
  border: auroraColors.muted,
} as const;

export const spacingTokens = {
  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "20px",
  "space-6": "24px",
  "space-8": "32px",
  "space-10": "40px",
  "space-11": "44px",
  "space-12": "48px",
} as const;

export const radiusTokens = {
  "radius-sm": "8px",
  "radius-md": "12px",
  "radius-lg": "16px",
  "radius-pill": "999px",
} as const;

export const typeScale = {
  "type-xs": ["12px", { lineHeight: "16px" }],
  "type-sm": ["14px", { lineHeight: "20px" }],
  "type-base": ["16px", { lineHeight: "24px" }],
  "type-lg": ["20px", { lineHeight: "28px" }],
  "type-xl": ["24px", { lineHeight: "32px" }],
} as const;

export type AuroraColorToken = keyof typeof auroraColors;
