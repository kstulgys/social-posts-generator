"use client";

import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const FUNNY_MESSAGES = [
  "Brewing creativity",
  "Teaching AI about your product",
  "Consulting the social media gods",
  "Crafting viral content",
  "Sprinkling engagement magic",
  "Channeling influencer energy",
  "Asking ChatGPT's cool cousin",
  "Converting caffeine to content",
  "Summoning the algorithm",
  "Generating hashtag wisdom",
  "Polishing pixels",
  "Convincing AI this is important",
  "Mixing memes with marketing",
  "Loading witty remarks",
  "Optimizing for dopamine hits",
  "Befriending the engagement fairy",
  "Translating vibes to posts",
  "Cooking up something special",
  "Manifesting viral potential",
  "Downloading creativity.exe",
]

function getRandomIndex(currentIndex: number, max: number): number {
  let newIndex = Math.floor(Math.random() * max)
  // Ensure we don't show the same message twice in a row
  while (newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * max)
  }
  return newIndex
}

function FunnyLoadingMessage() {
  const [messageIndex, setMessageIndex] = useState(() => Math.floor(Math.random() * FUNNY_MESSAGES.length))
  const [isAnimating, setIsAnimating] = useState(false)
  const [dots, setDots] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Cycle through messages every 2.5 seconds with animation
    const messageInterval = setInterval(() => {
      setIsAnimating(true)
      
      // After exit animation (300ms), change the message
      timeoutRef.current = setTimeout(() => {
        setMessageIndex((prev) => getRandomIndex(prev, FUNNY_MESSAGES.length))
        setIsAnimating(false)
      }, 300)
    }, 2500)

    // Animate dots every 400ms
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotsInterval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const message = FUNNY_MESSAGES[messageIndex]

  return (
    <Box position="relative" h="36px">
      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="semibold"
        className="gradient-text"
        whiteSpace="nowrap"
        lineHeight="36px"
        style={{
          transform: isAnimating ? "translateY(-10px)" : "translateY(0)",
          opacity: isAnimating ? 0 : 1,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        {message}
        <Text as="span" display="inline-block" w="30px" textAlign="left">
          {dots}
        </Text>
      </Text>
    </Box>
  )
}

export function LoadingSkeleton() {
  return (
    <Box>
      <Flex align="center" justify="space-between" mb={6}>
        <FunnyLoadingMessage />
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
