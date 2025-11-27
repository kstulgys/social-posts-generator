"use server";

import { generateSocialMediaPosts } from "@/lib/generate";
import { GenerateRequestSchema, formatZodErrors } from "@/lib/validation";
import { SocialMediaPost } from "@/lib/types";

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
