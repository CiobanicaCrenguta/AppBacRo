CREATE TABLE IF NOT EXISTS "comentarii" (
	"id" text PRIMARY KEY NOT NULL,
	"titlu" text NOT NULL,
	"autor" text NOT NULL,
	"tip" text NOT NULL,
	"context" text NOT NULL,
	"trasatura1" text NOT NULL,
	"trasatura2" text NOT NULL,
	"tehnici" text NOT NULL,
	"prozodie" text,
	"viziune_despre_viata" text,
	"caracterizare_personaje" text,
	"incheiere" text NOT NULL,
	"drills" json NOT NULL
);

CREATE TABLE IF NOT EXISTS "progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"comentariu_id" text NOT NULL,
	"nivel" integer NOT NULL,
	"scor" integer NOT NULL,
	"streak" integer NOT NULL,
	"completat" boolean DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
