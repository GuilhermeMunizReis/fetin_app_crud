import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm-pg';

export const studentTable = pgTable('users', {
  id: serial('ID').primaryKey(),
  name: varchar('name', 255),
  registration: varchar('registration', 255),
  period: varchar('period', 255),
  course: varchar('course', 255),
  email: varchar('email', 255),
  role: varchar('role', 255)
});

export type User = InferModel<typeof studentTable>;