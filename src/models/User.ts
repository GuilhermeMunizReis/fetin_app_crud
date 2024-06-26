import { InferModel } from 'drizzle-orm-pg';
import { pgTable, serial, varchar } from 'drizzle-orm-pg';

export const studentTable = pgTable('users', {
  id: serial('ID').primaryKey(),
  name: varchar('name', { length: 255 }),
  registration: varchar('registration', { length: 255 }),
  period: varchar('period', { length: 255 }),
  course: varchar('course', { length: 255 }),
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 255 })
});

export type User = InferModel<typeof studentTable>;
