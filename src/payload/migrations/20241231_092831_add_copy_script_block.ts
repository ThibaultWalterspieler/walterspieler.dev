import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum_blog_posts_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum__blog_posts_v_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum_experience_posts_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
    CREATE TYPE "public"."enum__experience_posts_v_blocks_script_copy_btn_code_language" AS ENUM('shell', 'typescript', 'javascript', 'python');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
  CREATE TABLE IF NOT EXISTS "pages_blocks_script_copy_btn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_multiple_package_options" boolean DEFAULT true,
  	"code_language" "enum_pages_blocks_script_copy_btn_code_language" DEFAULT 'shell',
  	"command_map" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_script_copy_btn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_multiple_package_options" boolean DEFAULT true,
  	"code_language" "enum_blog_posts_blocks_script_copy_btn_code_language" DEFAULT 'shell',
  	"command_map" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_script_copy_btn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_multiple_package_options" boolean DEFAULT true,
  	"code_language" "enum__blog_posts_v_blocks_script_copy_btn_code_language" DEFAULT 'shell',
  	"command_map" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_script_copy_btn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_multiple_package_options" boolean DEFAULT true,
  	"code_language" "enum_experience_posts_blocks_script_copy_btn_code_language" DEFAULT 'shell',
  	"command_map" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_script_copy_btn" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_multiple_package_options" boolean DEFAULT true,
  	"code_language" "enum__experience_posts_v_blocks_script_copy_btn_code_language" DEFAULT 'shell',
  	"command_map" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_script_copy_btn" ADD CONSTRAINT "pages_blocks_script_copy_btn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_script_copy_btn" ADD CONSTRAINT "blog_posts_blocks_script_copy_btn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_script_copy_btn" ADD CONSTRAINT "_blog_posts_v_blocks_script_copy_btn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_script_copy_btn" ADD CONSTRAINT "experience_posts_blocks_script_copy_btn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_script_copy_btn" ADD CONSTRAINT "_experience_posts_v_blocks_script_copy_btn_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_script_copy_btn_order_idx" ON "pages_blocks_script_copy_btn" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_script_copy_btn_parent_id_idx" ON "pages_blocks_script_copy_btn" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_script_copy_btn_path_idx" ON "pages_blocks_script_copy_btn" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_script_copy_btn_locale_idx" ON "pages_blocks_script_copy_btn" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_script_copy_btn_order_idx" ON "blog_posts_blocks_script_copy_btn" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_script_copy_btn_parent_id_idx" ON "blog_posts_blocks_script_copy_btn" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_script_copy_btn_path_idx" ON "blog_posts_blocks_script_copy_btn" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_script_copy_btn_locale_idx" ON "blog_posts_blocks_script_copy_btn" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_script_copy_btn_order_idx" ON "_blog_posts_v_blocks_script_copy_btn" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_script_copy_btn_parent_id_idx" ON "_blog_posts_v_blocks_script_copy_btn" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_script_copy_btn_path_idx" ON "_blog_posts_v_blocks_script_copy_btn" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_script_copy_btn_locale_idx" ON "_blog_posts_v_blocks_script_copy_btn" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_script_copy_btn_order_idx" ON "experience_posts_blocks_script_copy_btn" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_script_copy_btn_parent_id_idx" ON "experience_posts_blocks_script_copy_btn" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_script_copy_btn_path_idx" ON "experience_posts_blocks_script_copy_btn" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_script_copy_btn_locale_idx" ON "experience_posts_blocks_script_copy_btn" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_script_copy_btn_order_idx" ON "_experience_posts_v_blocks_script_copy_btn" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_script_copy_btn_parent_id_idx" ON "_experience_posts_v_blocks_script_copy_btn" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_script_copy_btn_path_idx" ON "_experience_posts_v_blocks_script_copy_btn" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_script_copy_btn_locale_idx" ON "_experience_posts_v_blocks_script_copy_btn" USING btree ("_locale");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_script_copy_btn" CASCADE;
  DROP TABLE "blog_posts_blocks_script_copy_btn" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_script_copy_btn" CASCADE;
  DROP TABLE "experience_posts_blocks_script_copy_btn" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_script_copy_btn" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_script_copy_btn_code_language";
  DROP TYPE "public"."enum_blog_posts_blocks_script_copy_btn_code_language";
  DROP TYPE "public"."enum__blog_posts_v_blocks_script_copy_btn_code_language";
  DROP TYPE "public"."enum_experience_posts_blocks_script_copy_btn_code_language";
  DROP TYPE "public"."enum__experience_posts_v_blocks_script_copy_btn_code_language";`);
}
