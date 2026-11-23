/**
 * Media moved from UploadThing to R2 (docs/adr/0006), and Payload's schema
 * lost UploadThing's columns: `_key`, `prefix` and each width's `_key`. This
 * migration's snapshot records that, so later migrations leave them alone, but
 * the columns stay in the database: `pnpm copy:media-to-r2` reads the keys, and
 * reverting the move needs them. The clean-up migration drops them by hand:
 *
 *   ALTER TABLE "media" DROP COLUMN "_key";
 *   ALTER TABLE "media" DROP COLUMN "prefix";
 *   ALTER TABLE "media" DROP COLUMN "sizes_w640__key";
 *   ALTER TABLE "media" DROP COLUMN "sizes_w1080__key";
 *   ALTER TABLE "media" DROP COLUMN "sizes_w1600__key";
 */
export async function up(): Promise<void> {}

export async function down(): Promise<void> {}
