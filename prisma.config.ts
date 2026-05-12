import { defineConfig } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // スキーマの provider と同じものを指定
    url: process.env.DATABASE_URL,
  },
});
