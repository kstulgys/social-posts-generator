"use client";

import { forwardRef, ChangeEvent } from "react";
import { Box, Text, Input as ChakraInput, Field } from "@chakra-ui/react";

interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  prefix?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  inputMode?: "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, prefix, disabled, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error} disabled={disabled}>
        {label && (
          <Field.Label fontSize="sm" fontWeight="medium" color="text.secondary" mb={2}>
            {label} {required && <Text as="span" color="pink.500">*</Text>}
          </Field.Label>
        )}
        <Box position="relative">
          {prefix && (
            <Text
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              color="text.muted"
              zIndex={1}
            >
              {prefix}
            </Text>
          )}
          <ChakraInput
            ref={ref}
            pl={prefix ? 8 : 4}
            pr={4}
            py={3}
            bg="background.secondary"
            border="1px solid"
            borderColor={error ? "red.500/50" : "border.default"}
            borderRadius="xl"
            color="white"
            _placeholder={{ color: "text.muted" }}
            _focus={{
              outline: "none",
              borderColor: error ? "red.500/50" : "purple.500/50",
              boxShadow: error ? "0 0 0 2px rgba(239, 68, 68, 0.2)" : "0 0 0 2px rgba(139, 92, 246, 0.2)",
            }}
            _disabled={{
              opacity: 0.5,
              cursor: "not-allowed",
            }}
            transition="all 0.2s"
            {...props}
          />
        </Box>
        {error && (
          <Field.ErrorText mt={2} fontSize="sm" color="red.400">
            {error}
          </Field.ErrorText>
        )}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
