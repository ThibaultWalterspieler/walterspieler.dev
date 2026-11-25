# walterspieler.dev

<p align="center">
  <a href="https://walterspieler.dev/">My portfolio</a> built using Next.js 16 with TypeScript, Tailwind CSS 4, and Payload CMS
</p>

## What is this repo?

[walterspieler.dev](https://walterspieler.dev/) is my portfolio showcasing my projects, skills, and experiences. This repository is the source code for the website. It is built using:

- [Next.js 16](https://nextjs.org) - React Framework with App Router
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

Pnpm is the package manager of choice for this project. Make sure you are using at least Node.js 24 _(lts/krypton)_ and then activate it through `corepack`:

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
- `DATABASE_URI`: PostgreSQL database connection string
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`: an R2 API token with Object Read & Write on the `walterspieler-media` bucket, for Media uploads (`docs/adr/0006`)
- `RESEND_API_KEY`: Resend API key for email functionality

### Database Setup

The application uses PostgreSQL with Payload CMS. You can use Docker Compose to run PostgreSQL locally:

```bash
# Start PostgreSQL database
docker compose up -d

# Stop the database
docker compose down

# Stop and remove volumes (warning: this will delete all data)
docker compose down -v
```

The Docker Compose configuration creates a PostgreSQL database with:

- Database name: `payload`
- Username: `payload`
- Password: `payload`
- Port: `5432`

Add the following to your `.env` file:

```bash
DATABASE_URI=postgres://payload:payload@localhost:5432/payload
PAYLOAD_SECRET=<generate-with-openssl-rand-base64-32>
```

Generate a secure `PAYLOAD_SECRET`:

```bash
openssl rand -base64 32
```

After setting up the database, run migrations:

```bash
pnpm payload migrate
```

### Changing the Schema

In dev mode Payload pushes schema changes straight to the database, but only when `DATABASE_URI` points at localhost. Remote databases change through migrations only: a push leaves a `dev` row in `payload_migrations`, and every later `payload migrate` (and so every Vercel build) stops at a data-loss prompt.

After changing a collection, global or block, generate the migration and the types, and commit both with the change:

```bash
pnpm payload migrate:create <name>
pnpm payload generate:types
```

### Deployments and Migrations

Every Vercel build runs `pnpm run ci` (`payload migrate && pnpm build`), so a deployment applies the migrations it carries before it builds. `DATABASE_URI` has a different value per environment (`docs/adr/0007`):

- **Production** points at the Neon branch `main`. Only production deployments migrate it, and they build the git branch `main`, so a PR's migrations reach production when it is merged.
- **Preview** points at the Neon branch `preview`, a copy of Neon `main` shared by every preview deployment. A PR's migrations and a preview's admin edits land there, not in production. Media files are the exception: a preview writes them to the production R2 bucket, so deleting or replacing a Media file in a preview's admin deletes the production file and breaks that image in production (`docs/adr/0006`).

When two PRs' migrations conflict, a migration is rewritten after its preview ran, or a preview needs current content, reset `preview` from `main`: Neon console, Branches, `preview`, Reset from parent. Then redeploy the preview. A reset drops anything edited in a preview's admin.

### Blur Placeholders

Images get their blur placeholder when they are uploaded (`docs/adr/0002`). Images uploaded before that have none; fill them once, against the database in `.env.local`:

```bash
pnpm backfill:blur
```

It only touches images without a placeholder, so it is safe to rerun. Pages show the placeholders after their next Revalidation (any save in the admin).

### Stored Widths

Every image is stored at 640, 1080 and 1600px when it is uploaded (`docs/adr/0005`). Images uploaded before that have none and still go through the Vercel image optimizer; give them their widths once, right after the deploy that adds them, against the database in `.env.local` (it needs the R2 keys). Against a remote database it refuses to run unless `CONFIRM_DATABASE_HOST` names that database's host:

```bash
CONFIRM_DATABASE_HOST=<host in DATABASE_URI> pnpm backfill:widths
```

It only touches images missing a width, so it is safe to rerun. Each image is uploaded again under its own name. Pages use the widths after their next Revalidation (any save in the admin).

### Moving Media to R2

Media moved from UploadThing to Cloudflare R2 (`docs/adr/0006`). Its files are copied once, under their filenames, by a script that reads UploadThing's keys from the database and writes only to R2. Run it with the R2 keys against the production database right before the deploy that switches storage, then once more after it, to catch anything uploaded in between:

```bash
pnpm copy:media-to-r2
```

It skips files R2 already has, so it is safe to rerun, and it ends with a count of files copied, skipped and failed, and the size of the files in R2. A file that is missing from R2 and has no UploadThing key counts as failed.

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

### Database Seeding (Optional)

After running migrations, you can optionally seed the database with sample data:

```bash
pnpm seed
```

This will create:

- A default admin user (email: `admin@walterspieler.dev`, password: `admin123456`)
- Sample blog posts
- Sample experiences
- Sample pages
- Sample social links

**Note:** The seed script will skip any data that already exists (checked by slug/email), so it's safe to run multiple times.

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

## Working with coding agents

`pnpm check` runs lint, typecheck and the tests (`pnpm test`, Vitest); CI runs it on every pull request and on `main`. The flow we follow with agents (which skill at which step, and where each kind of project knowledge lives) is in [docs/agents/workflow.md](docs/agents/workflow.md).

## Deployment

The application is configured for deployment on various platforms:

1. Make sure all environment variables are properly set
2. Build the application with `pnpm build`
3. Start the application in production mode with `pnpm start`

## License

This project is licensed under the GNU General Public License. See the [LICENSE](./LICENSE.md) file for more details.
