"use client";

import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { AlertCircleIcon } from "@/components/icons";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Box
      bg="rgba(239, 68, 68, 0.05)"
      border="1px solid"
      borderColor="red.500/30"
      borderRadius="2xl"
      p={4}
      mb={8}
    >
      <Flex align="flex-start" gap={3}>
        <Box color="red.400" mt={0.5} flexShrink={0}>
          <AlertCircleIcon size={20} />
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" color="red.300">
            {message}
          </Text>
          {onRetry && (
            <Button
              onClick={onRetry}
              mt={2}
              fontSize="sm"
              color="red.400"
              bg="transparent"
              textDecoration="underline"
              textUnderlineOffset="2px"
              p={0}
              h="auto"
              _hover={{
                color: "red.300",
              }}
            >
              Try again
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
