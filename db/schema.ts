import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  conversations: many(conversation),
}));

export const conversation = pgTable('conversation', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name'),
  userId: uuid('userId').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const conversationsRelations = relations(
  conversation,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [conversation.userId],
      references: [usersTable.id],
    }),
    messages: many(message),
  })
);

export const message = pgTable('message', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  content: text('content'),
  role: text('role').$type<'user' | 'assistant'>(),
  conversationId: uuid('conversationId')
    .references(() => conversation.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));
