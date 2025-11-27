"use client";

import { ReactNode } from "react";
import { Button as ChakraButton, Flex, Box } from "@chakra-ui/react";
import { SpinnerIcon } from "@/components/icons";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "gradient" | "secondary" | "rainbow";
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  isLoading,
  loadingText = "Generating...",
  variant = "gradient",
  icon,
  disabled,
  onClick,
}: ButtonProps) {
  const isGradient = variant === "gradient";
  const isRainbow = variant === "rainbow";

  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled || isLoading}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      fontWeight="semibold"
      px={6}
      py={3}
      borderRadius="full"
      color="white"
      transition="all 0.3s"
      className={isGradient ? "btn-gradient" : isRainbow ? "btn-rainbow" : undefined}
      bg={isGradient || isRainbow ? undefined : "gray.700"}
      _hover={{
        transform: disabled || isLoading ? "none" : "translateY(-2px)",
        boxShadow: disabled || isLoading ? "none" : isGradient ? "0 10px 40px -10px rgba(139, 92, 246, 0.5)" : isRainbow ? "0 10px 40px -10px rgba(251, 191, 36, 0.5)" : undefined,
        bg: isGradient || isRainbow ? undefined : "gray.600",
      }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
        transform: "none",
        boxShadow: "none",
      }}
    >
      {isLoading ? (
        <Flex align="center" gap={2}>
          <SpinnerIcon />
          {loadingText}
        </Flex>
      ) : (
        <Flex align="center" gap={2}>
          {icon && <Box>{icon}</Box>}
          {children}
        </Flex>
      )}
    </ChakraButton>
  );
}
