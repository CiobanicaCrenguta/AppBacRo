import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

async function migrate() {
  const sql = neon(DATABASE_URL);
  
  console.log("Running migrations...");
  
  try {
    // Create comentarii table
    await sql`
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
      )
    `;
    console.log("✅ Created comentarii table");

    // Create progress table
    await sql`
      CREATE TABLE IF NOT EXISTS "progress" (
        "id" serial PRIMARY KEY NOT NULL,
        "comentariu_id" text NOT NULL,
        "nivel" integer NOT NULL,
        "scor" integer NOT NULL,
        "streak" integer NOT NULL,
        "completat" boolean DEFAULT false NOT NULL
      )
    `;
    console.log("✅ Created progress table");

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" text PRIMARY KEY NOT NULL,
        "username" text NOT NULL,
        "password" text NOT NULL,
        CONSTRAINT "users_username_unique" UNIQUE("username")
      )
    `;
    console.log("✅ Created users table");

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
