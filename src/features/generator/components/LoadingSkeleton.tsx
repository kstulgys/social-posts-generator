"use client";

import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";

export function LoadingSkeleton() {
  return (
    <Box>
      <Flex align="center" justify="space-between" mb={6}>
        <Text as="h2" fontSize="2xl" fontWeight="semibold" color="text.primary">
          Generating Posts...
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Box
            key={i}
            bg="background.card"
            border="1px solid"
            borderColor="border.default"
            borderRadius="2xl"
            overflow="hidden"
            className="animate-pulse"
          >
            <Box h={14} bg="border.default" />
            <Box p={5}>
              <Flex align="center" gap={3} mb={4}>
                <Box w={10} h={10} bg="border.default" borderRadius="full" />
                <Box>
                  <Box h={4} w={24} bg="border.default" borderRadius="md" mb={1.5} />
                  <Box h={3} w={16} bg="border.light" borderRadius="md" />
                </Box>
              </Flex>
              <Flex direction="column" gap={2.5}>
                <Box h={4} bg="border.default" borderRadius="md" w="100%" />
                <Box h={4} bg="border.default" borderRadius="md" w="83%" />
                <Box h={4} bg="border.default" borderRadius="md" w="66%" />
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
