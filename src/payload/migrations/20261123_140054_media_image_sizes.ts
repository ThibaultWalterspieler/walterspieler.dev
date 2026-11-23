import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_w640__key" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w640_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080__key" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1080_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600__key" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_w1600_filename" varchar;
  CREATE INDEX "media_sizes_w640_sizes_w640_filename_idx" ON "media" USING btree ("sizes_w640_filename");
  CREATE INDEX "media_sizes_w1080_sizes_w1080_filename_idx" ON "media" USING btree ("sizes_w1080_filename");
  CREATE INDEX "media_sizes_w1600_sizes_w1600_filename_idx" ON "media" USING btree ("sizes_w1600_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sizes_w640_sizes_w640_filename_idx";
  DROP INDEX "media_sizes_w1080_sizes_w1080_filename_idx";
  DROP INDEX "media_sizes_w1600_sizes_w1600_filename_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_w640__key";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w640_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080__key";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w1080_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600__key";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_url";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_width";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_height";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_w1600_filename";`)
}
