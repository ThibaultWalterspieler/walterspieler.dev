import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_blocks_editor_note_kind" AS ENUM('update', 'correction');
  CREATE TYPE "public"."enum__blog_posts_v_blocks_editor_note_kind" AS ENUM('update', 'correction');
  CREATE TABLE "blog_posts_blocks_editor_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_blog_posts_blocks_editor_note_kind" DEFAULT 'update',
  	"date" timestamp(3) with time zone,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_editor_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__blog_posts_v_blocks_editor_note_kind" DEFAULT 'update',
  	"date" timestamp(3) with time zone,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "blog_posts_blocks_editor_note" ADD CONSTRAINT "blog_posts_blocks_editor_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_editor_note" ADD CONSTRAINT "_blog_posts_v_blocks_editor_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_posts_blocks_editor_note_order_idx" ON "blog_posts_blocks_editor_note" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_editor_note_parent_id_idx" ON "blog_posts_blocks_editor_note" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_editor_note_path_idx" ON "blog_posts_blocks_editor_note" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_editor_note_locale_idx" ON "blog_posts_blocks_editor_note" USING btree ("_locale");
  CREATE INDEX "_blog_posts_v_blocks_editor_note_order_idx" ON "_blog_posts_v_blocks_editor_note" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_editor_note_parent_id_idx" ON "_blog_posts_v_blocks_editor_note" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_editor_note_path_idx" ON "_blog_posts_v_blocks_editor_note" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_editor_note_locale_idx" ON "_blog_posts_v_blocks_editor_note" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_posts_blocks_editor_note" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_editor_note" CASCADE;
  DROP TYPE "public"."enum_blog_posts_blocks_editor_note_kind";
  DROP TYPE "public"."enum__blog_posts_v_blocks_editor_note_kind";`)
}
