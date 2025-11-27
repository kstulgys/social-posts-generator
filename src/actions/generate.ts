"use server";

import { generateSocialMediaPosts } from "@/lib/generate";
import { generateProductDescription } from "@/lib/openai";
import { GenerateRequestSchema, formatZodErrors } from "@/lib/validation";
import { SocialMediaPost, Language } from "@/lib/types";

export interface GenerateResult {
  success: true;
  posts: SocialMediaPost[];
  generated_at: string;
  count: number;
}

export interface GenerateError {
  success: false;
  error: string;
  code: string;
  details?: unknown;
}

export type GenerateResponse = GenerateResult | GenerateError;

export async function generatePostsAction(product: {
  name: string;
  description: string;
  price: number;
  category?: string;
  tone?: string;
  platforms?: string[];
  includeResearch?: boolean;
  language?: string;
}): Promise<GenerateResponse> {
  try {
    // Validate request
    const validationResult = GenerateRequestSchema.safeParse({ product });

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: formatZodErrors(validationResult.error),
      };
    }

    const { product: validatedProduct } = validationResult.data;

    const posts = await generateSocialMediaPosts(validatedProduct);

    return {
      success: true,
      posts,
      generated_at: new Date().toISOString(),
      count: posts.length,
    };
  } catch (error) {
    console.error("Error generating posts:", error);

    if (error instanceof Error && "code" in error) {
      const appError = error as Error & { code: string; statusCode?: number; details?: unknown };
      return {
        success: false,
        error: appError.message,
        code: appError.code,
        details: appError.details,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
    };
  }
}

export interface DescriptionResult {
  success: true;
  description: string;
}

export interface DescriptionError {
  success: false;
  error: string;
  code: string;
}

export type DescriptionResponse = DescriptionResult | DescriptionError;

export async function generateDescriptionAction(
  productName: string,
  language: string = "en"
): Promise<DescriptionResponse> {
  try {
    if (!productName || productName.trim().length === 0) {
      return {
        success: false,
        error: "Product name is required",
        code: "VALIDATION_ERROR",
      };
    }

    const description = await generateProductDescription(
      productName.trim(),
      language as Language
    );

    return {
      success: true,
      description,
    };
  } catch (error) {
    console.error("Error generating description:", error);

    if (error instanceof Error && "code" in error) {
      const appError = error as Error & { code: string };
      return {
        success: false,
        error: appError.message,
        code: appError.code,
      };
    }

    return {
      success: false,
      error: "Failed to generate description",
      code: "INTERNAL_ERROR",
    };
  }
}
