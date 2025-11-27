"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { generatePostsAction } from "@/actions/generate";
import { Product, SocialMediaPost, Tone, Platform } from "@/types";
import { CATEGORY_OPTIONS, ERROR_MESSAGES, DEFAULT_PLATFORMS, VALIDATION } from "@/constants";
import { validateProduct, isValidPriceInput } from "@/utils/validation";
import { Input, Textarea, Select, Toggle, Button } from "@/components/ui";
import { BoltIcon } from "@/components/icons";
import {
  ToneSelector,
  PlatformSelector,
  ErrorAlert,
  LoadingSkeleton,
  PostsGrid,
} from "@/features/generator/components";

const INITIAL_PRODUCT: Product = {
  name: "",
  description: "",
  price: 0,
  category: "",
  tone: "professional",
  platforms: DEFAULT_PLATFORMS,
  includeResearch: false,
};

export default function Home() {
  const [product, setProduct] = useState<Product>(INITIAL_PRODUCT);
  const [priceInput, setPriceInput] = useState("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errors = useMemo(() => validateProduct(product), [product]);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateProduct = <K extends keyof Product>(field: K, value: Product[K]) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (value: string) => {
    if (isValidPriceInput(value)) {
      setPriceInput(value);
      updateProduct("price", value === "" ? 0 : parseFloat(value) || 0);
    }
  };

  const handleGeneratePosts = async () => {
    setTouched({ name: true, description: true, price: true, platforms: true });

    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await generatePostsAction(product);
      if (result.success) {
        setPosts(result.posts);
      } else {
        const errorCode = result.code || "INTERNAL_ERROR";
        setError(ERROR_MESSAGES[errorCode] || result.error);
        setPosts([]);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Text fontSize={{ base: "xs", sm: "sm" }} color="orange.300" textAlign="center">
          <Text as="span" fontSize={{ base: "sm", sm: "md" }}>🚨</Text> Easy there, Shakespeare! This runs on my credit card. Generate responsibly or my landlord gets a new tenant. <Text as="span" fontSize={{ base: "sm", sm: "md" }}>💸🏠</Text>
        </Text>
      </Flex>

      <Container maxW="5xl">
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
            Generate engaging, platform-optimized posts for your products with AI-powered insights.
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
              value={product.name}
              onChange={(e) => updateProduct("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="EcoBottle Pro"
              disabled={isLoading}
              error={touched.name ? errors.name : undefined}
            />

            {/* Description */}
            <Textarea
              label="Description"
              required
              value={product.description}
              onChange={(e) => updateProduct("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              placeholder="Revolutionary reusable water bottle with built-in UV purification..."
              disabled={isLoading}
              error={touched.description ? errors.description : undefined}
              showCount
              maxLength={VALIDATION.DESCRIPTION_MAX_LENGTH}
            />

            {/* Price and Category Row */}
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
              <Input
                label="Price"
                required
                prefix="$"
                inputMode="decimal"
                value={priceInput}
                onChange={(e) => handlePriceChange(e.target.value)}
                onBlur={() => handleBlur("price")}
                placeholder="49.99"
                disabled={isLoading}
                error={touched.price ? errors.price : undefined}
              />

              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={product.category || ""}
                onChange={(e) => updateProduct("category", e.target.value)}
                disabled={isLoading}
              />
            </SimpleGrid>

            {/* Tone Selection */}
            <ToneSelector
              value={product.tone || "professional"}
              onChange={(tone: Tone) => updateProduct("tone", tone)}
              disabled={isLoading}
            />

            {/* Platform Selection */}
            <PlatformSelector
              value={product.platforms || []}
              onChange={(platforms: Platform[]) => updateProduct("platforms", platforms)}
              disabled={isLoading}
              error={touched.platforms ? errors.platforms : undefined}
            />

            {/* Research Toggle */}
            <Toggle
              label="Include Market Research"
              description="Search for trending hashtags, seasonal context, and market insights"
              checked={product.includeResearch ?? false}
              onChange={(checked) => updateProduct("includeResearch", checked)}
              disabled={isLoading}
            />
          </VStack>

          {/* Generate Button */}
          <Box mt={8}>
            <Button
              onClick={handleGeneratePosts}
              disabled={!isValid}
              isLoading={isLoading}
              icon={<BoltIcon />}
            >
              Generate Posts
            </Button>
          </Box>
        </Box>

        {/* Error State */}
        {error && <ErrorAlert message={error} onRetry={handleGeneratePosts} />}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Generated Posts */}
        {!isLoading && <PostsGrid posts={posts} />}
      </Container>
    </Box>
  );
}
