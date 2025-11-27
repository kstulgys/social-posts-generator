"use client"

import { useSnapshot } from "valtio"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  IconButton,
} from "@chakra-ui/react"
import { Product, Tone, Platform, Language } from "@/types"
import {
  CATEGORY_OPTIONS,
  VALIDATION,
  LANGUAGE_OPTIONS,
  DEFAULT_LANGUAGE,
} from "@/constants"
import { validateProduct } from "@/utils/validation"
import { Input, Textarea, Select, Toggle, Button } from "@/components/ui"
import { BoltIcon, SparklesIcon, SpinnerIcon } from "@/components/icons"
import {
  ToneSelector,
  PlatformSelector,
  ErrorAlert,
  LoadingSkeleton,
  PostsGrid,
} from "@/features/generator/components"
import {
  generatorState,
  generatorActions,
} from "@/stores/generator"

export default function Home() {
  const state = useSnapshot(generatorState)
  const product = state.product as Product
  const errors = validateProduct(product)
  const isValid = Object.keys(errors).length === 0

  return (
    <Box as="main" minH="100vh" py={12} px={{ base: 4, sm: 6, lg: 8 }}>
      {/* Funny Warning Banner */}
      <Flex
        justify="center"
        align="center"
        bg="linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))"
        border="1px solid"
        borderColor="orange.500/30"
        borderRadius="full"
        py={2}
        px={4}
        mb={6}
        mx="auto"
        maxW="fit-content"
        gap={2}
      >
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          color="orange.300"
          textAlign="center"
        >
          <Text as="span" fontSize={{ base: "sm", sm: "md" }}>
            🚨
          </Text>{" "}
          Easy there, Shakespeare! This runs on my credit card. Generate
          responsibly or my landlord gets a new tenant.{" "}
          <Text as="span" fontSize={{ base: "sm", sm: "md" }}>
            💸🏠
          </Text>
        </Text>
      </Flex>

      <Container maxW="5xl" px={0}>
        {/* Header */}
        <Box as="header" textAlign="center" mb={12}>
          <Heading as="h1" size="4xl" mb={4}>
            <Text as="span" className="gradient-text">
              Social Media
            </Text>{" "}
            <Text as="span" color="white">
              Post Generator
            </Text>
          </Heading>
          <Text color="text.secondary" fontSize="lg" maxW="2xl" mx="auto">
            Generate engaging, platform-optimized posts for your products with
            AI-powered insights.
          </Text>
        </Box>

        {/* Form Card */}
        <Box
          bg="background.card"
          border="1px solid"
          borderColor="border.default"
          borderRadius="2xl"
          p={{ base: 6, sm: 8 }}
          mb={8}
          boxShadow="0 0 40px -10px rgba(139, 92, 246, 0.3)"
        >
          <VStack gap={6} align="stretch">
            {/* Product Name */}
            <Input
              label="Product Name"
              required
              value={state.product.name}
              onChange={(e) =>
                generatorActions.updateProduct("name", e.target.value)
              }
              onBlur={() => generatorActions.setTouched("name")}
              placeholder="EcoBottle Pro"
              disabled={state.isLoading}
              error={state.touched.name ? errors.name : undefined}
            />

            {/* Description */}
            <Textarea
              label="Description"
              required
              value={state.product.description}
              onChange={(e) =>
                generatorActions.updateProduct("description", e.target.value)
              }
              onBlur={() => generatorActions.setTouched("description")}
              placeholder="Revolutionary reusable water bottle with built-in UV purification..."
              disabled={state.isLoading || state.isGeneratingDescription}
              error={state.touched.description ? errors.description : undefined}
              showCount
              maxLength={VALIDATION.DESCRIPTION_MAX_LENGTH}
              actionButton={
                <IconButton
                  aria-label="Generate description with AI"
                  size="xs"
                  variant="ghost"
                  onClick={generatorActions.generateDescription}
                  disabled={
                    state.isLoading ||
                    state.isGeneratingDescription ||
                    !state.product.name.trim()
                  }
                  color="purple.400"
                  _hover={{ bg: "purple.500/20" }}
                >
                  {state.isGeneratingDescription ? (
                    <SpinnerIcon size={14} />
                  ) : (
                    <SparklesIcon size={14} />
                  )}
                </IconButton>
              }
            />

            {/* Price, Category, and Language Row */}
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6} w="100%">
              <Input
                label="Price"
                required
                prefix="$"
                inputMode="decimal"
                value={state.priceInput}
                onChange={(e) =>
                  generatorActions.handlePriceChange(e.target.value)
                }
                onBlur={() => generatorActions.setTouched("price")}
                placeholder="49.99"
                disabled={state.isLoading}
                error={state.touched.price ? errors.price : undefined}
              />

              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={state.product.category || ""}
                onChange={(e) =>
                  generatorActions.updateProduct("category", e.target.value)
                }
                disabled={state.isLoading}
              />

              <Select
                label="Language"
                options={LANGUAGE_OPTIONS}
                value={state.product.language || DEFAULT_LANGUAGE}
                onChange={(e) =>
                  generatorActions.updateProduct(
                    "language",
                    e.target.value as Language
                  )
                }
                disabled={state.isLoading}
              />
            </SimpleGrid>

            {/* Tone Selection */}
            <ToneSelector
              value={state.product.tone || "professional"}
              onChange={(tone: Tone) =>
                generatorActions.updateProduct("tone", tone)
              }
              disabled={state.isLoading}
            />

            {/* Platform Selection */}
            <PlatformSelector
              value={[...(state.product.platforms || [])]}
              onChange={(platforms: Platform[]) =>
                generatorActions.updateProduct("platforms", platforms)
              }
              disabled={state.isLoading}
              error={state.touched.platforms ? errors.platforms : undefined}
            />

            {/* Research Toggle */}
            <Toggle
              label="Include Market Research"
              description="Search for trending hashtags, seasonal context, and market insights"
              checked={state.product.includeResearch ?? false}
              onChange={(checked) =>
                generatorActions.updateProduct("includeResearch", checked)
              }
              disabled={state.isLoading}
            />
          </VStack>

          {/* Generate Button */}
          <Box mt={8}>
            <Button
              onClick={generatorActions.generatePosts}
              disabled={!isValid}
              isLoading={state.isLoading}
              icon={<BoltIcon />}
            >
              Generate Posts
            </Button>
          </Box>
        </Box>

        {/* Error State */}
        {state.error && (
          <ErrorAlert
            message={state.error}
            onRetry={generatorActions.generatePosts}
          />
        )}

        {/* Loading State */}
        {state.isLoading && <LoadingSkeleton />}

        {/* Generated Posts */}
        {!state.isLoading && <PostsGrid posts={[...state.posts]} />}
      </Container>
    </Box>
  )
}
