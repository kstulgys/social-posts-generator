"use client";

import { Box, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { Tone } from "@/types";
import { TONE_OPTIONS } from "@/constants";

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" color="text.secondary" mb={3}>
        Tone & Style
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap={2}>
        {TONE_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <Button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              disabled={disabled}
              px={4}
              py={2.5}
              borderRadius="xl"
              border="1px solid"
              fontWeight="medium"
              fontSize="sm"
              transition="all 0.2s"
              bg={isSelected ? "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), rgba(249, 115, 22, 0.2))" : "background.secondary"}
              borderColor={isSelected ? "purple.500/50" : "border.default"}
              color={isSelected ? "white" : "text.secondary"}
              _hover={{
                borderColor: isSelected ? "purple.500/50" : "border.light",
                color: isSelected ? "white" : "text.primary",
              }}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <Text as="span" mr={1.5}>{option.emoji}</Text>
              {option.label}
            </Button>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
