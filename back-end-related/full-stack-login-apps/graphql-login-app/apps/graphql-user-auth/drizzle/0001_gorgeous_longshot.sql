ALTER TABLE "users" ADD COLUMN "hashedPassword" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";