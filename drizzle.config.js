import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_0M4fwhbCDHJj@ep-dark-cake-adcjdarb-pooler.c-2.us-east-1.aws.neon.tech/AI-Study-Materal-Gen?sslmode=require&channel_binding=require'
  }
});
