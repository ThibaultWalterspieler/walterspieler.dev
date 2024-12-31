import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_tweet_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tweet_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_posts_blocks_tweet_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tweet_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_posts_v_blocks_tweet_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tweet_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experience_posts_blocks_tweet_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tweet_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_experience_posts_v_blocks_tweet_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tweet_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tweet_card" ADD CONSTRAINT "pages_blocks_tweet_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_blocks_tweet_card" ADD CONSTRAINT "blog_posts_blocks_tweet_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_blocks_tweet_card" ADD CONSTRAINT "_blog_posts_v_blocks_tweet_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experience_posts_blocks_tweet_card" ADD CONSTRAINT "experience_posts_blocks_tweet_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_experience_posts_v_blocks_tweet_card" ADD CONSTRAINT "_experience_posts_v_blocks_tweet_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_tweet_card_order_idx" ON "pages_blocks_tweet_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tweet_card_parent_id_idx" ON "pages_blocks_tweet_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tweet_card_path_idx" ON "pages_blocks_tweet_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tweet_card_locale_idx" ON "pages_blocks_tweet_card" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tweet_card_order_idx" ON "blog_posts_blocks_tweet_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tweet_card_parent_id_idx" ON "blog_posts_blocks_tweet_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tweet_card_path_idx" ON "blog_posts_blocks_tweet_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_posts_blocks_tweet_card_locale_idx" ON "blog_posts_blocks_tweet_card" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_tweet_card_order_idx" ON "_blog_posts_v_blocks_tweet_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_tweet_card_parent_id_idx" ON "_blog_posts_v_blocks_tweet_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_tweet_card_path_idx" ON "_blog_posts_v_blocks_tweet_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_blocks_tweet_card_locale_idx" ON "_blog_posts_v_blocks_tweet_card" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_tweet_card_order_idx" ON "experience_posts_blocks_tweet_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_tweet_card_parent_id_idx" ON "experience_posts_blocks_tweet_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_tweet_card_path_idx" ON "experience_posts_blocks_tweet_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "experience_posts_blocks_tweet_card_locale_idx" ON "experience_posts_blocks_tweet_card" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_tweet_card_order_idx" ON "_experience_posts_v_blocks_tweet_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_tweet_card_parent_id_idx" ON "_experience_posts_v_blocks_tweet_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_tweet_card_path_idx" ON "_experience_posts_v_blocks_tweet_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_experience_posts_v_blocks_tweet_card_locale_idx" ON "_experience_posts_v_blocks_tweet_card" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_tweet_card" CASCADE;
  DROP TABLE "blog_posts_blocks_tweet_card" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_tweet_card" CASCADE;
  DROP TABLE "experience_posts_blocks_tweet_card" CASCADE;
  DROP TABLE "_experience_posts_v_blocks_tweet_card" CASCADE;`)
}
