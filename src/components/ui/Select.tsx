"use client";

import { Box, Text, Button, Menu, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@/components/icons";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: readonly SelectOption[];
  required?: boolean;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
}

export function Select({ label, options, required, disabled, value, onChange }: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label || options[0]?.label || "Select...";

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange({ target: { value: optionValue } });
    }
  };

  return (
    <Box w="100%">
      {label && (
        <Text fontSize="sm" fontWeight="medium" color="text.secondary" mb={2}>
          {label}{" "}
          {required ? (
            <Text as="span" color="pink.500">*</Text>
          ) : (
            <Text as="span" color="text.muted">(optional)</Text>
          )}
        </Text>
      )}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            disabled={disabled}
            w="100%"
            px={4}
            py={3}
            h="auto"
            bg="background.secondary"
            border="1px solid"
            borderColor="border.default"
            borderRadius="xl"
            color="white"
            fontWeight="normal"
            textAlign="left"
            justifyContent="space-between"
            _hover={{
              borderColor: "border.light",
            }}
            _focus={{
              outline: "none",
              borderColor: "purple.500/50",
              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.2)",
            }}
            _disabled={{
              opacity: 0.5,
              cursor: "not-allowed",
            }}
          >
            <Text as="span">{displayLabel}</Text>
            <Box color="text.muted">
              <ChevronDownIcon />
            </Box>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content
              bg="background.secondary"
              border="1px solid"
              borderColor="border.default"
              borderRadius="xl"
              py={2}
              minW="xs"
              boxShadow="0 10px 40px -10px rgba(0, 0, 0, 0.5)"
            >
              {options.map((option) => (
                <Menu.Item
                  key={option.value}
                  value={option.value}
                  onClick={() => handleSelect(option.value)}
                  px={4}
                  py={2.5}
                  cursor="pointer"
                  bg={value === option.value ? "purple.500/20" : "transparent"}
                  color={value === option.value ? "white" : "text.secondary"}
                  _hover={{
                    bg: "purple.500/10",
                    color: "white",
                  }}
                >
                  {option.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
}
