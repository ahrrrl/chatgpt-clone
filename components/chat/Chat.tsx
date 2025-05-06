'use client';

import { useEffect, useRef } from 'react';
import { AutoResizingTextarea } from './AutoResizeingTextarea';
import { Empty } from './Empty';
import { Message } from './Message';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';
import { useChat, Message as TMessage } from 'ai/react';
import { useModelStore } from '@/store/model';
import { useParams, useRouter } from 'next/navigation';
import { addMessage, createConversation } from '@/actions/conversation';
import { CHAT_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/user';

interface Props {
  initialMessages?: TMessage[];
}

export function Chat({ initialMessages }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      onFinish: async (message) => {
        if (!params.id) {
          const conversation = await createConversation(input);
          await addMessage(conversation.id, input, message.content);
          router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
        } else {
          await addMessage(params.id, input, message.content);
        }
      },
    });
  const scrollRef = useRef<HTMLDivElement>(null);
  const model = useModelStore((state) => state.model);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event, { data: model });
    }
  };

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex flex-col w-[80%] h-full mx-auto'>
      {/* 채팅영역 */}
      <div className='flex-1'>
        {!params.id && messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={user.name}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>

      {/* 입력영역 */}
      <div className='pb-5 sticky bottom-0 bg-white'>
        <form
          onSubmit={(e) => handleSubmit(e, { data: model })}
          className='flex items-center justify-center gap-4'
        >
          <AutoResizingTextarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button type='submit' size='icon'>
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
