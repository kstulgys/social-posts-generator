import { proxy } from "valtio"
import { Product, SocialMediaPost, Tone, Platform } from "@/types"
import { DEFAULT_PLATFORMS, DEFAULT_LANGUAGE, ERROR_MESSAGES, SAMPLE_PRODUCTS, TONE_OPTIONS } from "@/constants"
import { validateProduct, isValidPriceInput } from "@/utils/validation"
import {
  generatePostsAction,
  generateDescriptionAction,
} from "@/actions/generate"

interface GeneratorState {
  product: Product
  priceInput: string
  posts: SocialMediaPost[]
  touched: Record<string, boolean>
  isLoading: boolean
  isGeneratingDescription: boolean
  error: string | null
}

const initialProduct: Product = {
  name: "",
  description: "",
  price: 0,
  category: "",
  tone: "professional",
  platforms: DEFAULT_PLATFORMS,
  includeResearch: false,
  language: DEFAULT_LANGUAGE,
}

export const generatorState = proxy<GeneratorState>({
  product: initialProduct,
  priceInput: "",
  posts: [],
  touched: {},
  isLoading: false,
  isGeneratingDescription: false,
  error: null,
})

export const getErrors = () => validateProduct(generatorState.product)

export const getIsValid = () => {
  const errors = validateProduct(generatorState.product)
  return Object.keys(errors).length === 0
}

export const generatorActions = {
  updateProduct<K extends keyof Product>(field: K, value: Product[K]) {
    generatorState.product[field] = value
  },

  setTouched(field: string) {
    generatorState.touched[field] = true
  },

  setAllTouched() {
    generatorState.touched = {
      name: true,
      description: true,
      price: true,
      platforms: true,
    }
  },

  handlePriceChange(value: string) {
    if (isValidPriceInput(value)) {
      generatorState.priceInput = value
      generatorState.product.price = value === "" ? 0 : parseFloat(value) || 0
    }
  },

  async generateDescription() {
    const { product } = generatorState

    if (!product.name.trim()) {
      generatorState.touched.name = true
      return
    }

    generatorState.isGeneratingDescription = true

    try {
      const result = await generateDescriptionAction(
        product.name,
        product.language || DEFAULT_LANGUAGE
      )
      if (result.success) {
        generatorState.product.description = result.description
      }
    } catch {
      // Silently fail for description generation
    } finally {
      generatorState.isGeneratingDescription = false
    }
  },

  async generatePosts() {
    generatorActions.setAllTouched()

    const errors = validateProduct(generatorState.product)
    if (Object.keys(errors).length > 0) return

    generatorState.isLoading = true
    generatorState.error = null

    try {
      const result = await generatePostsAction(generatorState.product)
      if (result.success) {
        generatorState.posts = result.posts
      } else {
        const errorCode = result.code || "INTERNAL_ERROR"
        generatorState.error = ERROR_MESSAGES[errorCode] || result.error
        generatorState.posts = []
      }
    } catch {
      generatorState.error = "An unexpected error occurred. Please try again."
      generatorState.posts = []
    } finally {
      generatorState.isLoading = false
    }
  },

  reset() {
    generatorState.product = { ...initialProduct }
    generatorState.priceInput = ""
    generatorState.posts = []
    generatorState.touched = {}
    generatorState.isLoading = false
    generatorState.isGeneratingDescription = false
    generatorState.error = null
  },

  async tryRandomProduct() {
    // Pick random sample product
    const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)]
    
    // Pick random tone
    const tones: Tone[] = ["professional", "casual", "humorous", "urgent", "inspirational"]
    const randomTone = tones[Math.floor(Math.random() * tones.length)]
    
    // Pick random platforms (1-3)
    const allPlatforms: Platform[] = ["twitter", "instagram", "linkedin"]
    const numPlatforms = Math.floor(Math.random() * 3) + 1
    const shuffled = [...allPlatforms].sort(() => Math.random() - 0.5)
    const randomPlatforms = shuffled.slice(0, numPlatforms)

    // Update product with random values
    generatorState.product.name = randomProduct.name
    generatorState.product.price = randomProduct.price
    generatorState.product.category = randomProduct.category
    generatorState.product.tone = randomTone
    generatorState.product.platforms = randomPlatforms
    generatorState.priceInput = randomProduct.price.toString()
    generatorState.posts = []
    generatorState.error = null

    // Generate description with AI
    await generatorActions.generateDescription()
  },
}
