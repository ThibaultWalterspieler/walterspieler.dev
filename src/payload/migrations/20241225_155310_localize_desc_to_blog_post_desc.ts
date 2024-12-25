import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_posts_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "_blog_posts_v_locales" ADD COLUMN "version_description" varchar;
  ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_blog_posts_v" DROP COLUMN IF EXISTS "version_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_posts" ADD COLUMN "description" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "blog_posts_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_blog_posts_v_locales" DROP COLUMN IF EXISTS "version_description";`)
}
