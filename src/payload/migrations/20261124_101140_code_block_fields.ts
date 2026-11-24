import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_code_language" AS ENUM('bash', 'css', 'diff', 'html', 'javascript', 'json', 'jsonc', 'jsx', 'markdown', 'python', 'sql', 'tsx', 'typescript', 'yaml');
  CREATE TYPE "public"."enum_blog_posts_blocks_code_language" AS ENUM('bash', 'css', 'diff', 'html', 'javascript', 'json', 'jsonc', 'jsx', 'markdown', 'python', 'sql', 'tsx', 'typescript', 'yaml');
  CREATE TYPE "public"."enum__blog_posts_v_blocks_code_language" AS ENUM('bash', 'css', 'diff', 'html', 'javascript', 'json', 'jsonc', 'jsx', 'markdown', 'python', 'sql', 'tsx', 'typescript', 'yaml');
  CREATE TYPE "public"."enum_experience_posts_blocks_code_language" AS ENUM('bash', 'css', 'diff', 'html', 'javascript', 'json', 'jsonc', 'jsx', 'markdown', 'python', 'sql', 'tsx', 'typescript', 'yaml');
  CREATE TYPE "public"."enum__experience_posts_v_blocks_code_language" AS ENUM('bash', 'css', 'diff', 'html', 'javascript', 'json', 'jsonc', 'jsx', 'markdown', 'python', 'sql', 'tsx', 'typescript', 'yaml');
  ALTER TABLE "pages_blocks_code" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_code" ADD COLUMN "language" "enum_pages_blocks_code_language" DEFAULT 'typescript' NOT NULL;
  ALTER TABLE "pages_blocks_code" ADD COLUMN "line_numbers" boolean DEFAULT false;
  ALTER TABLE "blog_posts_blocks_code" ADD COLUMN "title" varchar;
  ALTER TABLE "blog_posts_blocks_code" ADD COLUMN "language" "enum_blog_posts_blocks_code_language" DEFAULT 'typescript';
  ALTER TABLE "blog_posts_blocks_code" ADD COLUMN "line_numbers" boolean DEFAULT false;
  ALTER TABLE "_blog_posts_v_blocks_code" ADD COLUMN "title" varchar;
  ALTER TABLE "_blog_posts_v_blocks_code" ADD COLUMN "language" "enum__blog_posts_v_blocks_code_language" DEFAULT 'typescript';
  ALTER TABLE "_blog_posts_v_blocks_code" ADD COLUMN "line_numbers" boolean DEFAULT false;
  ALTER TABLE "experience_posts_blocks_code" ADD COLUMN "title" varchar;
  ALTER TABLE "experience_posts_blocks_code" ADD COLUMN "language" "enum_experience_posts_blocks_code_language" DEFAULT 'typescript';
  ALTER TABLE "experience_posts_blocks_code" ADD COLUMN "line_numbers" boolean DEFAULT false;
  ALTER TABLE "_experience_posts_v_blocks_code" ADD COLUMN "title" varchar;
  ALTER TABLE "_experience_posts_v_blocks_code" ADD COLUMN "language" "enum__experience_posts_v_blocks_code_language" DEFAULT 'typescript';
  ALTER TABLE "_experience_posts_v_blocks_code" ADD COLUMN "line_numbers" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_code" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_code" DROP COLUMN "language";
  ALTER TABLE "pages_blocks_code" DROP COLUMN "line_numbers";
  ALTER TABLE "blog_posts_blocks_code" DROP COLUMN "title";
  ALTER TABLE "blog_posts_blocks_code" DROP COLUMN "language";
  ALTER TABLE "blog_posts_blocks_code" DROP COLUMN "line_numbers";
  ALTER TABLE "_blog_posts_v_blocks_code" DROP COLUMN "title";
  ALTER TABLE "_blog_posts_v_blocks_code" DROP COLUMN "language";
  ALTER TABLE "_blog_posts_v_blocks_code" DROP COLUMN "line_numbers";
  ALTER TABLE "experience_posts_blocks_code" DROP COLUMN "title";
  ALTER TABLE "experience_posts_blocks_code" DROP COLUMN "language";
  ALTER TABLE "experience_posts_blocks_code" DROP COLUMN "line_numbers";
  ALTER TABLE "_experience_posts_v_blocks_code" DROP COLUMN "title";
  ALTER TABLE "_experience_posts_v_blocks_code" DROP COLUMN "language";
  ALTER TABLE "_experience_posts_v_blocks_code" DROP COLUMN "line_numbers";
  DROP TYPE "public"."enum_pages_blocks_code_language";
  DROP TYPE "public"."enum_blog_posts_blocks_code_language";
  DROP TYPE "public"."enum__blog_posts_v_blocks_code_language";
  DROP TYPE "public"."enum_experience_posts_blocks_code_language";
  DROP TYPE "public"."enum__experience_posts_v_blocks_code_language";`)
}
