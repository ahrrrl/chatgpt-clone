import { Chat } from '@/components/chat/Chat';
import { getMessagesByConversation } from '@/data/conversation';

interface Props {
  params: Params;
}

type Params = Promise<{ id: string }>;

export default async function ConversationPage({ params }: Props) {
  const id = (await params).id;
  const messages = await getMessagesByConversation(id);
  return <Chat initialMessages={messages} />;
}
