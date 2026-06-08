import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config({ path: ".env.local" });
}

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`;

export const sql = neon(connectionString);
