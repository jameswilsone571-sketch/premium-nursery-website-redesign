import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * General contact-form messages.
 * Separate from `enquiries` so contact messages never contain child data.
 */
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 120 }).notNull(),
  message: text("message").notNull(),
  consent: integer("consent").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
