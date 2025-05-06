import db from '@/db';
import { conversation } from '@/db/schema';
import { Message } from 'ai';
import { eq } from 'drizzle-orm';

export const getMessagesByConversation = async (conversationId: string) => {
  const response = await db.query.conversation.findFirst({
    where: eq(conversation.id, conversationId),
    with: {
      messages: {
        orderBy: (message, { asc }) => [asc(message.createdAt)],
      },
    },
  });

  return (response?.messages || []) as Message[];
};
