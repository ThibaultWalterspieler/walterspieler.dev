import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
    ALTER TABLE "socials" ADD COLUMN "label" varchar DEFAULT 'Instagram' NOT NULL;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "socials" DROP COLUMN IF EXISTS "label";`);
}
