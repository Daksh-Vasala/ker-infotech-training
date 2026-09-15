import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["admin", "subscriber"]);
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userName: text("user_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  userRole: UserRole("user_role").notNull().default("subscriber"),
  phoneNumber: text("phone_number").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
});

export const options = pgTable("options", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  optionName: text("option_name").notNull().unique(),
  optionValue: text("option_value"),
});

export const todos = pgTable("todos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
});
