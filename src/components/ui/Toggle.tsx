"use client";

import { Box, Text, Flex, Switch } from "@chakra-ui/react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export function Toggle({ checked, onChange, disabled, label, description }: ToggleProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      bg="background.secondary"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.default"
    >
      {(label || description) && (
        <Box>
          {label && (
            <Text fontSize="sm" fontWeight="medium" color="text.primary">
              {label}
            </Text>
          )}
          {description && (
            <Text fontSize="xs" color="text.muted" mt={0.5}>
              {description}
            </Text>
          )}
        </Box>
      )}
      <Switch.Root
        checked={checked}
        onCheckedChange={(e) => onChange(e.checked)}
        disabled={disabled}
        colorPalette="purple"
      >
        <Switch.HiddenInput />
        <Switch.Control
          bg={checked ? "linear-gradient(to right, #8b5cf6, #ec4899)" : "border.light"}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </Flex>
  );
}
