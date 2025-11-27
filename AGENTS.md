# AGENTS.md

## Build & Run Commands
- `bun dev` - Start development server
- `bun run build` - Production build
- `bun start` - Start production server
- No test framework configured

## Tech Stack
Next.js 15, React 19, Chakra UI v3, TypeScript 5, Zod, OpenAI SDK, Bun runtime

## Code Style
- **Imports**: Use `@/*` path alias for `src/*` (e.g., `@/lib/types`, `@/components/ui`)
- **Components**: Functional components with explicit props interfaces, "use client" directive for client components
- **Types**: Define in `src/lib/types.ts` or `src/types/index.ts`. Use union types (e.g., `type Platform = "twitter" | "instagram"`)
- **Naming**: PascalCase for components/types, camelCase for functions/variables, SCREAMING_SNAKE_CASE for constants
- **Error Handling**: Use custom `AppError` class with `ErrorCode` union type. Server actions return `{ success: true/false, ... }` discriminated unions
- **Validation**: Use Zod schemas in `src/lib/validation.ts`, validate with `.safeParse()`
- **Server Actions**: Place in `src/actions/`, use "use server" directive, return typed response unions
- **UI Components**: Use Chakra UI primitives, custom wrappers in `src/components/ui/`
- **Feature Organization**: Feature-specific components in `src/features/{feature}/components/`
- **Formatting**: 2-space indent, double quotes for JSX strings, no semicolons (implicit)
