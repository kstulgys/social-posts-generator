import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-heading), sans-serif" },
        body: { value: "var(--font-body), sans-serif" },
      },
      colors: {
        brand: {
          50: { value: "#faf5ff" },
          100: { value: "#f3e8ff" },
          200: { value: "#e9d5ff" },
          300: { value: "#d8b4fe" },
          400: { value: "#c084fc" },
          500: { value: "#a855f7" },
          600: { value: "#9333ea" },
          700: { value: "#7e22ce" },
          800: { value: "#6b21a8" },
          900: { value: "#581c87" },
        },
        background: {
          primary: { value: "#09090f" },
          secondary: { value: "#0f0f17" },
          card: { value: "#12121a" },
          cardHover: { value: "#1a1a24" },
        },
        border: {
          default: { value: "#1f1f2e" },
          light: { value: "#2a2a3e" },
        },
        text: {
          primary: { value: "#ffffff" },
          secondary: { value: "#a1a1aa" },
          muted: { value: "#71717a" },
        },
        gradient: {
          start: { value: "#8b5cf6" },
          middle: { value: "#ec4899" },
          end: { value: "#f97316" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "{colors.background.primary}" },
          subtle: { value: "{colors.background.secondary}" },
          muted: { value: "{colors.background.card}" },
        },
        fg: {
          DEFAULT: { value: "{colors.text.primary}" },
          muted: { value: "{colors.text.secondary}" },
          subtle: { value: "{colors.text.muted}" },
        },
        border: {
          DEFAULT: { value: "{colors.border.default}" },
          muted: { value: "{colors.border.light}" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "background.primary",
      color: "text.primary",
      minHeight: "100vh",
    },
    "*::selection": {
      bg: "brand.500/30",
    },
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#0f0f17",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#2a2a3e",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#3a3a4e",
    },
  },
});

export const system = createSystem(defaultConfig, config);
