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
        gradient: {
          start: { value: "#8b5cf6" },
          middle: { value: "#ec4899" },
          end: { value: "#f97316" },
        },
      },
    },
    semanticTokens: {
      colors: {
        background: {
          primary: {
            value: { _light: "#fafafa", _dark: "#09090f" },
          },
          secondary: {
            value: { _light: "#ffffff", _dark: "#0f0f17" },
          },
          card: {
            value: { _light: "#ffffff", _dark: "#12121a" },
          },
          cardHover: {
            value: { _light: "#f4f4f5", _dark: "#1a1a24" },
          },
        },
        border: {
          default: {
            value: { _light: "#d4d4d8", _dark: "#1f1f2e" },
          },
          light: {
            value: { _light: "#a1a1aa", _dark: "#2a2a3e" },
          },
        },
        text: {
          primary: {
            value: { _light: "#18181b", _dark: "#ffffff" },
          },
          secondary: {
            value: { _light: "#52525b", _dark: "#a1a1aa" },
          },
          muted: {
            value: { _light: "#a1a1aa", _dark: "#71717a" },
          },
        },
        bg: {
          DEFAULT: {
            value: { _light: "{colors.background.primary}", _dark: "{colors.background.primary}" },
          },
          subtle: {
            value: { _light: "{colors.background.secondary}", _dark: "{colors.background.secondary}" },
          },
          muted: {
            value: { _light: "{colors.background.card}", _dark: "{colors.background.card}" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.text.primary}", _dark: "{colors.text.primary}" },
          },
          muted: {
            value: { _light: "{colors.text.secondary}", _dark: "{colors.text.secondary}" },
          },
          subtle: {
            value: { _light: "{colors.text.muted}", _dark: "{colors.text.muted}" },
          },
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
    ".dark ::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    ".dark ::-webkit-scrollbar-track": {
      background: "#0f0f17",
    },
    ".dark ::-webkit-scrollbar-thumb": {
      background: "#2a2a3e",
      borderRadius: "4px",
    },
    ".dark ::-webkit-scrollbar-thumb:hover": {
      background: "#3a3a4e",
    },
  },
});

export const system = createSystem(defaultConfig, config);
