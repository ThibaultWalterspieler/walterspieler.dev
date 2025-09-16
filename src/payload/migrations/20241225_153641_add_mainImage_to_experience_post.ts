import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    ALTER TABLE "users_locales" DROP CONSTRAINT "users_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "blog_posts_locales" DROP CONSTRAINT "blog_posts_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "_blog_posts_v_locales" DROP CONSTRAINT "_blog_posts_v_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "experience_posts_locales" DROP CONSTRAINT "experience_posts_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "_experience_posts_v_locales" DROP CONSTRAINT "_experience_posts_v_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "experiences_locales" DROP CONSTRAINT "experiences_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "media_locales" DROP CONSTRAINT "media_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "main_menu_menu_items_locales" DROP CONSTRAINT "main_menu_menu_items_locales_locale_parent_id_unique";
   EXCEPTION
    WHEN undefined_object THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "experience_posts_locales" ADD COLUMN "main_image_id" integer;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;
   
   DO $$ BEGIN
    ALTER TABLE "_experience_posts_v_locales" ADD COLUMN "version_main_image_id" integer;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;
  DO $$ BEGIN
   ALTER TABLE "experience_posts_locales" ADD CONSTRAINT "experience_posts_locales_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_locales" ADD CONSTRAINT "_experience_posts_v_locales_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "users_locales_locale_parent_id_unique" ON "users_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_blog_posts_v_locales_locale_parent_id_unique" ON "_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_main_image_idx" ON "experience_posts_locales" USING btree ("main_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "experience_posts_locales_locale_parent_id_unique" ON "experience_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_version_version_main_image_idx" ON "_experience_posts_v_locales" USING btree ("version_main_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_experience_posts_v_locales_locale_parent_id_unique" ON "_experience_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "main_menu_menu_items_locales_locale_parent_id_unique" ON "main_menu_menu_items_locales" USING btree ("_locale","_parent_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experience_posts_locales" DROP CONSTRAINT "experience_posts_locales_main_image_id_media_id_fk";
  
  ALTER TABLE "_experience_posts_v_locales" DROP CONSTRAINT "_experience_posts_v_locales_version_main_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "pages_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "blog_posts_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_blog_posts_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "experience_posts_main_image_idx";
  DROP INDEX IF EXISTS "experience_posts_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_experience_posts_v_version_version_main_image_idx";
  DROP INDEX IF EXISTS "_experience_posts_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "experiences_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "media_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "main_menu_menu_items_locales_locale_parent_id_unique";
  ALTER TABLE "experience_posts_locales" DROP COLUMN IF EXISTS "main_image_id";
  ALTER TABLE "_experience_posts_v_locales" DROP COLUMN IF EXISTS "version_main_image_id";
  ALTER TABLE "users_locales" ADD CONSTRAINT "users_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "experience_posts_locales" ADD CONSTRAINT "experience_posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "_experience_posts_v_locales" ADD CONSTRAINT "_experience_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "main_menu_menu_items_locales" ADD CONSTRAINT "main_menu_menu_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");`);
}
