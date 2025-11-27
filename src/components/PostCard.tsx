"use client";

import { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

type Platform = "twitter" | "instagram" | "linkedin";

interface PostCardProps {
  platform: Platform;
  content: string;
  index: number;
}

const PLATFORM_CONFIG = {
  twitter: {
    name: "Twitter/X",
    maxLength: 280,
    headerBg: "black",
    gradient: "linear-gradient(to bottom right, #3f3f46, #18181b)",
  },
  instagram: {
    name: "Instagram",
    maxLength: 2200,
    headerBg: "linear-gradient(to right, #9333ea, #ec4899, #f97316)",
    gradient: "linear-gradient(to bottom right, #9333ea, #ec4899, #f97316)",
  },
  linkedin: {
    name: "LinkedIn",
    maxLength: 3000,
    headerBg: "#0A66C2",
    gradient: "linear-gradient(to bottom right, #2563eb, #1d4ed8)",
  },
};

// Platform icons as inline SVGs
function TwitterIcon() {
  return (
    <svg style={{ height: "20px", width: "20px" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg style={{ height: "20px", width: "20px" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg style={{ height: "20px", width: "20px" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
};

// Helper function to render content with gradient hashtags
function renderContentWithHashtags(text: string) {
  const parts = text.split(/(#\w+)/g);

  return parts.map((part, i) => {
    if (part.startsWith("#")) {
      return (
        <Text
          key={i}
          as="span"
          style={{
            background: "linear-gradient(to right, #a78bfa, #f472b6, #fb923c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          cursor="pointer"
          fontWeight="medium"
        >
          {part}
        </Text>
      );
    }
    return part;
  });
}

export default function PostCard({ platform, content }: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const config = PLATFORM_CONFIG[platform];

  const charPercentage = Math.min((content.length / config.maxLength) * 100, 100);
  const isOverLimit = content.length > config.maxLength;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box
      bg="background.card"
      border="1px solid"
      borderColor="border.default"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        borderColor: "border.light",
      }}
    >
      {/* Header */}
      <Flex
        bg={config.headerBg}
        px={5}
        py={3.5}
        align="center"
        justify="space-between"
      >
        <Flex align="center" gap={2.5} color="white">
          {PLATFORM_ICONS[platform]}
          <Text fontWeight="semibold" fontSize="sm">
            {config.name}
          </Text>
        </Flex>
        <Button
          onClick={handleCopy}
          display="flex"
          alignItems="center"
          gap={1.5}
          px={3}
          py={1.5}
          fontSize="xs"
          fontWeight="medium"
          color="whiteAlpha.900"
          bg="whiteAlpha.100"
          borderRadius="full"
          transition="all 0.2s"
          h="auto"
          _hover={{
            bg: "whiteAlpha.200",
          }}
        >
          {copied ? (
            <>
              <svg style={{ height: "14px", width: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg style={{ height: "14px", width: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </Button>
      </Flex>

      {/* Content */}
      <Box bg="background.card" p={5}>
        {/* Mock profile section */}
        <Flex align="center" gap={3} mb={4}>
          <Flex
            w={10}
            h={10}
            borderRadius="full"
            bg={config.gradient}
            align="center"
            justify="center"
            color="white"
            fontWeight="bold"
            fontSize="sm"
          >
            YB
          </Flex>
          <Box>
            <Text fontWeight="semibold" fontSize="sm" color="text.primary">
              Your Business
            </Text>
            <Text fontSize="xs" color="text.muted">
              @yourbusiness
            </Text>
          </Box>
        </Flex>

        {/* Post content */}
        <Text color="text.secondary" fontSize="sm" lineHeight="relaxed" whiteSpace="pre-wrap" mb={4}>
          {renderContentWithHashtags(content)}
        </Text>

        {/* Footer with character count */}
        <Flex align="center" justify="space-between" pt={4} borderTop="1px solid" borderColor="border.default">
          <Flex align="center" gap={4} color="gray.600">
            {platform === "twitter" && (
              <>
                <Box as="button" _hover={{ color: "red.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "blue.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "green.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </Box>
              </>
            )}
            {platform === "instagram" && (
              <>
                <Box as="button" _hover={{ color: "red.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "blue.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "purple.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </Box>
              </>
            )}
            {platform === "linkedin" && (
              <>
                <Box as="button" _hover={{ color: "blue.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "blue.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Box>
                <Box as="button" _hover={{ color: "blue.400" }} transition="colors 0.2s">
                  <svg style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </Box>
              </>
            )}
          </Flex>

          {/* Character count with progress bar */}
          <Flex align="center" gap={2.5}>
            <Box w={16} h={1.5} bg="border.default" borderRadius="full" overflow="hidden">
              <Box
                h="100%"
                borderRadius="full"
                transition="all 0.2s"
                bg={
                  isOverLimit
                    ? "red.500"
                    : charPercentage > 80
                    ? "yellow.500"
                    : "linear-gradient(to right, #8b5cf6, #ec4899)"
                }
                w={`${Math.min(charPercentage, 100)}%`}
              />
            </Box>
            <Text fontSize="xs" fontWeight="medium" color={isOverLimit ? "red.400" : "text.muted"}>
              {content.length}/{config.maxLength}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
