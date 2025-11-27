"use client";

import { Box, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { Platform } from "@/types";
import { PLATFORM_OPTIONS } from "@/constants";
import { TwitterIcon, InstagramIcon, LinkedInIcon, CheckIcon } from "@/components/icons";

interface PlatformSelectorProps {
  value: Platform[];
  onChange: (platforms: Platform[]) => void;
  disabled?: boolean;
  error?: string;
}

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
};

export function PlatformSelector({ value, onChange, disabled, error }: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    const isSelected = value.includes(platform);
    
    // Prevent unchecking if it's the last selected platform
    if (isSelected && value.length === 1) {
      return;
    }
    
    const newPlatforms = isSelected
      ? value.filter((p) => p !== platform)
      : [...value, platform];
    onChange(newPlatforms);
  };

  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" color="text.secondary" mb={3}>
        Platforms <Text as="span" color="pink.500">*</Text>
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 3 }} gap={3}>
        {PLATFORM_OPTIONS.map((option) => {
          const isSelected = value.includes(option.value);
          return (
            <Button
              key={option.value}
              type="button"
              onClick={() => togglePlatform(option.value)}
              disabled={disabled}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              px={4}
              py={2.5}
              borderRadius="xl"
              border="1px solid"
              fontWeight="medium"
              fontSize="sm"
              transition="all 0.2s"
              bg={isSelected ? "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), rgba(249, 115, 22, 0.2))" : "background.secondary"}
              borderColor={isSelected ? "purple.500/50" : "border.default"}
              color={isSelected ? "text.primary" : "text.secondary"}
              _hover={{
                borderColor: isSelected ? "purple.500/50" : "border.light",
                color: "text.primary",
              }}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              {PLATFORM_ICONS[option.value]}
              <Text as="span">{option.label}</Text>
              {isSelected && <Box color="purple.400"><CheckIcon size={16} /></Box>}
            </Button>
          );
        })}
      </SimpleGrid>
      {error && (
        <Text mt={2} fontSize="sm" color="red.400">
          {error}
        </Text>
      )}
    </Box>
  );
}
