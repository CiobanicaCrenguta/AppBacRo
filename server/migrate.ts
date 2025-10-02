import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

async function migrate() {
  const sql = neon(DATABASE_URL);
  
  console.log("Running migrations...");
  
  const migrationFile = fs.readFileSync(
    path.join(process.cwd(), "drizzle", "0000_initial_schema.sql"),
    "utf-8"
  );
  
  try {
    await sql(migrationFile);
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
