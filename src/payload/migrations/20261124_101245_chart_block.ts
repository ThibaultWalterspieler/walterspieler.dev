import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_blocks_chart_kind" AS ENUM('line', 'bar');
  CREATE TYPE "public"."enum__blog_posts_v_blocks_chart_kind" AS ENUM('line', 'bar');
  CREATE TABLE "blog_posts_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_blog_posts_blocks_chart_kind" DEFAULT 'line',
  	"title" varchar,
  	"data" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__blog_posts_v_blocks_chart_kind" DEFAULT 'line',
  	"title" varchar,
  	"data" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "blog_posts_blocks_chart" ADD CONSTRAINT "blog_posts_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_chart" ADD CONSTRAINT "_blog_posts_v_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_posts_blocks_chart_order_idx" ON "blog_posts_blocks_chart" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_chart_parent_id_idx" ON "blog_posts_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_chart_path_idx" ON "blog_posts_blocks_chart" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_chart_locale_idx" ON "blog_posts_blocks_chart" USING btree ("_locale");
  CREATE INDEX "_blog_posts_v_blocks_chart_order_idx" ON "_blog_posts_v_blocks_chart" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_chart_parent_id_idx" ON "_blog_posts_v_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_chart_path_idx" ON "_blog_posts_v_blocks_chart" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_chart_locale_idx" ON "_blog_posts_v_blocks_chart" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_posts_blocks_chart" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_chart" CASCADE;
  DROP TYPE "public"."enum_blog_posts_blocks_chart_kind";
  DROP TYPE "public"."enum__blog_posts_v_blocks_chart_kind";`)
}
