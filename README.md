# walterspieler.dev

<p align="center">
  <a href="https://walterspieler.dev/">My portfolio</a> built using Next.js 15 with TypeScript, Tailwind CSS 4, and Payload CMS
</p>

## What is this repo?

[walterspieler.dev](https://walterspieler.dev/) is my portfolio showcasing my projects, skills, and experiences. This repository is the source code for the website. It is built using:

- [Next.js 15](https://nextjs.org) - React Framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Payload CMS](https://payloadcms.com/) - Headless CMS with PostgreSQL
- [Motion](https://motion.dev/) - Animation library
- [PostHog](https://posthog.com/) - Analytics platform

## Prerequisites

### Node.js

We use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to ensure a consistent Node.js version. Install NVM and set the Node.js version for this project with:

```bash
nvm install
```

### Pnpm

Pnpm is the package manager of choice for this project. Make sure you are using at least Node.js 22 _(lts/jod)_ and then activate it through `corepack`:

```bash
corepack enable pnpm
```

To ensure consistent behavior across all development environments, they should all use the same version of pnpm. That's why an explicit pnpm version is specified in the `package.json`. Check if your pnpm version is matching the one under the `packageManager` property:

```bash
pnpm -v
```

If it is not the case, install the corresponding version:

```bash
corepack install
```

### Visual Studio Code

Consistency in TypeScript versions is crucial. For VSCode users, ensure that you [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) and not the built-in version provided by VSCode.

### Optional: Optimized VSCode Configuration

For an enhanced development experience with project-specific editor settings, duplicate `.vscode.sample` as `.vscode`:

```bash
cp -R .vscode.sample .vscode
```

## Getting Started

Ensure that you follow the sections below in sequence to set up your development environment without issues.

### Environment Configuration

Initiate by setting up environment variables. Duplicate `.env.local.sample` as `.env.local`:

```bash
cp .env.local.sample .env.local
```

Edit `.env.local` and provide values for:

- `NEXT_PUBLIC_BASE_URL`: Your site's base URL (e.g., http://localhost:2499)
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog API key (for analytics)
- `NEXT_PUBLIC_POSTHOG_HOST`: PostHog host URL
- `NEXT_PUBLIC_UMAMI_ID`: Umami analytics ID (if used)
- `DATABASE_URI`: PostgreSQL database connection string
- `UPLOADTHING_TOKEN`: UploadThing token for file uploads
- `RESEND_API_KEY`: Resend API key for email functionality

### Database Setup

The application uses PostgreSQL with Payload CMS. Make sure you have a PostgreSQL database running and accessible via the `DATABASE_URI` in your `.env.local` file.

### Dependency Installation

Install necessary project dependencies:

```bash
pnpm install
```

### Dependency Addition & Update (Optional)

To precisely keep track of the dependencies of this application, each dependency should be added with a specific version number:

```bash
pnpm add <pkg> -E
```

Also, for easier dependency updating, you should use the pnpm interactive mode:

```bash
pnpm up -i -L
```

## Running the Application

Execute the app in various modes using:

```bash
# Development mode with fast refresh (runs on port 2499)
$ pnpm dev

# Build the application
$ pnpm build

# Production mode
$ pnpm start

# Run Payload CMS admin interface
$ pnpm payload
```

## Project Structure

- `src/app`: Contains the main application pages and layouts
  - `(frontend)`: Frontend routes and pages
  - `(payload)`: Payload CMS admin routes
- `src/components`: Reusable React components
  - `Articles`: Blog article components
  - `Blocks`: Content block components
  - `Common`: Shared components
  - `Experiences`: Experience showcase components
  - `Icons`: SVG icons and icon components
  - `Motion`: Animation components
  - `ui`: UI component library
- `src/lib`: Utility functions and configuration files
- `src/payload`: Payload CMS collections, globals, and configuration
- `src/contexts`: React contexts for state management
- `src/styles`: Global CSS styles
- `public`: Static assets

## Deployment

The application is configured for deployment on various platforms:

1. Make sure all environment variables are properly set
2. Build the application with `pnpm build`
3. Start the application in production mode with `pnpm start`

## License

This project is licensed under the GNU General Public License. See the [LICENSE](./LICENSE.md) file for more details.
