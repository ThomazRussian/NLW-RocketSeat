import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  boolean,
  decimal,
  timestamp,
} from "drizzle-orm/pg-core";

export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "c",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "html",
  "css",
  "json",
  "sql",
  "bash",
  "markdown",
  "unknown",
]);

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  isRoastMode: boolean("isRoastMode").notNull().default(true),
  score: decimal("score", { precision: 3, scale: 1 }).notNull(),
  roastText: text("roastText").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type Submission = typeof submissions.$inferSelect;
