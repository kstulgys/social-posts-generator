"use client";

import { forwardRef, ChangeEvent, ReactNode } from "react";
import {
  Box,
  Text,
  Textarea as ChakraTextarea,
  Flex,
  Field,
} from "@chakra-ui/react";

interface TextareaProps {
  label?: string;
  error?: string;
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  actionButton?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      required,
      showCount,
      maxLength,
      value,
      disabled,
      actionButton,
      ...props
    },
    ref
  ) => {
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <Field.Root invalid={!!error} disabled={disabled}>
        {label && (
          <Field.Label
            fontSize="sm"
            fontWeight="medium"
            color="text.secondary"
            mb={2}
          >
            {label}{" "}
            {required && (
              <Text as="span" color="pink.500">
                *
              </Text>
            )}
          </Field.Label>
        )}
        <Box position="relative" w="full">
          <ChakraTextarea
            ref={ref}
            value={value}
            px={4}
            py={3}
            pr={actionButton ? 12 : 4}
            minH="120px"
            resize="none"
            bg="background.secondary"
            border="1px solid"
            borderColor={error ? "red.500/50" : "border.default"}
            borderRadius="xl"
            color="white"
            _placeholder={{ color: "text.muted" }}
            _focus={{
              outline: "none",
              borderColor: error ? "red.500/50" : "purple.500/50",
              boxShadow: error
                ? "0 0 0 2px rgba(239, 68, 68, 0.2)"
                : "0 0 0 2px rgba(139, 92, 246, 0.2)",
            }}
            _disabled={{
              opacity: 0.5,
              cursor: "not-allowed",
            }}
            transition="all 0.2s"
            {...props}
          />
          {actionButton && (
            <Box position="absolute" top={2} right={2} zIndex={1}>
              {actionButton}
            </Box>
          )}
        </Box>
        <Flex justify="space-between" mt={2}>
          {error ? (
            <Field.ErrorText fontSize="sm" color="red.400">
              {error}
            </Field.ErrorText>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <Field.HelperText fontSize="xs" color="text.muted">
              {currentLength}/{maxLength}
            </Field.HelperText>
          )}
        </Flex>
      </Field.Root>
    );
  }
);

Textarea.displayName = "Textarea";
