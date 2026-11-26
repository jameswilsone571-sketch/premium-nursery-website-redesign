import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Booking / enquiry submissions.
 *
 * Child and parent information is stored server-side only and is never sent to
 * the browser in list form (the admin route is key protected). In the WordPress
 * delivery these rows become CPT `nursery_enquiry` records with restricted
 * capabilities, or entries in a forms plugin with a defined retention period.
 */
export const enquiries = pgTable(
  "enquiries",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    reference: varchar("reference", { length: 32 }).notNull(),
    /** Idempotency key generated in the browser to block double submits */
    clientToken: varchar("client_token", { length: 64 }).notNull(),
    source: varchar("source", { length: 24 }).notNull().default("booking"),

    parentName: text("parent_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    contactMethod: varchar("contact_method", { length: 24 }).notNull(),

    childName: text("child_name").notNull(),
    dob: varchar("dob", { length: 10 }).notNull(),
    ageMonths: integer("age_months").notNull(),
    ageLabel: varchar("age_label", { length: 40 }).notNull(),

    roomSlug: varchar("room_slug", { length: 64 }),
    roomName: varchar("room_name", { length: 80 }),
    startDate: varchar("start_date", { length: 10 }),
    enquiryType: varchar("enquiry_type", { length: 60 }).notNull(),
    preferredDays: text("preferred_days"),
    message: text("message"),
    consent: integer("consent").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    clientTokenIdx: uniqueIndex("enquiries_client_token_idx").on(table.clientToken),
    referenceIdx: uniqueIndex("enquiries_reference_idx").on(table.reference),
  }),
);

export { contactMessages } from "./contact-schema";
