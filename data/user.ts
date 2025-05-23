import { verifySession } from '@/actions/sessions';
import db from '@/db';
import { usersTable } from '@/db/schema';
import { User } from '@/types/db';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!existingUser) {
      return null;
    }
    return existingUser;
  } catch (error) {
    console.error('error', error);
    throw new Error('문제가 발생했습니다.');
  }
};

export const getConversationsByUser = async () => {
  const session = await verifySession();

  const response = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, session.id),
    with: {
      conversations: {
        orderBy: (conversation, { desc }) => [desc(conversation.updatedAt)],
      },
    },
  });

  return response?.conversations || [];
};
