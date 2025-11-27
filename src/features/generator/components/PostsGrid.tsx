"use client";

import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { SocialMediaPost } from "@/types";
import PostCard from "@/components/PostCard";

interface PostsGridProps {
  posts: SocialMediaPost[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  if (posts.length === 0) return null;

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={6}>
        <Text as="h2" fontSize="2xl" fontWeight="semibold" color="white">
          Generated Posts
        </Text>
        <Text
          fontSize="sm"
          color="text.muted"
          bg="gray.800/50"
          px={3}
          py={1}
          borderRadius="full"
        >
          {posts.length} posts
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {posts.map((post, index) => (
          <PostCard key={index} platform={post.platform} content={post.content} index={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
