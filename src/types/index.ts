export type Tone = "professional" | "casual" | "humorous" | "urgent" | "inspirational";

export type Platform = "twitter" | "instagram" | "linkedin";

export type Language = "en" | "es" | "fr" | "de" | "it" | "pt" | "nl" | "pl" | "lt" | "uk" | "zh" | "ja" | "ko";

export interface Product {
  name: string;
  description: string;
  price: number;
  category?: string;
  tone?: Tone;
  platforms?: Platform[];
  includeResearch?: boolean;
  language?: Language;
}

export interface SocialMediaPost {
  platform: Platform;
  content: string;
}

export interface FieldErrors {
  name?: string;
  description?: string;
  price?: string;
  platforms?: string;
}
