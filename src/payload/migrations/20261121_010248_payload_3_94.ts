import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT '';
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "users_locales_parent_id_idx" ON "users_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_locales_parent_id_idx" ON "blog_posts_locales" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_locales_parent_id_idx" ON "_blog_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "experience_posts_locales_parent_id_idx" ON "experience_posts_locales" USING btree ("_parent_id");
  CREATE INDEX "_experience_posts_v_locales_parent_id_idx" ON "_experience_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_locales_parent_id_idx" ON "experiences_locales" USING btree ("_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "main_menu_menu_items_locales_parent_id_idx" ON "main_menu_menu_items_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  DROP INDEX "users_locales_parent_id_idx";
  DROP INDEX "pages_locales_parent_id_idx";
  DROP INDEX "blog_posts_locales_parent_id_idx";
  DROP INDEX "_blog_posts_v_locales_parent_id_idx";
  DROP INDEX "experience_posts_locales_parent_id_idx";
  DROP INDEX "_experience_posts_v_locales_parent_id_idx";
  DROP INDEX "experiences_locales_parent_id_idx";
  DROP INDEX "media_locales_parent_id_idx";
  DROP INDEX "main_menu_menu_items_locales_parent_id_idx";
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}
