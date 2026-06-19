# UIGen

AI-powered React component generator with live preview.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. **Optional** Edit `.env` and replace `your-api-key-here` with your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/settings/keys):

```
ANTHROPIC_API_KEY=sk-ant-...
```

The project runs without an API key — it falls back to a mock provider that returns canned components instead of calling Claude. If you leave the placeholder unchanged, you'll get the mock.

2. Install dependencies and initialize the database:

```bash
npm run setup
```

> **Don't run `npm audit fix`.** Dependencies are pinned to specific versions that work together, and `audit fix` can bump packages past compatible versions and break the app. Known security issues are addressed by updating the pinned versions directly — most recently, Next.js was bumped to a patched release to fix the React2Shell vulnerability (CVE-2025-55182 / CVE-2025-66478). If your scanner still flags something, raise it rather than running `audit fix`.

This command will:

- Install all dependencies
- Generate Prisma client
- Run database migrations

## Running the Application

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Sign up or continue as anonymous user
2. Describe the React component you want to create in the chat
3. View generated components in real-time preview
4. Switch to Code view to see and edit the generated files
5. Continue iterating with the AI to refine your components

## Features

- AI-powered component generation using Claude
- Live preview with hot reload
- Virtual file system (no files written to disk)
- Syntax highlighting and code editor
- Component persistence for registered users
- Export generated code

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma with SQLite
- Anthropic Claude AI
- Vercel AI SDK
