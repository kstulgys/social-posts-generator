# Social Media Post Generator

A Next.js application that generates engaging social media posts for Twitter, Instagram, and LinkedIn using AI.

## Features

- **AI-Powered Generation**: Uses OpenAI GPT-4o to generate platform-optimized posts
- **Tone Customization**: 5 tone options (Professional, Casual, Humorous, Urgent, Inspirational)
- **Platform Selection**: Generate for Twitter/X, Instagram, and/or LinkedIn
- **Web Research**: Optional market research for trending hashtags and seasonal context
- **Dark Theme UI**: Sintra.ai-inspired design with gradient accents
- **Copy to Clipboard**: One-click copy for each generated post

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **AI**: OpenAI API (GPT-4o + Web Search)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

```bash
# Clone the repository
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Run development server
npm run dev
```

Visit http://localhost:3000

### Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) |

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy

## Project Structure

```
frontend/src/
├── app/
│   ├── api/generate/     # API route for post generation
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   ├── icons/            # SVG icon components
│   └── PostCard.tsx      # Post display card
├── features/
│   └── generator/        # Generator feature components
├── lib/                  # Server-side utilities
│   ├── config.ts         # App configuration
│   ├── generate.ts       # Post generation logic
│   ├── openai.ts         # OpenAI client
│   ├── validation.ts     # Zod schemas
│   └── webResearch.ts    # Web research logic
├── types/                # Shared TypeScript types
├── constants/            # App constants
└── utils/                # Utility functions
```

## Documentation

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed implementation documentation.
