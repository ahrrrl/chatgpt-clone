import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  name?: string;
  content: string;
  role: string;
}

export function Message({ name = 'User', content = '', role }: Props) {
  const isAssistant = role === 'assistant';
  const avatarName = isAssistant ? 'Chat GPT' : name;
  return (
    <div className='flex items-start gap-2 mb-5'>
      <Avatar className='flex'>
        <AvatarImage
          src={isAssistant ? '/chat_gpt_b_logo.svg' : ''}
          alt='avatar'
        />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>
      <div className='mt-2'>
        <h2 className='font-bold'>{avatarName}</h2>
        <div className='mt-2 whitespace-break-spaces'>{content}</div>
      </div>
    </div>
  );
}
