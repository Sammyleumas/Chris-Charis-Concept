CREATE TABLE "newsletter_signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"consented_at" timestamp with time zone DEFAULT now() NOT NULL,
	"synced_to_brevo_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"data" jsonb NOT NULL,
	"emailed_at" timestamp with time zone,
	"ip_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_email_idx" ON "newsletter_signups" USING btree ("email");--> statement-breakpoint
CREATE INDEX "submissions_kind_created_idx" ON "submissions" USING btree ("kind","created_at");