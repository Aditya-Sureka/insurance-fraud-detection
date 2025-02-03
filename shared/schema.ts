import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default('user'),
});

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  policyNumber: text("policy_number").notNull(),
  claimAmount: integer("claim_amount").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default('pending'),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClaimSchema = createInsertSchema(claims).pick({
  policyNumber: true,
  claimAmount: true,
  description: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Claim = typeof claims.$inferSelect;
export type InsertClaim = z.infer<typeof insertClaimSchema>;
